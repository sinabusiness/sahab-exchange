const API_BASE = 'https://sarraf-api.wold-brunch-0r.workers.dev';

function getToken(): string | null {
  return localStorage.getItem('sarraf_token');
}

async function api(path: string, options: RequestInit = {}): Promise<any> {
  const token = getToken();
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...((options.headers as Record<string, string>) || {}),
  };
  if (token) headers['Authorization'] = `Bearer ${token}`;

  const resp = await fetch(`${API_BASE}${path}`, { ...options, headers });
  const data = await resp.json();
  if (!resp.ok) throw new Error(data.error || 'Request failed');
  return data;
}

export const authAPI = {
  signup: (email: string, password: string, name: string) =>
    api('/api/auth/signup', { method: 'POST', body: JSON.stringify({ email, password, name }) }),
  login: (email: string, password: string) =>
    api('/api/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
  me: () => api('/api/auth/me'),
};

export const walletAPI = {
  balances: () => api('/api/wallet/balances'),
  all: () => api('/api/wallet/all'),
  depositAddress: (currency: string) => api(`/api/wallet/deposit-address/${currency}`),
  withdraw: (currency: string, amount: string, address: string) =>
    api('/api/wallet/withdraw', { method: 'POST', body: JSON.stringify({ currency, amount, address }) }),
};

export const orderAPI = {
  place: (pair: string, side: string, type: string, price: string, amount: string, exchange: string) =>
    api('/api/orders/place', { method: 'POST', body: JSON.stringify({ pair, side, type, price, amount, exchange }) }),
  cancel: (id: number) =>
    api(`/api/orders/cancel/${id}`, { method: 'POST' }),
  open: () => api('/api/orders/open'),
  history: (limit = 50) => api(`/api/orders/history?limit=${limit}`),
  trades: (limit = 50) => api(`/api/orders/trades?limit=${limit}`),
};

export const marketAPI = {
  tickers: () => fetch(`${API_BASE}/api/market/tickers`).then(r => r.json()),
  ticker: (pair: string) => fetch(`${API_BASE}/api/market/ticker/${pair}`).then(r => r.json()),
  orderbook: (pair: string, limit = '20') => fetch(`${API_BASE}/api/market/orderbook/${pair}?limit=${limit}`).then(r => r.json()),
  candles: (pair: string, interval = '1h', limit = '200') => fetch(`${API_BASE}/api/market/candles/${pair}?interval=${interval}&limit=${limit}`).then(r => r.json()),
  trades: (pair: string) => fetch(`${API_BASE}/api/market/trades/${pair}`).then(r => r.json()),
};
