import { Hono } from 'hono';
import { verifyJWT } from '../lib/jwt.js';
import type { Env } from '../types.js';

const auth = new Hono<{ Bindings: Env }>();

auth.use('*', async (c, next) => {
  const header = c.req.header('Authorization');
  if (!header?.startsWith('Bearer ')) return c.json({ error: 'Unauthorized' }, 401);
  const payload = await verifyJWT(header.slice(7), c.env.JWT_SECRET);
  if (!payload) return c.json({ error: 'Invalid token' }, 401);
  c.set('user' as any, payload);
  await next();
});

export default auth;
