import { hmacSha256 } from './hmac';

export class LBankClient {
  private key: string;
  private secret: string;
  private baseUrl = 'https://api.lbank.info';

  constructor(key: string, secret: string) {
    this.key = key;
    this.secret = secret;
  }

  private async signedRequest(method: string, path: string, params: Record<string, string> = {}): Promise<any> {
    params.timestamp = Date.now().toString();

    // LBank v2 signing: sort params alphabetically, concat as query string, HMAC SHA256
    const sortedKeys = Object.keys(params).sort();
    const signParts = sortedKeys.map(k => `${k}=${params[k]}`);
    const signStr = signParts.join('&');
    const signature = await hmacSha256(this.secret, signStr);
    params.sign = signature.toUpperCase();

    const headers: Record<string, string> = {
      'Content-Type': 'application/x-www-form-urlencoded',
    };

    const queryString = new URLSearchParams(params).toString();
    let url = `${this.baseUrl}${path}`;
    let body: string | undefined;

    if (method === 'GET') {
      url += `?${queryString}`;
    } else {
      body = queryString;
    }

    const resp = await fetch(url, { method, headers, body });
    const data = await resp.json();
    if (data.code !== '0') throw new Error(`LBank: ${data.msg || JSON.stringify(data)}`);
    return data.data;
  }

  // Public endpoints (no auth)
  async getTickerAll(): Promise<any[]> {
    const resp = await fetch(`${this.baseUrl}/v2/spot/tickers`);
    const data = await resp.json();
    return data.data || [];
  }

  async getTicker(symbol: string): Promise<any> {
    const resp = await fetch(`${this.baseUrl}/v2/spot/ticker?symbol=${symbol}`);
    const data = await resp.json();
    return data.data?.[0] || {};
  }

  async getOrderBook(symbol: string, limit = 20): Promise<any> {
    const resp = await fetch(`${this.baseUrl}/v2/spot/depth?symbol=${symbol}&limit=${limit}`);
    const data = await resp.json();
    return data.data || {};
  }

  async getCandles(symbol: string, type: string, size = 200): Promise<any[]> {
    const resp = await fetch(`${this.baseUrl}/v2/spot/kline?symbol=${symbol}&type=${type}&size=${size}`);
    const data = await resp.json();
    return data.data || [];
  }

  async getRecentTrades(symbol: string, limit = 60): Promise<any[]> {
    const resp = await fetch(`${this.baseUrl}/v2/spot/trades?symbol=${symbol}&size=${limit}`);
    const data = await resp.json();
    return data.data || [];
  }

  async getExchangeInfo(): Promise<any> {
    const resp = await fetch(`${this.baseUrl}/v2/spot/symbols`);
    const data = await resp.json();
    return data.data || [];
  }

  // Signed endpoints
  async createOrder(symbol: string, side: string, type: string, price?: string, amount?: string): Promise<any> {
    const params: Record<string, string> = {
      symbol,
      side: side.toLowerCase(), // buy or sell
      type: type.toLowerCase(), // limit or market
    };
    if (price) params.price = price;
    if (amount) params.amount = amount;

    return this.signedRequest('POST', '/v2/spot/submit_order', params);
  }

  async cancelOrder(symbol: string, orderId: string): Promise<any> {
    return this.signedRequest('POST', '/v2/spot/cancel_order', { symbol, orderId });
  }

  async getOpenOrders(symbol?: string, currentPage = 1, pageSize = 50): Promise<any> {
    const params: Record<string, string> = {
      currentPage: currentPage.toString(),
      pageSize: pageSize.toString(),
    };
    if (symbol) params.symbol = symbol;
    return this.signedRequest('POST', '/v2/spot/open_orders', params);
  }

  async getOrderHistory(symbol?: string, currentPage = 1, pageSize = 50): Promise<any> {
    const params: Record<string, string> = {
      currentPage: currentPage.toString(),
      pageSize: pageSize.toString(),
    };
    if (symbol) params.symbol = symbol;
    return this.signedRequest('POST', '/v2/spot/history_orders', params);
  }

  async getBalance(currency?: string): Promise<any> {
    const params: Record<string, string> = {};
    if (currency) params.asset = currency;
    return this.signedRequest('POST', '/v2/spot/user_info', params);
  }

  async withdraw(currency: string, amount: string, address: string, network?: string): Promise<any> {
    const params: Record<string, string> = {
      asset: currency,
      amount,
      toAddress: address,
    };
    if (network) params.chain = network;
    return this.signedRequest('POST', '/v2/withdraw', params);
  }

  async getDepositAddress(currency: string): Promise<any> {
    return this.signedRequest('POST', '/v2/withdraw/getAddressByAsset', { asset: currency });
  }
}
