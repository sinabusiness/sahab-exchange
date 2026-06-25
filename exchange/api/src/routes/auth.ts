import { Hono } from 'hono';
import { hashPassword, verifyPassword } from '../lib/crypto.js';
import { signJWT } from '../lib/jwt.js';
import type { Env } from '../types.js';

const authRoutes = new Hono<{ Bindings: Env }>();

authRoutes.post('/signup', async (c) => {
  const { email, password, name } = await c.req.json();
  if (!email || !password) return c.json({ error: 'Email and password required' }, 400);

  const existing = await c.env.DB.prepare('SELECT id FROM users WHERE email = ?').bind(email).first();
  if (existing) return c.json({ error: 'Email already registered' }, 409);

  const hash = await hashPassword(password);
  const result = await c.env.DB.prepare('INSERT INTO users (email, password_hash, name) VALUES (?, ?, ?)').bind(email, hash, name || '').run();
  const userId = result.meta.last_row_id;

  const currencies = ['USDT', 'BTC', 'ETH', 'SOL', 'DOGE', 'BNB', 'XRP'];
  for (const cur of currencies) {
    await c.env.DB.prepare('INSERT INTO wallets (user_id, currency, balance, locked_balance) VALUES (?, ?, 0, 0)').bind(userId, cur).run();
  }

  const token = await signJWT({ sub: userId, email }, c.env.JWT_SECRET);
  return c.json({ token, user: { id: userId, email, name: name || '' } });
});

authRoutes.post('/login', async (c) => {
  const { email, password } = await c.req.json();
  if (!email || !password) return c.json({ error: 'Email and password required' }, 400);

  const user = await c.env.DB.prepare('SELECT * FROM users WHERE email = ?').bind(email).first() as any;
  if (!user) return c.json({ error: 'Invalid credentials' }, 401);

  const valid = await verifyPassword(password, user.password_hash);
  if (!valid) return c.json({ error: 'Invalid credentials' }, 401);

  const token = await signJWT({ sub: user.id, email: user.email }, c.env.JWT_SECRET);
  return c.json({ token, user: { id: user.id, email: user.email, name: user.name } });
});

authRoutes.get('/me', async (c) => {
  const header = c.req.header('Authorization');
  if (!header?.startsWith('Bearer ')) return c.json({ error: 'Unauthorized' }, 401);
  const { verifyJWT } = await import('../lib/jwt.js');
  const payload = await verifyJWT(header.slice(7), c.env.JWT_SECRET);
  if (!payload) return c.json({ error: 'Invalid token' }, 401);

  const user = await c.env.DB.prepare('SELECT id, email, name, created_at FROM users WHERE id = ?').bind(payload.sub).first();
  return c.json({ user });
});

export default authRoutes;
