import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { TrendingUp, TrendingDown, ArrowLeftRight, Shield, Zap, Globe, Lock, Server, Eye, ArrowRight, BarChart3, Sparkles, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { buildCoinFromSymbol, defaultCoins, type CoinData } from '../lib/coins';
import { apiUrl } from '../lib/gate';
import { useLang } from '../i18n/useLang';

interface TickerData {
  symbol: string;
  price: number;
  change: number;
  volume: string;
  quoteVolume: number;
}

const floatingCoins = [
  { icon: '₿', x: '15%', y: '20%', size: 'text-4xl', delay: '0s', duration: '8s', opacity: 'opacity-10' },
  { icon: 'Ξ', x: '80%', y: '15%', size: 'text-3xl', delay: '1s', duration: '7s', opacity: 'opacity-8' },
  { icon: '◎', x: '70%', y: '70%', size: 'text-5xl', delay: '2s', duration: '9s', opacity: 'opacity-6' },
  { icon: '◆', x: '25%', y: '75%', size: 'text-2xl', delay: '0.5s', duration: '6s', opacity: 'opacity-8' },
  { icon: '✕', x: '85%', y: '45%', size: 'text-3xl', delay: '1.5s', duration: '7.5s', opacity: 'opacity-6' },
  { icon: '♦', x: '10%', y: '50%', size: 'text-2xl', delay: '3s', duration: '8.5s', opacity: 'opacity-7' },
  { icon: '🦄', x: '60%', y: '10%', size: 'text-2xl', delay: '2.5s', duration: '6.5s', opacity: 'opacity-5' },
  { icon: '▲', x: '45%', y: '80%', size: 'text-xl', delay: '1.8s', duration: '7.2s', opacity: 'opacity-6' },
];

function formatVol(v: number): string {
  if (v >= 1e9) return `$${(v / 1e9).toFixed(1)}B`;
  if (v >= 1e6) return `$${(v / 1e6).toFixed(1)}M`;
  if (v >= 1e3) return `$${(v / 1e3).toFixed(1)}K`;
  return `$${v.toFixed(0)}`;
}

export default function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { lang } = useLang();
  const isRtl = lang.dir === 'rtl';
  const [tickers, setTickers] = useState<TickerData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(apiUrl('/api/market/tickers'))
      .then(r => r.json())
      .then((data: any) => {
        const tickerArr = Array.isArray(data) ? data : (data?.ticker || data?.data || []);
        const filtered = tickerArr
          .filter((d: any) => d.symbol?.endsWith('_usdt'))
          .map((d: any) => {
            const sym = d.symbol.replace('_usdt', '').toUpperCase();
            const ticker = d.ticker || d;
            return {
              symbol: sym,
              price: parseFloat(ticker.latest || ticker.last || '0'),
              change: parseFloat(ticker.change || '0'),
              volume: formatVol(parseFloat(ticker.turnover || '0')),
              quoteVolume: parseFloat(ticker.turnover || '0'),
            };
          })
          .filter((d: any) => d.price > 0)
          .sort((a: any, b: any) => b.quoteVolume - a.quoteVolume);
        setTickers(filtered);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const topCoins = tickers.slice(0, 6);
  const gainers = [...tickers].sort((a, b) => b.change - a.change).slice(0, 5);
  const losers = [...tickers].sort((a, b) => a.change - b.change).slice(0, 5);
  const mostTraded = [...tickers].sort((a, b) => b.quoteVolume - a.quoteVolume).slice(0, 5);

  function getCoinInfo(symbol: string): CoinData {
    const found = defaultCoins.find(c => c.symbol === symbol);
    return found || buildCoinFromSymbol(symbol + '_usdt');
  }

  function goToTrade(symbol: string) {
    navigate('/trade', { state: { pair: `${symbol}/USDT` } });
  }

  const formatPrice = (p: number) => {
    if (p >= 1000) return p.toLocaleString('en-US', { maximumFractionDigits: 0 });
    if (p >= 1) return p.toLocaleString('en-US', { maximumFractionDigits: 2 });
    return p.toLocaleString('en-US', { maximumFractionDigits: 4 });
  };

  return (
    <div className="min-h-screen pt-14">
      {/* Hero */}
      <section className="relative hero-gradient noise-overlay">
        {floatingCoins.map((coin, i) => (
          <div
            key={i}
            className={`absolute ${coin.size} ${coin.opacity} select-none pointer-events-none float-slow`}
            style={{ left: coin.x, top: coin.y, animationDelay: coin.delay, animationDuration: coin.duration }}
          >
            {coin.icon}
          </div>
        ))}
        <div className={`absolute top-1/2 -translate-y-1/2 w-[200px] h-[200px] md:w-[320px] md:h-[320px] pointer-events-none select-none z-5 ${isRtl ? 'left-[4%] md:left-[8%]' : 'right-[4%] md:right-[8%]'} hidden lg:block`}>
          <div className="w-full h-full rounded-full overflow-hidden border-2 border-[#d4a017]/30 shadow-[0_0_60px_rgba(212,160,23,0.15)]">
            <img src="/sarraf-logo.png" alt="" className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="absolute top-10 left-[15%] w-[500px] h-[400px] bg-[#00d4aa]/[0.04] rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-10 right-[10%] w-[400px] h-[350px] bg-[#7c3aed]/[0.04] rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#00d4aa]/[0.02] rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-36 relative z-10">
          <div className="max-w-3xl">
            <div className="animate-fade-in-up inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#00d4aa]/[0.08] border border-[#00d4aa]/20 text-[#00d4aa] text-xs font-medium mb-8 backdrop-blur-sm">
              <span className="w-1.5 h-1.5 bg-[#00d4aa] rounded-full pulse-dot" />
              <Sparkles className="w-3 h-3" />
              {t('hero.stats.volume')}
              <ChevronRight className="w-3 h-3" />
            </div>
            <h1 className="animate-fade-in-up animate-delay-1 text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-[1.1] tracking-tight">
              {t('hero.title')}
              <span className="block text-[#00d4aa] stat-glow mt-2">✦</span>
            </h1>
            <p className="animate-fade-in-up animate-delay-2 text-lg md:text-xl text-[#8892a4] mb-10 max-w-xl leading-relaxed">
              {t('hero.subtitle')}
            </p>
            <div className="animate-fade-in-up animate-delay-3 flex flex-wrap items-center gap-4">
              <Link to="/swap" className="group inline-flex items-center gap-2.5 px-7 py-3.5 bg-[#00d4aa] text-[#0c1017] font-semibold rounded-xl hover:bg-[#00c49c] transition-all duration-300 glow-green-hover">
                <ArrowLeftRight className="w-4 h-4 transition-transform group-hover:rotate-90 duration-300" />
                {t('hero.cta')}
              </Link>
              <Link to="/trade" className="group inline-flex items-center gap-2.5 px-7 py-3.5 border border-[#1a1f2e] text-white font-semibold rounded-xl hover:bg-[#1a1f2e]/50 hover:border-[#2a3040] transition-all duration-300">
                {t('nav.trade')}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 duration-300" />
              </Link>
            </div>
            <div className="animate-fade-in-up animate-delay-4 flex items-center gap-6 mt-10 text-[12px] text-[#5a6478]">
              <div className="flex items-center gap-1.5"><Lock className="w-3 h-3 text-[#00d4aa]" /><span>Non-Custodial</span></div>
              <div className="flex items-center gap-1.5"><Shield className="w-3 h-3 text-[#00d4aa]" /><span>No KYC</span></div>
              <div className="flex items-center gap-1.5"><Zap className="w-3 h-3 text-[#00d4aa]" /><span>5-30 min</span></div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0a0e17] to-transparent pointer-events-none" />
      </section>

      {/* Stats */}
      <section className="border-y border-[#1a1f2e]/40 bg-[#0f1319]/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-3 gap-8">
            {[
              { value: '100K+', label: t('home.statsUsers'), icon: '👥' },
              { value: '1,500+', label: t('home.statsCoins'), icon: '🪙' },
              { value: '$10B+', label: t('home.statsVolume'), icon: '📊' },
            ].map((s, i) => (
              <div key={i} className="text-center animate-fade-in-up" style={{ animationDelay: `${i * 0.1 + 0.2}s`, opacity: 0 }}>
                <div className="text-2xl mb-1">{s.icon}</div>
                <div className="text-xl md:text-2xl font-bold text-white stat-glow">{s.value}</div>
                <div className="text-sm text-[#8892a4] mt-0.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Prices */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-white">{t('home.livePrices')}</h2>
          <div className="flex items-center gap-1.5 text-[11px] text-[#5a6478]">
            <span className="w-1.5 h-1.5 bg-[#00d4aa] rounded-full pulse-dot" />
            {t('swap.live')}
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {loading ? (
            Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="glass rounded-xl p-4 shimmer-line h-[120px]" />
            ))
          ) : (
            topCoins.map(coin => {
              const info = getCoinInfo(coin.symbol);
              return (
                <button key={coin.symbol} onClick={() => goToTrade(coin.symbol)} className="glass glass-hover rounded-xl p-4 cursor-pointer coin-icon w-full">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <span className="text-xl w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: `${info.color}15` }}>{info.icon}</span>
                      <div>
                        <div className="text-white text-sm font-semibold">{coin.symbol}</div>
                        <div className="text-[#5a6478] text-[11px]">{info.name}</div>
                      </div>
                    </div>
                  </div>
                  <div className="text-white font-semibold text-[15px]" dir="ltr">${formatPrice(coin.price)}</div>
                  <div className={`text-xs font-medium mt-1.5 flex items-center gap-0.5 ${coin.change > 0 ? 'text-[#00d4aa]' : 'text-[#ef4444]'}`}>
                    {coin.change > 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    <span dir="ltr">{Math.abs(coin.change).toFixed(2)}%</span>
                  </div>
                </button>
              );
            })
          )}
        </div>
      </section>

      {/* Market Overview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-[#1a1f2e]/40">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-[#00d4aa]/10 flex items-center justify-center">
            <BarChart3 className="w-5 h-5 text-[#00d4aa]" />
          </div>
          <h2 className="text-2xl font-bold text-white">{t('home.marketOverview')}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Top Gainers */}
          <div className="glass glass-hover rounded-xl overflow-hidden">
            <div className="px-5 py-3.5 border-b border-[#1a1f2e]/60 flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-[#00d4aa]/10 flex items-center justify-center">
                <TrendingUp className="w-3.5 h-3.5 text-[#00d4aa]" />
              </div>
              <span className="text-white font-semibold text-[13px]">{t('home.topGainers')}</span>
            </div>
            {gainers.map((coin, i) => {
              const info = getCoinInfo(coin.symbol);
              return (
                <button key={i} onClick={() => goToTrade(coin.symbol)} className="w-full flex items-center justify-between px-5 py-2.5 border-b border-[#1a1f2e]/30 last:border-0 table-row-hover transition-colors text-start">
                  <div className="flex items-center gap-2.5">
                    <span className="text-sm">{info.icon}</span>
                    <div>
                      <span className="text-white text-[13px] font-medium">{coin.symbol}</span>
                      <span className="text-[#5a6478] text-[10px] ml-1.5">{info.name}</span>
                    </div>
                  </div>
                  <div className="text-right" dir="ltr">
                    <div className="text-[#00d4aa] text-[13px] font-semibold">+{coin.change.toFixed(2)}%</div>
                    <div className="text-[#5a6478] text-[10px]">{coin.volume}</div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Top Losers */}
          <div className="glass glass-hover rounded-xl overflow-hidden">
            <div className="px-5 py-3.5 border-b border-[#1a1f2e]/60 flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-[#ef4444]/10 flex items-center justify-center">
                <TrendingDown className="w-3.5 h-3.5 text-[#ef4444]" />
              </div>
              <span className="text-white font-semibold text-[13px]">{t('home.topLosers')}</span>
            </div>
            {losers.map((coin, i) => {
              const info = getCoinInfo(coin.symbol);
              return (
                <button key={i} onClick={() => goToTrade(coin.symbol)} className="w-full flex items-center justify-between px-5 py-2.5 border-b border-[#1a1f2e]/30 last:border-0 table-row-hover transition-colors text-start">
                  <div className="flex items-center gap-2.5">
                    <span className="text-sm">{info.icon}</span>
                    <div>
                      <span className="text-white text-[13px] font-medium">{coin.symbol}</span>
                      <span className="text-[#5a6478] text-[10px] ml-1.5">{info.name}</span>
                    </div>
                  </div>
                  <div className="text-right" dir="ltr">
                    <div className="text-[#ef4444] text-[13px] font-semibold">{coin.change.toFixed(2)}%</div>
                    <div className="text-[#5a6478] text-[10px]">{coin.volume}</div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Most Traded */}
          <div className="glass glass-hover rounded-xl overflow-hidden">
            <div className="px-5 py-3.5 border-b border-[#1a1f2e]/60 flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-[#7c3aed]/10 flex items-center justify-center">
                <BarChart3 className="w-3.5 h-3.5 text-[#7c3aed]" />
              </div>
              <span className="text-white font-semibold text-[13px]">{t('home.mostTraded')}</span>
            </div>
            {mostTraded.map((coin, i) => {
              const info = getCoinInfo(coin.symbol);
              return (
                <button key={i} onClick={() => goToTrade(coin.symbol)} className="w-full flex items-center justify-between px-5 py-2.5 border-b border-[#1a1f2e]/30 last:border-0 table-row-hover transition-colors text-start">
                  <div className="flex items-center gap-2.5">
                    <span className="text-sm">{info.icon}</span>
                    <span className="text-white text-[13px] font-medium" dir="ltr">{coin.symbol}/USDT</span>
                  </div>
                  <div className="text-right" dir="ltr">
                    <div className="text-[#c9d1d9] text-[13px]">{coin.volume}</div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-[#1a1f2e]/40">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-white mb-3">{t('home.whyTitle')}</h2>
          <p className="text-[#8892a4] text-sm max-w-md mx-auto">Built for speed, privacy, and the best rates in the market</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { icon: <Shield className="w-5 h-5" />, title: t('home.nonCustodial'), desc: t('home.nonCustodialDesc'), color: '#00d4aa' },
            { icon: <Zap className="w-5 h-5" />, title: t('home.fast'), desc: t('home.fastDesc'), color: '#f59e0b' },
            { icon: <Globe className="w-5 h-5" />, title: t('home.noKyc'), desc: t('home.noKycDesc'), color: '#7c3aed' },
          ].map((f, i) => (
            <div key={i} className="glass glass-hover rounded-xl p-6 group">
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110 duration-300" style={{ background: `${f.color}12`, color: f.color }}>{f.icon}</div>
              <h3 className="text-white font-semibold mb-2 text-[15px]">{f.title}</h3>
              <p className="text-[#8892a4] text-[13px] leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Security */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-[#1a1f2e]/40">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-white mb-3">{t('home.securityTitle')}</h2>
          <p className="text-[#8892a4] text-sm max-w-md mx-auto">Enterprise-grade security protecting your assets around the clock</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { icon: <Lock className="w-5 h-5" />, title: t('home.sec2fa'), desc: t('home.sec2faDesc'), color: '#00d4aa' },
            { icon: <Server className="w-5 h-5" />, title: t('home.secCold'), desc: t('home.secColdDesc'), color: '#3b82f6' },
            { icon: <Shield className="w-5 h-5" />, title: t('home.secInsurance'), desc: t('home.secInsuranceDesc'), color: '#f59e0b' },
            { icon: <Eye className="w-5 h-5" />, title: t('home.secAudit'), desc: t('home.secAuditDesc'), color: '#7c3aed' },
          ].map((f, i) => (
            <div key={i} className="glass glass-hover rounded-xl p-5 group">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3.5 transition-transform group-hover:scale-110 duration-300" style={{ background: `${f.color}12`, color: f.color }}>{f.icon}</div>
              <h3 className="text-white font-semibold mb-1.5 text-[14px]">{f.title}</h3>
              <p className="text-[#8892a4] text-[12px] leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-[#1a1f2e]/40">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-white mb-3">{t('home.howItWorks')}</h2>
          <p className="text-[#8892a4] text-sm max-w-md mx-auto">Three simple steps to swap any cryptocurrency</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div className="hidden md:block absolute top-8 left-[20%] right-[20%] h-px bg-gradient-to-r from-transparent via-[#1a1f2e] to-transparent" />
          {[
            { step: '1', title: t('home.step1Title'), desc: t('home.step1Desc') },
            { step: '2', title: t('home.step2Title'), desc: t('home.step2Desc') },
            { step: '3', title: t('home.step3Title'), desc: t('home.step3Desc') },
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center text-center relative z-10">
              <div className="w-16 h-16 bg-[#00d4aa] rounded-2xl flex items-center justify-center text-[#0c1017] text-xl font-bold mb-4 glow-green transition-transform hover:scale-110 duration-300">{item.step}</div>
              <h3 className="text-white font-semibold mb-2 text-[15px]">{item.title}</h3>
              <p className="text-[#8892a4] text-[13px] leading-relaxed max-w-xs">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="relative glass rounded-2xl p-10 md:p-14 text-center overflow-hidden border-glow">
          <div className="absolute inset-0 bg-gradient-to-r from-[#00d4aa]/[0.04] via-transparent to-[#7c3aed]/[0.04]" />
          <div className="absolute top-0 left-1/4 w-[300px] h-[200px] bg-[#00d4aa]/[0.03] rounded-full blur-[80px] pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-[250px] h-[180px] bg-[#7c3aed]/[0.03] rounded-full blur-[80px] pointer-events-none" />
          <div className="relative z-10">
            <div className="text-4xl mb-4">🚀</div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t('home.startNow')}</h2>
            <p className="text-[#8892a4] mb-8 max-w-md mx-auto text-[15px]">{t('home.startNowDesc')}</p>
            <Link to="/swap" className="inline-flex items-center gap-2.5 px-8 py-4 bg-[#00d4aa] text-[#0c1017] font-semibold rounded-xl hover:bg-[#00c49c] transition-all duration-300 glow-green-hover text-[15px]">
              <ArrowLeftRight className="w-4 h-4" />
              {t('home.startSwapping')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
