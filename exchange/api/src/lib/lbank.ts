import { hmacSha256 } from './hmac';

export class LBankClient {
  private key: string;
  private secret: string;
  private baseUrl = 'https://api.lbkex.com';

  constructor(key: string, secret: string) {
    this.key = key;
    this.secret = secret;
  }

  private async signedRequest(method: string, path: string, params: Record<string, string> = {}): Promise<any> {
    params.timestamp = Date.now().toString();

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
    if (data.error_code !== 0) throw new Error(`LBank: ${data.msg || JSON.stringify(data)}`);
    return data.data;
  }

  async getTickerAll(): Promise<any[]> {
    const resp = await fetch(`${this.baseUrl}/v2/ticker/24hr.do?symbol=all`);
    const data = await resp.json();
    return data.data || [];
  }

  async getTicker(symbol: string): Promise<any> {
    const resp = await fetch(`${this.baseUrl}/v2/ticker/24hr.do?symbol=${symbol}`);
    const data = await resp.json();
    return data.data?.[0] || {};
  }

  async getOrderBook(symbol: string, limit = 20): Promise<any> {
    const resp = await fetch(`${this.baseUrl}/v2/depth.do?symbol=${symbol}&size=${limit}`);
    const data = await resp.json();
    return data.data || {};
  }

  async getCandles(symbol: string, type: string, size = 200): Promise<any[]> {
    const time = Math.floor(Date.now() / 1000).toString();
    const resp = await fetch(`${this.baseUrl}/v2/kline.do?symbol=${symbol}&type=${type}&size=${size}&time=${time}`);
    const data = await resp.json();
    return data.data || [];
  }

  async getRecentTrades(symbol: string, limit = 60): Promise<any[]> {
    const resp = await fetch(`${this.baseUrl}/v2/trades.do?symbol=${symbol}&size=${limit}`);
    const data = await resp.json();
    return data.data || [];
  }

  async getExchangeInfo(): Promise<any> {
    const resp = await fetch(`${this.baseUrl}/v2/currencyPairs.do`);
    const data = await resp.json();
    return data.data || [];
  }

  async createOrder(symbol: string, side: string, type: string, price?: string, amount?: string): Promise<any> {
    const params: Record<string, string> = {
      symbol,
      side: side.toLowerCase(),
      type: type.toLowerCase(),
    };
    if (price) params.price = price;
    if (amount) params.amount = amount;

    return this.signedRequest('POST', '/v2/supplement/submit_trade.do', params);
  }

  async cancelOrder(symbol: string, orderId: string): Promise<any> {
    return this.signedRequest('POST', '/v2/supplement/cancel_order.do', { symbol, order_id: orderId });
  }

  async getOpenOrders(symbol?: string, currentPage = 1, pageSize = 50): Promise<any> {
    const params: Record<string, string> = {
      currentPage: currentPage.toString(),
      pageSize: pageSize.toString(),
    };
    if (symbol) params.symbol = symbol;
    return this.signedRequest('POST', '/v2/supplement/open_orders.do', params);
  }

  async getOrderHistory(symbol?: string, currentPage = 1, pageSize = 50): Promise<any> {
    const params: Record<string, string> = {
      currentPage: currentPage.toString(),
      pageSize: pageSize.toString(),
    };
    if (symbol) params.symbol = symbol;
    return this.signedRequest('POST', '/v2/supplement/history_orders.do', params);
  }

  async getBalance(currency?: string): Promise<any> {
    const params: Record<string, string> = {};
    if (currency) params.asset = currency;
    return this.signedRequest('POST', '/v2/supplement/user_info.do', params);
  }

  async withdraw(currency: string, amount: string, address: string, network?: string): Promise<any> {
    const params: Record<string, string> = {
      asset: currency,
      amount,
      toAddress: address,
    };
    if (network) params.chain = network;
    return this.signedRequest('POST', '/v2/withdraw/submit.do', params);
  }

  async getDepositAddress(currency: string, networkName?: string): Promise<any> {
    const params: Record<string, string> = { coin: currency };
    if (networkName) params.networkName = networkName;
    return this.signedRequest('POST', '/v2/supplement/get_deposit_address.do', params);
  }
}
