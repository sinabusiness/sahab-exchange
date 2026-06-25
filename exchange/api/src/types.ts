export interface Env {
  DB: D1Database;
  KV: KVNamespace;
  JWT_SECRET: string;
  LBANK_API_KEY: string;
  LBANK_API_SECRET: string;
  ENVIRONMENT: string;
}

export interface User {
  id: number;
  email: string;
  password_hash: string;
  name: string;
  created_at: string;
}

export interface Wallet {
  id: number;
  user_id: number;
  currency: string;
  balance: string;
  locked_balance: string;
}

export interface Order {
  id: number;
  user_id: number;
  exchange_order_id: string;
  pair: string;
  side: 'buy' | 'sell';
  type: 'limit' | 'market';
  price: string;
  amount: string;
  filled: string;
  status: 'open' | 'filled' | 'cancelled' | 'partial';
  created_at: string;
}

export interface Trade {
  id: number;
  user_id: number;
  order_id: number;
  pair: string;
  side: 'buy' | 'sell';
  price: string;
  amount: string;
  fee: string;
  created_at: string;
}
