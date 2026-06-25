import { Search } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import Chart from '../components/Chart';
import { buildCoinFromSymbol } from '../lib/coins';
import { apiUrl } from '../lib/gate';

interface PairData {
  symbol: string;
  price: number;
  change: number;
  volume: string;
  icon: string;
  name: string;
  lbankSymbol: string;
  color: string;
}

interface OrderBookEntry {
  price: number;
  amount: number;
}

interface TradeEntry {
  side: 'buy' | 'sell';
  price: number;
  amount: number;
  time: string;
}

function formatVol(v: number): string {
  if (v >= 1e9) return `${(v / 1e9).toFixed(1)}B`;
  if (v >= 1e6) return `${(v / 1e6).toFixed(1)}M`;
  if (v >= 1e3) return `${(v / 1e3).toFixed(1)}K`;
  return v.toFixed(0);
}

export default function Trade() {
  const { t } = useTranslation();
  const location = useLocation();
  const statePair = (location.state as any)?.pair as string | undefined;

  const [pairs, setPairs] = useState<PairData[]>([]);
  const [selected, setSelected] = useState<PairData | null>(null);
  const [side, setSide] = useState<'buy' | 'sell'>('buy');
  const [orderType, setOrderType] = useState<'limit' | 'market'>('limit');
  const [search, setSearch] = useState('');
  const [marketTab, setMarketTab] = useState<'orderbook' | 'trades'>('orderbook');
  const [timeframe, setTimeframe] = useState('1hour');
  const [asks, setAsks] = useState<OrderBookEntry[]>([]);
  const [bids, setBids] = useState<OrderBookEntry[]>([]);
  const [recentTrades, setRecentTrades] = useState<TradeEntry[]>([]);

  useEffect(() => {
    fetch(apiUrl('/api/market/tickers'))
      .then(r => r.json())
      .then((data: any) => {
        // LBank returns { ticker: [...] } or array directly
        const tickerArr = Array.isArray(data) ? data : (data?.ticker || data?.data || []);
        const usdtPairs = tickerArr
          .filter((d: any) => d.symbol?.endsWith('_usdt') || d.symbol?.endsWith('USDT'))
          .map((d: any) => {
            const sym = (d.symbol || '').replace('_usdt', '').replace('USDT', '').toUpperCase();
            const ticker = d.ticker || d;
            const price = parseFloat(ticker.last || '0');
            const change = parseFloat(ticker.change || '0');
            const turnover = parseFloat(ticker.turnover || ticker.quoteVolume || '0');
            const coin = buildCoinFromSymbol(sym + '_usdt');
            return {
              symbol: sym + '/USDT',
              price,
              change: isNaN(change) ? 0 : change,
              volume: formatVol(isNaN(turnover) ? 0 : turnover),
              icon: coin.icon,
              name: coin.name,
              lbankSymbol: sym.toLowerCase() + '_usdt',
              color: coin.color,
            };
          })
          .filter((d: PairData) => d.price > 0)
          .sort((a: PairData, b: PairData) => {
            const parse = (v: string) => {
              const n = parseFloat(v);
              if (v.includes('B')) return n * 1e9;
              if (v.includes('M')) return n * 1e6;
              return n * 1e3;
            };
            return parse(b.volume) - parse(a.volume);
          });
        setPairs(usdtPairs);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (statePair && pairs.length > 0) {
      const found = pairs.find(p => p.symbol === statePair);
      if (found) setSelected(found);
    } else if (pairs.length > 0 && !selected) {
      setSelected(pairs[0]);
    }
  }, [statePair, pairs]);

  useEffect(() => {
    if (!selected) return;
    const symbol = selected.lbankSymbol;

    fetch(apiUrl(`/api/market/orderbook/${symbol}?limit=15`))
      .then(r => r.json())
      .then((data: any) => {
        // LBank returns { asks: [[price, amount], ...], bids: [...] }
        const asksArr = data.asks || data?.data?.asks || [];
        const bidsArr = data.bids || data?.data?.bids || [];
        setAsks(asksArr.map((a: any) => ({ price: parseFloat(a[0]), amount: parseFloat(a[1]) })).reverse());
        setBids(bidsArr.map((b: any) => ({ price: parseFloat(b[0]), amount: parseFloat(b[1]) })));
      })
      .catch(() => {});

    fetch(apiUrl(`/api/market/trades/${symbol}`))
      .then(r => r.json())
      .then((data: any) => {
        // LBank returns array of { date, price, amount, type, ... }
        const tradesArr = Array.isArray(data) ? data : (data?.data || data?.trades || []);
        setRecentTrades(tradesArr.map((t: any) => ({
          side: t.type === 'buy' ? 'buy' as const : 'sell' as const,
          price: parseFloat(t.price || t[0] || '0'),
          amount: parseFloat(t.amount || t[1] || '0'),
          time: new Date(parseInt(t.date || t.timestamp || '0') * 1000).toLocaleTimeString('en-US', { hour12: false }),
        })));
      })
      .catch(() => {});
  }, [selected]);

  const filtered = pairs.filter(p => p.symbol.toLowerCase().includes(search.toLowerCase()));
  const maxAskAmount = asks.length > 0 ? Math.max(...asks.map(a => a.amount)) : 1;
  const maxBidAmount = bids.length > 0 ? Math.max(...bids.map(b => b.amount)) : 1;
  const maxTradeAmount = recentTrades.length > 0 ? Math.max(...recentTrades.map(t => t.amount)) : 1;

  const timeframes = [
    { key: '1m', label: t('trade.tf1m') },
    { key: '5m', label: t('trade.tf5m') },
    { key: '15m', label: t('trade.tf15m') },
    { key: '1h', label: t('trade.tf1h') },
    { key: '4h', label: t('trade.tf4h') },
    { key: '1d', label: t('trade.tf1d') },
    { key: '1w', label: t('trade.tf1w') },
  ];

  if (!selected) {
    return <div className="min-h-screen bg-[#0c1017] pt-[52px] flex items-center justify-center text-[#5a6478]">{t('trade.search')}</div>;
  }

  return (
    <div className="min-h-screen bg-[#0c1017] pt-[52px]">
      <div className="bg-[#0f1319] border-b border-[#1a1f2e]">
        <div className="max-w-[1600px] mx-auto px-4 h-[52px] flex items-center gap-6 overflow-x-auto">
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xl">{selected.icon}</span>
            <span className="text-white font-bold text-lg">{selected.symbol}</span>
          </div>
          <span className={`text-xl font-bold shrink-0 ${selected.change > 0 ? 'text-[#00d4aa]' : 'text-[#ef4444]'}`} dir="ltr">
            ${selected.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
          <div className="w-px h-6 bg-[#1a1f2e] shrink-0" />
          <div className="flex items-center gap-5 text-[13px] shrink-0">
            <div>
              <span className="text-[#5a6478]">{t('trade.h24Change')} </span>
              <span className={`font-medium ${selected.change > 0 ? 'text-[#00d4aa]' : 'text-[#ef4444]'}`} dir="ltr">
                {selected.change > 0 ? '+' : ''}{selected.change.toFixed(2)}%
              </span>
            </div>
            <div>
              <span className="text-[#5a6478]">{t('trade.h24Volume')} </span>
              <span className="text-white" dir="ltr">${selected.volume}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-2 py-2 h-auto xl:h-[calc(100vh-104px)] overflow-visible xl:overflow-hidden">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-[6px] xl:h-full">

          <div className="xl:col-span-2 bg-[#0f1319] border border-[#1a1f2e] rounded flex flex-col overflow-hidden">
            <div className="p-2 border-b border-[#1a1f2e]">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-[#5a6478]" />
                <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder={t('trade.search')} className="w-full bg-[#0c1017] border border-[#1a1f2e] rounded pl-7 pr-2 py-[6px] text-[12px] text-white placeholder-[#5a6478] focus:outline-none focus:border-[#00d4aa]/40" />
              </div>
            </div>
            <div className="flex items-center px-3 py-1.5 text-[10px] text-[#5a6478] font-medium">
              <span className="flex-1">{t('trade.coin')}</span>
              <span className="w-20 text-right">{t('trade.price')}</span>
              <span className="w-16 text-right">{t('trade.change')}</span>
            </div>
            <div className="flex-1 overflow-y-auto">
              {filtered.map(p => (
                <button key={p.symbol} onClick={() => setSelected(p)} className={`w-full flex items-center px-3 py-[7px] text-[12px] transition-colors hover:bg-[#1a1f2e] ${selected.symbol === p.symbol ? 'bg-[#1a1f2e]' : ''}`}>
                  <span className="flex-1 flex items-center gap-2">
                    <span className="w-5 text-center text-[11px]">{p.icon}</span>
                    <span className="text-white font-medium">{p.symbol}</span>
                  </span>
                  <span className="w-20 text-right text-white" dir="ltr">${p.price.toLocaleString(undefined, { maximumFractionDigits: p.price > 1 ? 2 : 4 })}</span>
                  <span className={`w-16 text-right font-medium ${p.change > 0 ? 'text-[#00d4aa]' : 'text-[#ef4444]'}`} dir="ltr">
                    {p.change > 0 ? '+' : ''}{p.change.toFixed(2)}%
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="xl:col-span-6 bg-[#0f1319] border border-[#1a1f2e] rounded flex flex-col overflow-hidden">
            <div className="flex items-center gap-1 px-3 py-2 border-b border-[#1a1f2e] shrink-0">
              {timeframes.map(tf => (
                <button key={tf.key} onClick={() => setTimeframe(tf.key)} className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${timeframe === tf.key ? 'bg-[#1a1f2e] text-white' : 'text-[#5a6478] hover:text-white'}`}>
                  {tf.label}
                </button>
              ))}
            </div>
            <div className="xl:flex-1 xl:min-h-0" style={{ height: '85vh' }}>
              <Chart symbol={selected.symbol} basePrice={selected.price} timeframe={timeframe} />
            </div>
          </div>

          <div className="xl:col-span-4 flex flex-col gap-[6px] min-h-0">
            <div className="bg-[#0f1319] border border-[#1a1f2e] rounded flex-1 flex flex-col min-h-0 overflow-hidden">
              <div className="flex border-b border-[#1a1f2e] shrink-0">
                <button onClick={() => setMarketTab('orderbook')} className={`flex-1 py-2.5 text-[12px] font-medium ${marketTab === 'orderbook' ? 'text-[#00d4aa] border-b-2 border-[#00d4aa]' : 'text-[#5a6478] hover:text-white'}`}>
                  {t('trade.orderBook')}
                </button>
                <button onClick={() => setMarketTab('trades')} className={`flex-1 py-2.5 text-[12px] font-medium ${marketTab === 'trades' ? 'text-[#00d4aa] border-b-2 border-[#00d4aa]' : 'text-[#5a6478] hover:text-white'}`}>
                  {t('trade.recentTrades')}
                </button>
              </div>

              {marketTab === 'orderbook' ? (
                <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
                  <div className="flex items-center px-3 py-1.5 text-[10px] text-[#5a6478] font-medium shrink-0">
                    <span className="flex-1">{t('trade.priceUSDT')}</span>
                    <span className="w-20 text-right">{t('trade.amount')}</span>
                    <span className="w-24 text-right">{t('trade.total')}</span>
                  </div>
                  <div className="flex-1 overflow-y-auto flex flex-col justify-end">
                    {asks.slice(0, 10).map((a, i) => {
                      const total = a.price * a.amount;
                      const pct = (a.amount / maxAskAmount) * 100;
                      return (
                        <div key={i} className="relative flex items-center px-3 py-[3px] text-[11px] hover:bg-[#1a1f2e]">
                          <div className="absolute inset-y-0 right-0 bg-[#ef4444]/5" style={{ width: `${pct}%` }} />
                          <span className="flex-1 text-[#ef4444] relative" dir="ltr">{a.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                          <span className="w-20 text-right text-[#c9d1d9] relative" dir="ltr">{a.amount.toFixed(4)}</span>
                          <span className="w-24 text-right text-[#8892a4] relative" dir="ltr">${total.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                        </div>
                      );
                    })}
                  </div>
                  <div className="px-3 py-2 border-y border-[#1a1f2e] shrink-0">
                    <div className="flex items-center justify-between">
                      <span className={`font-bold text-[15px] ${selected.change > 0 ? 'text-[#00d4aa]' : 'text-[#ef4444]'}`} dir="ltr">
                        ${selected.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>
                  <div className="flex-1 overflow-y-auto">
                    {bids.slice(0, 10).map((b, i) => {
                      const total = b.price * b.amount;
                      const pct = (b.amount / maxBidAmount) * 100;
                      return (
                        <div key={i} className="relative flex items-center px-3 py-[3px] text-[11px] hover:bg-[#1a1f2e]">
                          <div className="absolute inset-y-0 right-0 bg-[#00d4aa]/5" style={{ width: `${pct}%` }} />
                          <span className="flex-1 text-[#00d4aa] relative" dir="ltr">{b.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                          <span className="w-20 text-right text-[#c9d1d9] relative" dir="ltr">{b.amount.toFixed(4)}</span>
                          <span className="w-24 text-right text-[#8892a4] relative" dir="ltr">${total.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ) : (
                <div className="flex-1 overflow-y-auto">
                  <div className="flex items-center px-3 py-1.5 text-[10px] text-[#5a6478] font-medium sticky top-0 bg-[#0f1319]">
                    <span className="w-12">{t('trade.time')}</span>
                    <span className="flex-1 text-right">{t('trade.price')}</span>
                    <span className="w-24 text-right">{t('trade.amount')}</span>
                  </div>
                  {recentTrades.map((tr, i) => {
                    const pct = (tr.amount / maxTradeAmount) * 100;
                    return (
                      <div key={i} className="relative flex items-center px-3 py-[3px] text-[11px] hover:bg-[#1a1f2e]">
                        <div className="absolute inset-y-0 right-0 rounded" style={{ width: `${pct}%`, backgroundColor: tr.side === 'buy' ? 'rgba(0,212,170,0.06)' : 'rgba(239,68,68,0.06)' }} />
                        <span className="w-12 text-[#8892a4] relative" dir="ltr">{tr.time}</span>
                        <span className={`flex-1 text-right relative ${tr.side === 'buy' ? 'text-[#00d4aa]' : 'text-[#ef4444]'}`} dir="ltr">{tr.price.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                        <span className="w-24 text-right text-[#c9d1d9] relative" dir="ltr">{tr.amount.toFixed(4)}</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="bg-[#0f1319] border border-[#1a1f2e] rounded p-4 shrink-0">
              <div className="grid grid-cols-2 gap-1 mb-4 bg-[#0c1017] rounded-lg p-1">
                <button onClick={() => setSide('buy')} className={`py-2 rounded-md text-[13px] font-semibold transition-colors ${side === 'buy' ? 'bg-[#00d4aa] text-[#0c1017]' : 'text-[#8892a4] hover:text-white'}`}>
                  {t('trade.buy')}
                </button>
                <button onClick={() => setSide('sell')} className={`py-2 rounded-md text-[13px] font-semibold transition-colors ${side === 'sell' ? 'bg-[#ef4444] text-white' : 'text-[#8892a4] hover:text-white'}`}>
                  {t('trade.sell')}
                </button>
              </div>

              <div className="flex gap-2 mb-4">
                {(['limit', 'market'] as const).map(type => (
                  <button key={type} onClick={() => setOrderType(type)} className={`px-3 py-1.5 rounded text-[12px] font-medium transition-colors ${orderType === type ? 'bg-[#1a1f2e] text-white' : 'text-[#5a6478] hover:text-white'}`}>
                    {type === 'limit' ? t('trade.limit') : t('trade.market')}
                  </button>
                ))}
              </div>

              {orderType !== 'market' && (
                <div className="mb-3">
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-[11px] text-[#5a6478]">{t('trade.price')}</label>
                    <span className="text-[11px] text-[#5a6478]">USDT</span>
                  </div>
                  <div className="flex bg-[#0c1017] border border-[#1a1f2e] rounded overflow-hidden focus-within:border-[#00d4aa]/40 transition-colors">
                    <input type="number" defaultValue={selected.price} className="flex-1 bg-transparent px-3 py-2.5 text-white text-[13px] focus:outline-none" dir="ltr" />
                    <div className="flex flex-col border-l border-[#1a1f2e]">
                      <button className="px-2 py-0.5 text-[10px] text-[#5a6478] hover:text-white">▲</button>
                      <button className="px-2 py-0.5 text-[10px] text-[#5a6478] hover:text-white">▼</button>
                    </div>
                  </div>
                </div>
              )}

              <div className="mb-3">
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[11px] text-[#5a6478]">{t('trade.amount')}</label>
                  <span className="text-[11px] text-[#5a6478]">{selected.symbol.split('/')[0]}</span>
                </div>
                <div className="flex bg-[#0c1017] border border-[#1a1f2e] rounded overflow-hidden focus-within:border-[#00d4aa]/40 transition-colors">
                  <input type="number" placeholder="0.00000" className="flex-1 bg-transparent px-3 py-2.5 text-white text-[13px] focus:outline-none placeholder-[#2a3040]" dir="ltr" />
                  <div className="flex flex-col border-l border-[#1a1f2e]">
                    <button className="px-2 py-0.5 text-[10px] text-[#5a6478] hover:text-white">▲</button>
                    <button className="px-2 py-0.5 text-[10px] text-[#5a6478] hover:text-white">▼</button>
                  </div>
                </div>
              </div>

              <div className="flex gap-1 mb-3">
                {['25%', '50%', '75%', '100%'].map(pct => (
                  <button key={pct} className="flex-1 py-1.5 bg-[#0c1017] border border-[#1a1f2e] rounded text-[11px] text-[#8892a4] hover:text-white hover:border-[#2a3040] transition-colors">
                    {pct}
                  </button>
                ))}
              </div>

              <div className="mb-3">
                <div className="flex items-center justify-between mb-1">
                  <label className="text-[11px] text-[#5a6478]">{t('trade.total')}</label>
                  <span className="text-[11px] text-[#5a6478]">USDT</span>
                </div>
                <input type="number" placeholder="0.00" className="w-full bg-[#0c1017] border border-[#1a1f2e] rounded px-3 py-2.5 text-white text-[13px] focus:outline-none placeholder-[#2a3040]" readOnly dir="ltr" />
              </div>

              <div className="flex items-center justify-between mb-4 text-[11px]">
                <span className="text-[#5a6478]">{t('trade.available')}</span>
                <span className="text-white" dir="ltr">0.00000000 {side === 'buy' ? 'USDT' : selected.symbol.split('/')[0]}</span>
              </div>

              <button className={`w-full py-2.5 rounded text-[13px] font-semibold transition-colors ${side === 'buy' ? 'bg-[#00d4aa] text-[#0c1017] hover:bg-[#00c49c]' : 'bg-[#ef4444] text-white hover:bg-[#dc2626]'}`}>
                {side === 'buy' ? t('trade.buy') : t('trade.sell')} {selected.symbol.split('/')[0]}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
