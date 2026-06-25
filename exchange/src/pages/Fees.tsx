import { useTranslation } from 'react-i18next';
import { Shield, Clock, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

const feeTiers = [
  { tier: 'VIP 0', volume: '< $100K', maker: '0.10%', taker: '0.10%' },
  { tier: 'VIP 1', volume: '$100K - $500K', maker: '0.08%', taker: '0.10%' },
  { tier: 'VIP 2', volume: '$500K - $1M', maker: '0.06%', taker: '0.08%' },
  { tier: 'VIP 3', volume: '$1M - $5M', maker: '0.04%', taker: '0.06%' },
  { tier: 'VIP 4', volume: '$5M - $10M', maker: '0.02%', taker: '0.04%' },
  { tier: 'VIP 5', volume: '> $10M', maker: '0.00%', taker: '0.02%' },
];

const withdrawalFees = [
  { coin: 'BTC', network: 'Bitcoin', fee: '0.00005 BTC', usd: '~$3.37' },
  { coin: 'ETH', network: 'Ethereum', fee: '0.001 ETH', usd: '~$3.46' },
  { coin: 'USDT', network: 'TRC-20', fee: '1 USDT', usd: '$1.00' },
  { coin: 'USDT', network: 'ERC-20', fee: '3 USDT', usd: '$3.00' },
  { coin: 'USDT', network: 'BEP-20', fee: '0.3 USDT', usd: '$0.30' },
  { coin: 'SOL', network: 'Solana', fee: '0.01 SOL', usd: '~$1.78' },
  { coin: 'BNB', network: 'BEP-20', fee: '0.001 BNB', usd: '~$0.60' },
  { coin: 'XRP', network: 'XRP Ledger', fee: '0.1 XRP', usd: '~$0.06' },
  { coin: 'DOGE', network: 'Dogecoin', fee: '5 DOGE', usd: '~$0.60' },
  { coin: 'ADA', network: 'Cardano', fee: '1 ADA', usd: '~$0.45' },
];

const faqItems = [
  { qKey: 'fees.faq1Q', aKey: 'fees.faq1A' },
  { qKey: 'fees.faq2Q', aKey: 'fees.faq2A' },
  { qKey: 'fees.faq3Q', aKey: 'fees.faq3A' },
  { qKey: 'fees.faq4Q', aKey: 'fees.faq4A' },
  { qKey: 'fees.faq5Q', aKey: 'fees.faq5A' },
];

function FaqItem({ qKey, aKey }: { qKey: string; aKey: string }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  return (
    <div className="glass glass-hover rounded-xl overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-5 py-4 text-left">
        <span className="text-white font-medium text-[14px]">{t(qKey)}</span>
        {open ? <ChevronUp className="w-4 h-4 text-[#5a6478] shrink-0" /> : <ChevronDown className="w-4 h-4 text-[#5a6478] shrink-0" />}
      </button>
      {open && (
        <div className="px-5 pb-4">
          <p className="text-[#8892a4] text-[13px] leading-relaxed">{t(aKey)}</p>
        </div>
      )}
    </div>
  );
}

export default function Fees() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen pt-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in-up">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-3">{t('fees.title')}</h1>
          <p className="text-[#8892a4] text-lg max-w-2xl mx-auto">{t('fees.subtitle')}</p>
        </div>

        {/* Trading Fee Tiers */}
        <div className="mb-12 animate-fade-in-up animate-delay-1">
          <h2 className="text-xl font-bold text-white mb-4">{t('fees.tradingTitle')}</h2>
          <p className="text-[#8892a4] text-sm mb-6">{t('fees.tradingDesc')}</p>
          <div className="glass rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-[13px]">
                <thead>
                  <tr className="border-b border-[#1a1f2e]">
                    <th className="text-left px-5 py-3 text-[#5a6478] font-medium">{t('fees.tier')}</th>
                    <th className="text-left px-5 py-3 text-[#5a6478] font-medium">{t('fees.monthlyVolume')}</th>
                    <th className="text-left px-5 py-3 text-[#5a6478] font-medium">{t('fees.makerFee')}</th>
                    <th className="text-left px-5 py-3 text-[#5a6478] font-medium">{t('fees.takerFee')}</th>
                  </tr>
                </thead>
                <tbody>
                  {feeTiers.map((tier, i) => (
                    <tr key={i} className="border-b border-[#1a1f2e] last:border-0 table-row-hover transition-colors">
                      <td className="px-5 py-3 text-white font-medium">{tier.tier}</td>
                      <td className="px-5 py-3 text-[#c9d1d9]" dir="ltr">{tier.volume}</td>
                      <td className="px-5 py-3 text-[#00d4aa] font-medium" dir="ltr">{tier.maker}</td>
                      <td className="px-5 py-3 text-[#8892a4]" dir="ltr">{tier.taker}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Withdrawal Fees */}
        <div className="mb-12 animate-fade-in-up animate-delay-2">
          <h2 className="text-xl font-bold text-white mb-4">{t('fees.withdrawalTitle')}</h2>
          <p className="text-[#8892a4] text-sm mb-6">{t('fees.withdrawalDesc')}</p>
          <div className="glass rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-[13px]">
                <thead>
                  <tr className="border-b border-[#1a1f2e]">
                    <th className="text-left px-5 py-3 text-[#5a6478] font-medium">{t('fees.coin')}</th>
                    <th className="text-left px-5 py-3 text-[#5a6478] font-medium">{t('fees.network')}</th>
                    <th className="text-left px-5 py-3 text-[#5a6478] font-medium">{t('fees.fee')}</th>
                    <th className="text-left px-5 py-3 text-[#5a6478] font-medium">{t('fees.approxUsd')}</th>
                  </tr>
                </thead>
                <tbody>
                  {withdrawalFees.map((item, i) => (
                    <tr key={i} className="border-b border-[#1a1f2e] last:border-0 table-row-hover transition-colors">
                      <td className="px-5 py-3 text-white font-medium">{item.coin}</td>
                      <td className="px-5 py-3 text-[#c9d1d9]">{item.network}</td>
                      <td className="px-5 py-3 text-[#8892a4] font-mono" dir="ltr">{item.fee}</td>
                      <td className="px-5 py-3 text-[#5a6478]" dir="ltr">{item.usd}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Key Points */}
        <div className="mb-12 animate-fade-in-up animate-delay-3">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: <Shield className="w-5 h-5" />, title: t('fees.point1Title'), desc: t('fees.point1Desc') },
              { icon: <Clock className="w-5 h-5" />, title: t('fees.point2Title'), desc: t('fees.point2Desc') },
              { icon: <Shield className="w-5 h-5" />, title: t('fees.point3Title'), desc: t('fees.point3Desc') },
            ].map((f, i) => (
              <div key={i} className="glass glass-hover rounded-xl p-6">
                <div className="w-10 h-10 bg-[#00d4aa]/10 rounded-lg flex items-center justify-center text-[#00d4aa] mb-4">
                  {f.icon}
                </div>
                <h3 className="text-white font-semibold mb-2">{f.title}</h3>
                <p className="text-[#8892a4] text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="animate-fade-in-up animate-delay-3">
          <h2 className="text-xl font-bold text-white mb-6">{t('fees.faqTitle')}</h2>
          <div className="space-y-3 max-w-3xl">
            {faqItems.map((item, i) => (
              <FaqItem key={i} qKey={item.qKey} aKey={item.aKey} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
