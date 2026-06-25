import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { SCHEMA } from './schema.js';
import authRoutes from './routes/auth.js';
import walletRoutes from './routes/wallet.js';
import orderRoutes from './routes/orders.js';
import type { Env } from './types.js';

const app = new Hono<{ Bindings: Env }>();

app.use('*', cors({ origin: '*', allowHeaders: ['Content-Type', 'Authorization'], allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'] }));

app.get('/', (c) => c.json({ status: 'ok', name: 'Sarraf Exchange API', exchange: 'LBank' }));

const LBANK = 'https://api.lbkex.com';

const lbkFetch = async (url: string) => {
  const resp = await fetch(url);
  const text = await resp.text();
  try {
    return JSON.parse(text);
  } catch {
    return { error: 'non-JSON', raw: text.substring(0, 200) };
  }
};

app.get('/api/market/tickers', async (c) => {
  try {
    const topSymbols = [
      'btc_usdt','eth_usdt','sol_usdt','bnb_usdt','xrp_usdt','ada_usdt',
      'doge_usdt','avax_usdt','dot_usdt','link_usdt','matic_usdt','uni_usdt',
      'atom_usdt','ltc_usdt','fil_usdt','near_usdt','apt_usdt','arb_usdt',
      'op_usdt','sui_usdt','pepe_usdt','shib_usdt','xlm_usdt','trx_usdt',
      'ton_usdt','etc_usdt','wif_usdt','floki_usdt','cro_usdt','algo_usdt',
      'sei_usdt','inj_usdt','tia_usdt','render_usdt','fet_usdt','grt_usdt',
      'aave_usdt','mkr_usdt','crv_usdt','sand_usdt','eos_usdt','xtz_usdt',
      'hbar_usdt','icp_usdt','vet_usdt','bch_usdt','jup_usdt','pyth_usdt',
      'wld_usdt','bonk_usdt','not_usdt','kas_usdt',
    ];
    const unique = [...new Set(topSymbols)];

    // Batch in groups of 10 to avoid rate limiting
    const batchFetch = async (syms: string[]) => {
      return Promise.allSettled(
        syms.map(sym =>
          lbkFetch(`${LBANK}/v2/ticker/24hr.do?symbol=${sym}`)
            .then(d => d.data?.[0])
        )
      );
    };

    const batchSize = 10;
    const allResults: PromiseSettledResult<any>[] = [];
    for (let i = 0; i < unique.length; i += batchSize) {
      const batch = unique.slice(i, i + batchSize);
      const results = await batchFetch(batch);
      allResults.push(...results);
    }

    const tickers = allResults
      .filter((r): r is PromiseFulfilledResult<any> => r.status === 'fulfilled' && r.value?.symbol)
      .map(r => r.value);
    return c.json(tickers);
  } catch (e: any) {
    return c.json({ error: e.message }, 500);
  }
});

app.get('/api/market/ticker/:pair', async (c) => {
  try {
    const pair = c.req.param('pair');
    const data = await lbkFetch(`${LBANK}/v2/ticker/24hr.do?symbol=${pair}`);
    if (data.error) return c.json({ error: data.raw || data.error }, 502);
    return c.json(data.data?.[0] || {});
  } catch (e: any) {
    return c.json({ error: e.message }, 500);
  }
});

app.get('/api/market/orderbook/:pair', async (c) => {
  try {
    const pair = c.req.param('pair');
    const limit = c.req.query('limit') || '20';
    const data = await lbkFetch(`${LBANK}/v2/depth.do?symbol=${pair}&size=${limit}`);
    if (data.error) return c.json({ error: data.raw || data.error }, 502);
    return c.json(data.data || {});
  } catch (e: any) {
    return c.json({ error: e.message }, 500);
  }
});

app.get('/api/market/candles/:pair', async (c) => {
  try {
    const pair = c.req.param('pair');
    const interval = c.req.query('interval') || 'hour1';
    const size = 200;
    const intervalMs: Record<string, number> = {
      'minute1': 60000, 'minute5': 300000, 'minute15': 900000, 'minute30': 1800000,
      'hour1': 3600000, 'hour4': 14400000, 'hour8': 28800000, 'hour12': 43200000,
      'day1': 86400000, 'week1': 604800000, 'month1': 2592000000,
    };
    const startTime = Math.floor((Date.now() - (intervalMs[interval] || 3600000) * size) / 1000);
    const url = `${LBANK}/v2/kline.do?symbol=${pair}&type=${interval}&size=${size}&time=${startTime}`;
    const data = await lbkFetch(url);
    if (data.error) return c.json({ error: data.raw || data.error }, 502);
    return c.json(data.data || []);
  } catch (e: any) {
    return c.json({ error: e.message }, 500);
  }
});

app.get('/api/market/trades/:pair', async (c) => {
  try {
    const pair = c.req.param('pair');
    const data = await lbkFetch(`${LBANK}/v2/trades.do?symbol=${pair}&size=60`);
    if (data.error) return c.json({ error: data.raw || data.error }, 502);
    return c.json(data.data || []);
  } catch (e: any) {
    return c.json({ error: e.message }, 500);
  }
});

app.get('/api/market/exchange-info', async (c) => {
  const data = await lbkFetch(`${LBANK}/v2/currencyPairs.do`);
  return c.json(data.data || []);
});

app.route('/api/auth', authRoutes);
app.route('/api/wallet', walletRoutes);
app.route('/api/orders', orderRoutes);

app.get('/api/init-db', async (c) => {
  try {
    const statements = SCHEMA.split(';').filter(s => s.trim());
    for (const stmt of statements) {
      if (stmt.trim()) await c.env.DB.prepare(stmt.trim() + ';').run();
    }
    return c.json({ success: true, message: 'Database initialized' });
  } catch (e: any) {
    return c.json({ error: e.message }, 500);
  }
});

export default {
  fetch: app.fetch,
  async scheduled(event: any, env: Env) {
    const openOrders = await env.DB.prepare('SELECT * FROM orders WHERE status = ?').bind('open').all();
    for (const order of (openOrders.results || []) as any[]) {
      try {
        const { LBankClient } = await import('./lib/lbank.js');
        const lbank = new LBankClient(env.LBANK_API_KEY, env.LBANK_API_SECRET);
        const symbol = order.pair.replace('/', '');
        const exOrders = await lbank.getOpenOrders(symbol);
        const exOrder = exOrders.orders?.find((o: any) => o.orderId === order.exchange_order_id);
        if (!exOrder) {
          await env.DB.prepare('UPDATE orders SET status = ? WHERE id = ?').bind('filled', order.id).run();
        }
      } catch {}
    }
  },
};
