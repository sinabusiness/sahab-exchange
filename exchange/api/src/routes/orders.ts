import { Hono } from 'hono';
import { verifyJWT } from '../lib/jwt.js';
import { LBankClient } from '../lib/lbank.js';
import type { Env } from '../types.js';

const orderRoutes = new Hono<{ Bindings: Env }>();

orderRoutes.use('*', async (c, next) => {
  const header = c.req.header('Authorization');
  if (!header?.startsWith('Bearer ')) return c.json({ error: 'Unauthorized' }, 401);
  const payload = await verifyJWT(header.slice(7), c.env.JWT_SECRET);
  if (!payload) return c.json({ error: 'Invalid token' }, 401);
  c.set('userId' as any, payload.sub);
  await next();
});

orderRoutes.post('/place', async (c) => {
  const userId = (c as any).get('userId');
  const { pair, side, type, price, amount } = await c.req.json();

  if (!pair || !side || !type || !amount) return c.json({ error: 'Missing fields' }, 400);

  const symbol = pair.replace('/', '');
  const baseCurrency = pair.split('/')[0];
  const quoteCurrency = pair.split('/')[1];

  const wallet = await c.env.DB.prepare('SELECT balance FROM wallets WHERE user_id = ? AND currency = ?')
    .bind(userId, side === 'buy' ? quoteCurrency : baseCurrency).first() as any;

  const cost = side === 'buy' ? parseFloat(amount) * parseFloat(price || '0') : parseFloat(amount);
  if (!wallet || wallet.balance < cost) return c.json({ error: 'Insufficient balance' }, 400);

  let exchangeOrderId = '';
  try {
    const lbank = new LBankClient(c.env.LBANK_API_KEY, c.env.LBANK_API_SECRET);
    const order = await lbank.createOrder(symbol, side, type, price, amount);
    exchangeOrderId = order?.orderId || order?.order_id || '';
  } catch (e: any) {
    return c.json({ error: `Exchange error: ${e.message}` }, 400);
  }

  await c.env.DB.prepare('UPDATE wallets SET balance = balance - ?, locked_balance = locked_balance + ? WHERE user_id = ? AND currency = ?')
    .bind(cost, cost, userId, side === 'buy' ? quoteCurrency : baseCurrency).run();

  const result = await c.env.DB.prepare(
    'INSERT INTO orders (user_id, exchange_order_id, pair, side, type, price, amount, filled, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
  ).bind(userId, exchangeOrderId, pair, side, type, price || '0', amount, '0', 'open').run();

  return c.json({ orderId: result.meta.last_row_id, exchangeOrderId });
});

orderRoutes.post('/cancel/:id', async (c) => {
  const userId = (c as any).get('userId');
  const orderId = c.req.param('id');

  const order = await c.env.DB.prepare('SELECT * FROM orders WHERE id = ? AND user_id = ?').bind(orderId, userId).first() as any;
  if (!order) return c.json({ error: 'Order not found' }, 404);
  if (order.status !== 'open') return c.json({ error: 'Order not open' }, 400);

  try {
    const lbank = new LBankClient(c.env.LBANK_API_KEY, c.env.LBANK_API_SECRET);
    await lbank.cancelOrder(order.pair.replace('/', ''), order.exchange_order_id);
  } catch (e: any) {
    return c.json({ error: `Exchange error: ${e.message}` }, 400);
  }

  const quoteCurrency = order.pair.split('/')[1];
  const baseCurrency = order.pair.split('/')[0];
  const unfilled = parseFloat(order.amount) - parseFloat(order.filled);
  const unlockAmt = order.side === 'buy' ? unfilled * parseFloat(order.price) : unfilled;
  const currency = order.side === 'buy' ? quoteCurrency : baseCurrency;

  await c.env.DB.prepare('UPDATE wallets SET balance = balance + ?, locked_balance = locked_balance - ? WHERE user_id = ? AND currency = ?')
    .bind(unlockAmt, unlockAmt, userId, currency).run();

  await c.env.DB.prepare('UPDATE orders SET status = ? WHERE id = ?').bind('cancelled', orderId).run();
  return c.json({ success: true });
});

orderRoutes.get('/open', async (c) => {
  const userId = (c as any).get('userId');
  const orders = await c.env.DB.prepare('SELECT * FROM orders WHERE user_id = ? AND status = ? ORDER BY created_at DESC').bind(userId, 'open').all();
  return c.json({ orders: orders.results });
});

orderRoutes.get('/history', async (c) => {
  const userId = (c as any).get('userId');
  const limit = parseInt(c.req.query('limit') || '50');
  const orders = await c.env.DB.prepare('SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC LIMIT ?').bind(userId, limit).all();
  return c.json({ orders: orders.results });
});

orderRoutes.get('/trades', async (c) => {
  const userId = (c as any).get('userId');
  const limit = parseInt(c.req.query('limit') || '50');
  const trades = await c.env.DB.prepare('SELECT * FROM trades WHERE user_id = ? ORDER BY created_at DESC LIMIT ?').bind(userId, limit).all();
  return c.json({ trades: trades.results });
});

export default orderRoutes;
