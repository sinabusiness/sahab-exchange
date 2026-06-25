import { useTranslation } from 'react-i18next';
import { ArrowLeftRight, ChevronDown, Shield, Zap, Clock, AlertTriangle, RefreshCw, Info } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { buildCoinFromSymbol, defaultCoins } from '../lib/coins';
import { apiUrl } from '../lib/gate';

interface SwapCoin {
  symbol: string;
  name: string;
  icon: string;
  price: number;
}

export default function Swap() {
  const { t } = useTranslation();
  const location = useLocation();
  const stateFrom = (location.state as any)?.from as string | undefined;
  const stateTo = (location.state as any)?.to as string | undefined;

  const [coins, setCoins] = useState<SwapCoin[]>([]);
  const [fromCoin, setFromCoin] = useState<SwapCoin | null>(null);
  const [toCoin, setToCoin] = useState<SwapCoin | null>(null);
  const [amount, setAmount] = useState('');
  const [fromOpen, setFromOpen] = useState(false);
  const [toOpen, setToOpen] = useState(false);

  useEffect(() => {
    fetch(apiUrl('/api/market/tickers'))
      .then(r => r.json())
      .then((data: any) => {
        const tickerArr = Array.isArray(data) ? data : (data?.ticker || data?.data || []);
        const swapCoins: SwapCoin[] = tickerArr
          .filter((d: any) => d.symbol?.endsWith('_usdt'))
          .slice(0, 30)
          .map((d: any) => {
            const sym = d.symbol.replace('_usdt', '').toUpperCase();
            const ticker = d.ticker || d;
            const coin = buildCoinFromSymbol(sym + '_usdt');
            return {
              symbol: coin.symbol,
              name: coin.name,
              icon: coin.icon,
              price: parseFloat(ticker.latest || ticker.last || '0'),
            };
          })
          .filter((c: SwapCoin) => c.price > 0);

        setCoins(swapCoins);

        if (stateFrom) {
          const from = swapCoins.find(c => c.symbol === stateFrom);
          const to = swapCoins.find(c => c.symbol === stateTo) || swapCoins.find(c => c.symbol === 'USDT');
          if (from) setFromCoin(from);
          if (to) setToCoin(to);
        }

        if (!stateFrom && swapCoins.length > 0 && !fromCoin) {
          setFromCoin(swapCoins[0]);
          setToCoin(swapCoins.find(c => c.symbol === 'USDT') || swapCoins[2]);
        }
      })
      .catch(() => {
        const fallback = defaultCoins.slice(0, 12).map(c => ({
          symbol: c.symbol,
          name: c.name,
          icon: c.icon,
          price: c.symbol === 'USDT' ? 1 : 0,
        }));
        setCoins(fallback);
        setFromCoin(fallback[0]);
        setToCoin(fallback[2]);
      });
  }, []);

  useEffect(() => {
    if (stateFrom && coins.length > 0) {
      const from = coins.find(c => c.symbol === stateFrom);
      const to = coins.find(c => c.symbol === stateTo) || coins.find(c => c.symbol === 'USDT');
      if (from) setFromCoin(from);
      if (to) setToCoin(to);
    }
  }, [stateFrom, stateTo, coins]);

  const rate = fromCoin && toCoin ? fromCoin.price / toCoin.price : 0;
  const receive = amount && rate ? (parseFloat(amount) * rate).toFixed(6) : '0';

  function CoinDropdown({ selected, onSelect, open, onToggle }: { selected: SwapCoin | null; onSelect: (c: SwapCoin) => void; open: boolean; onToggle: () => void }) {
    if (!selected) return null;
    return (
      <div className="relative">
        <button onClick={onToggle} className="flex items-center gap-2 px-3 py-2 bg-[#1a1f2e] rounded-lg hover:bg-[#222838] transition-colors">
          <span className="text-base">{selected.icon}</span>
          <span className="text-white font-medium text-sm">{selected.symbol}</span>
          <ChevronDown className={`w-3 h-3 text-[#8892a4] transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>
        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={onToggle} />
            <div className="absolute top-full left-0 mt-1 w-56 bg-[#151a24] border border-[#1a1f2e] rounded-lg shadow-xl z-50 py-1 max-h-64 overflow-y-auto">
              {coins.map(c => (
                <button
                  key={c.symbol}
                  onClick={() => { onSelect(c); onToggle(); }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 text-sm transition-colors ${
                    selected.symbol === c.symbol ? 'text-[#00d4aa] bg-[#00d4aa]/10' : 'text-[#8892a4] hover:text-white hover:bg-[#1a1f2e]'
                  }`}
                >
                  <span className="w-5 text-center">{c.icon}</span>
                  <span className="font-medium">{c.symbol}</span>
                  <span className="text-[#5a6478] text-xs mr-auto">{c.name}</span>
                  <span className="text-[#5a6478] text-xs" dir="ltr">${c.price.toLocaleString(undefined, { maximumFractionDigits: c.price > 1 ? 2 : 4 })}</span>
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    );
  }

  const topPairs = [
    { from: 'BTC', to: 'USDT', vol: '$32.1B', change: '+2.34%' },
    { from: 'ETH', to: 'USDT', vol: '$18.7B', change: '-1.23%' },
    { from: 'SOL', to: 'USDT', vol: '$4.3B', change: '+5.67%' },
    { from: 'BNB', to: 'USDT', vol: '$2.1B', change: '+0.87%' },
  ];

  if (!fromCoin || !toCoin) {
    return <div className="min-h-screen pt-14 flex items-center justify-center text-[#5a6478]">Loading...</div>;
  }

  return (
    <div className="min-h-screen pt-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">{t('swap.title')}</h1>
          <p className="text-[#8892a4] text-lg">{t('swap.subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {/* Main Widget */}
          <div className="lg:col-span-2">
            <div className="bg-[#0f1319] border border-[#1a1f2e] rounded-xl overflow-hidden">
              <div className="flex items-center justify-between px-5 py-4 border-b border-[#1a1f2e]">
                <div className="flex items-center gap-3">
                  <ArrowLeftRight className="w-4 h-4 text-[#00d4aa]" />
                  <span className="text-white font-semibold text-[15px]">{t('swap.title')}</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-[#5a6478]">
                  <Clock className="w-3 h-3" />
                  <span>~{t('swap.timeRange')}</span>
                </div>
              </div>

              <div className="p-5">
                {/* From */}
                <div className="mb-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[12px] text-[#8892a4] font-medium">{t('swap.youPay')}</span>
                    <span className="text-[11px] text-[#5a6478]">{t('swap.balance')} 0.00</span>
                  </div>
                  <div className="flex items-center gap-3 bg-[#0c1017] border border-[#1a1f2e] rounded-lg p-3 focus-within:border-[#00d4aa]/40 transition-colors">
                    <CoinDropdown selected={fromCoin} onSelect={setFromCoin} open={fromOpen} onToggle={() => { setFromOpen(!fromOpen); setToOpen(false); }} />
                    <input type="number" value={amount} onChange={e => setAmount(e.target.value)} placeholder="0.00" className="flex-1 bg-transparent text-[20px] font-semibold text-white text-left focus:outline-none placeholder-[#2a3040]" dir="ltr" />
                    <button className="px-2.5 py-1 bg-[#1a1f2e] rounded text-[11px] text-[#8892a4] hover:text-white transition-colors">{t('swap.max')}</button>
                  </div>
                </div>

                {/* Swap Direction */}
                <div className="flex justify-center -my-2.5 relative z-10">
                  <button onClick={() => { const temp = fromCoin; setFromCoin(toCoin); setToCoin(temp); }} className="w-10 h-10 bg-[#0f1319] border-2 border-[#1a1f2e] rounded-lg flex items-center justify-center text-[#8892a4] hover:text-[#00d4aa] hover:border-[#00d4aa]/30 transition-colors">
                    <ArrowLeftRight className="w-4 h-4 rotate-90" />
                  </button>
                </div>

                {/* To */}
                <div className="mt-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[12px] text-[#8892a4] font-medium">{t('swap.youReceive')}</span>
                    <span className="text-[11px] text-[#5a6478]">{t('swap.balance')} 0.00</span>
                  </div>
                  <div className="flex items-center gap-3 bg-[#0c1017] border border-[#1a1f2e] rounded-lg p-3">
                    <CoinDropdown selected={toCoin} onSelect={setToCoin} open={toOpen} onToggle={() => { setToOpen(!toOpen); setFromOpen(false); }} />
                    <div className="flex-1 text-[20px] font-semibold text-white text-left" dir="ltr">{receive}</div>
                  </div>
                </div>

                {/* Details */}
                <div className="mt-4 bg-[#0c1017] border border-[#1a1f2e] rounded-lg p-4 space-y-2.5">
                  <div className="flex items-center justify-between text-[13px]">
                    <span className="text-[#8892a4] flex items-center gap-1.5"><RefreshCw className="w-3 h-3" />{t('swap.rate')}</span>
                    <span className="text-white font-medium" dir="ltr">1 {fromCoin.symbol} = {rate.toFixed(6)} {toCoin.symbol}</span>
                  </div>
                  <div className="flex items-center justify-between text-[13px]">
                    <span className="text-[#8892a4] flex items-center gap-1.5"><Info className="w-3 h-3" />{t('swap.networkFee')}</span>
                    <span className="text-white font-medium">{t('swap.included')}</span>
                  </div>
                  <div className="flex items-center justify-between text-[13px]">
                    <span className="text-[#8892a4] flex items-center gap-1.5"><Clock className="w-3 h-3" />{t('swap.estimatedTime')}</span>
                    <span className="text-white font-medium">{t('swap.timeRange')}</span>
                  </div>
                </div>

                {/* Submit */}
                <button className="w-full mt-5 py-3.5 bg-[#00d4aa] text-[#0c1017] font-semibold text-[14px] rounded-lg hover:bg-[#00c49c] transition-colors">
                  {t('swap.exchange')} {fromCoin.symbol} ← {toCoin.symbol}
                </button>
                <p className="text-center text-[11px] text-[#5a6478] mt-3">{t('swap.poweredBy')}</p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4">
            {/* Why Sarraf */}
            <div className="bg-[#0f1319] border border-[#1a1f2e] rounded-xl p-5">
              <h3 className="text-white font-semibold text-[14px] mb-4">{t('swap.why.title')}</h3>
              <div className="space-y-4">
                {[
                  { icon: <Shield className="w-4 h-4" />, title: t('swap.why.nonCustodial'), desc: t('swap.why.nonCustodialDesc') },
                  { icon: <Zap className="w-4 h-4" />, title: t('swap.why.fast'), desc: t('swap.why.fastDesc') },
                  { icon: <RefreshCw className="w-4 h-4" />, title: t('swap.why.bestRate'), desc: t('swap.why.bestRateDesc') },
                  { icon: <Info className="w-4 h-4" />, title: t('swap.why.noKyc'), desc: t('swap.why.noKycDesc') },
                ].map((f, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-[#00d4aa]/10 rounded-lg flex items-center justify-center text-[#00d4aa] shrink-0">{f.icon}</div>
                    <div>
                      <div className="text-white text-[13px] font-medium">{f.title}</div>
                      <div className="text-[#5a6478] text-[11px]">{f.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Notice */}
            <div className="bg-[#0f1319] border border-[#f59e0b]/20 rounded-xl p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-4 h-4 text-[#f59e0b] shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-[#f59e0b] text-[13px] font-medium mb-1">{t('swap.noticeTitle')}</h4>
                  <p className="text-[#8892a4] text-[12px] leading-relaxed">{t('swap.noticeDesc')}</p>
                </div>
              </div>
            </div>

            {/* Top Pairs */}
            <div className="bg-[#0f1319] border border-[#1a1f2e] rounded-xl overflow-hidden">
              <div className="px-5 py-3 border-b border-[#1a1f2e]">
                <span className="text-white font-semibold text-[13px]">{t('swap.topPairs')}</span>
              </div>
              {topPairs.map((p, i) => {
                const fromInfo = defaultCoins.find(c => c.symbol === p.from) || buildCoinFromSymbol(p.from + '_usdt');
                const toInfo = defaultCoins.find(c => c.symbol === p.to) || buildCoinFromSymbol(p.to + '_usdt');
                return (
                  <button key={i} onClick={() => {
                    if (fromInfo && toInfo) {
                      const fromSwap = coins.find(c => c.symbol === p.from);
                      const toSwap = coins.find(c => c.symbol === p.to);
                      if (fromSwap) setFromCoin(fromSwap);
                      if (toSwap) setToCoin(toSwap);
                    }
                  }} className="w-full flex items-center justify-between px-5 py-2.5 border-b border-[#1a1f2e] last:border-0 hover:bg-[#1a1f2e]/50 transition-colors text-left">
                    <div className="flex items-center gap-2">
                      <span className="text-sm">{fromInfo?.icon}</span>
                      <span className="text-white text-[13px] font-medium" dir="ltr">{p.from}/{p.to}</span>
                    </div>
                    <div className="text-right" dir="ltr">
                      <span className={`text-[11px] font-medium ${p.change.startsWith('+') ? 'text-[#00d4aa]' : 'text-[#ef4444]'}`}>{p.change}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
