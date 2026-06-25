const API_BASE = 'https://sarraf-api.wold-brunch-0r.workers.dev';

export function apiUrl(path: string): string {
  return `${API_BASE}${path}`;
}

export async function apiFetch<T = any>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

export function toobitSymbol(pair: string): string {
  return pair.replace('/', '');
}

export function pairFromToobit(symbol: string): string {
  if (symbol.endsWith('USDT')) return symbol.replace('USDT', '/USDT');
  return symbol;
}
