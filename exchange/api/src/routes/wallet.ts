import { Hono } from 'hono';
import { verifyJWT } from '../lib/jwt.js';
import type { Env } from '../types.js';

const walletRoutes = new Hono<{ Bindings: Env }>();

walletRoutes.use('*', async (c, next) => {
  const header = c.req.header('Authorization');
  if (!header?.startsWith('Bearer ')) return c.json({ error: 'Unauthorized' }, 401);
  const payload = await verifyJWT(header.slice(7), c.env.JWT_SECRET);
  if (!payload) return c.json({ error: 'Invalid token' }, 401);
  c.set('userId' as any, payload.sub);
  await next();
});

walletRoutes.get('/balances', async (c) => {
  const userId = (c as any).get('userId');
  const wallets = await c.env.DB.prepare('SELECT currency, balance, locked_balance FROM wallets WHERE user_id = ? AND (balance > 0 OR locked_balance > 0)').bind(userId).all();
  return c.json({ wallets: wallets.results });
});

walletRoutes.get('/all', async (c) => {
  const userId = (c as any).get('userId');
  const wallets = await c.env.DB.prepare('SELECT currency, balance, locked_balance FROM wallets WHERE user_id = ? ORDER BY currency').bind(userId).all();
  return c.json({ wallets: wallets.results });
});

walletRoutes.get('/deposit-address/:currency', async (c) => {
  const currency = c.req.param('currency');
  const userId = (c as any).get('userId');
  const addr = await c.env.DB.prepare('SELECT address, tag FROM deposit_addresses WHERE user_id = ? AND currency = ?').bind(userId, currency).first();
  if (addr) return c.json(addr);
  return c.json({ address: 'Deposit address will be generated on first deposit', tag: null });
});

walletRoutes.post('/withdraw', async (c) => {
  const userId = (c as any).get('userId');
  const { currency, amount, address } = await c.req.json();

  if (!currency || !amount || !address) return c.json({ error: 'Missing fields' }, 400);
  const amt = parseFloat(amount);
  if (isNaN(amt) || amt <= 0) return c.json({ error: 'Invalid amount' }, 400);

  const wallet = await c.env.DB.prepare('SELECT balance FROM wallets WHERE user_id = ? AND currency = ?').bind(userId, currency).first() as any;
  if (!wallet || wallet.balance < amt) return c.json({ error: 'Insufficient balance' }, 400);

  await c.env.DB.prepare('UPDATE wallets SET balance = balance - ?, locked_balance = locked_balance + ? WHERE user_id = ? AND currency = ?')
    .bind(amt, amt, userId, currency).run();

  await c.env.DB.prepare('INSERT INTO withdrawals (user_id, currency, amount, address, status) VALUES (?, ?, ?, ?, ?)')
    .bind(userId, currency, amt.toString(), address, 'pending').run();

  return c.json({ success: true, message: 'Withdrawal submitted' });
});

export default walletRoutes;
