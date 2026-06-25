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

// Public market data (LBank)
app.get('/api/market/tickers', async (c) => {
  const resp = await fetch('https://api.lbank.info/v2/spot/tickers');
  const data = await resp.json();
  return c.json(data.data || []);
});

app.get('/api/market/ticker/:pair', async (c) => {
  const pair = c.req.param('pair');
  const resp = await fetch(`https://api.lbank.info/v2/spot/ticker?symbol=${pair}`);
  const data = await resp.json();
  return c.json(data.data?.[0] || {});
});

app.get('/api/market/orderbook/:pair', async (c) => {
  const pair = c.req.param('pair');
  const limit = c.req.query('limit') || '20';
  const resp = await fetch(`https://api.lbank.info/v2/spot/depth?symbol=${pair}&limit=${limit}`);
  const data = await resp.json();
  return c.json(data.data || {});
});

app.get('/api/market/candles/:pair', async (c) => {
  const pair = c.req.param('pair');
  const interval = c.req.query('interval') || '1h';
  const resp = await fetch(`https://api.lbank.info/v2/spot/kline?symbol=${pair}&type=${interval}&size=200`);
  const data = await resp.json();
  return c.json(data.data || []);
});

app.get('/api/market/trades/:pair', async (c) => {
  const pair = c.req.param('pair');
  const resp = await fetch(`https://api.lbank.info/v2/spot/trades?symbol=${pair}&size=60`);
  const data = await resp.json();
  return c.json(data.data || []);
});

app.get('/api/market/exchange-info', async (c) => {
  const resp = await fetch('https://api.lbank.info/v2/spot/symbols');
  const data = await resp.json();
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
