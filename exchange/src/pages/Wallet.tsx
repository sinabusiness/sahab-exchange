import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { walletAPI } from '../lib/api';
import { Copy, Check, Loader2 } from 'lucide-react';

const CURRENCIES = ['USDT', 'BTC', 'ETH', 'SOL', 'DOGE', 'BNB', 'XRP'];

export default function WalletPage() {
  const { user, loading: authLoading } = useAuth();
  const nav = useNavigate();
  const [wallets, setWallets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<'balances' | 'deposit' | 'withdraw'>('balances');
  const [selectedCurrency, setSelectedCurrency] = useState('USDT');
  const [depositAddress, setDepositAddress] = useState('');
  const [withdrawAddress, setWithdrawAddress] = useState('');
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [copied, setCopied] = useState(false);
  const [msg, setMsg] = useState('');
  const [sending, setSending] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) { nav('/login'); return; }
    if (user) loadWallets();
  }, [user, authLoading]);

  const loadWallets = async () => {
    try {
      const data = await walletAPI.all();
      setWallets(data.wallets || []);
    } catch {}
    setLoading(false);
  };

  const loadDepositAddress = async (currency: string) => {
    setSelectedCurrency(currency);
    setDepositAddress('');
    try {
      const data = await walletAPI.depositAddress(currency);
      setDepositAddress(data.address || '');
    } catch {}
  };

  const handleWithdraw = async () => {
    if (!withdrawAddress || !withdrawAmount) return;
    setSending(true);
    setMsg('');
    try {
      await walletAPI.withdraw(selectedCurrency, withdrawAmount, withdrawAddress);
      setMsg('برداشت با موفقیت ارسال شد');
      setWithdrawAddress('');
      setWithdrawAmount('');
      loadWallets();
    } catch (err: any) {
      setMsg(err.message);
    }
    setSending(false);
  };

  const copyAddress = () => {
    navigator.clipboard.writeText(depositAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (authLoading || loading) return <div className="min-h-screen bg-[#0a0e17] pt-[52px] flex items-center justify-center"><Loader2 className="w-8 h-8 text-[#00d4aa] animate-spin" /></div>;

  const totalUSDT = wallets.reduce((sum: number, w: any) => sum + (w.currency === 'USDT' ? w.balance : 0), 0);

  return (
    <div className="min-h-screen bg-[#0a0e17] pt-[72px] pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white mb-1">کیف پول</h1>
          <p className="text-[#5a6478]">مدیریت دارایی‌های دیجیتال</p>
        </div>

        <div className="bg-[#0f1319] border border-[#1a1f2e] rounded-2xl p-6 mb-6">
          <div className="text-[#5a6478] text-sm mb-1">موجودی کل (USDT)</div>
          <div className="text-3xl font-bold text-white" dir="ltr">${totalUSDT.toFixed(2)}</div>
        </div>

        <div className="flex gap-2 mb-6 overflow-x-auto">
          {(['balances', 'deposit', 'withdraw'] as const).map(t => (
            <button key={t} onClick={() => { setTab(t); setMsg(''); if (t === 'deposit') loadDepositAddress(selectedCurrency); }}
              className={`px-5 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${tab === t ? 'bg-[#00d4aa] text-[#0a0e17]' : 'bg-[#1a1f2e] text-[#8a94a6] hover:text-white'}`}>
              {t === 'balances' ? 'موجودی' : t === 'deposit' ? 'واریز' : 'برداشت'}
            </button>
          ))}
        </div>

        {tab === 'balances' && (
          <div className="bg-[#0f1319] border border-[#1a1f2e] rounded-xl overflow-hidden">
            <div className="grid grid-cols-3 px-4 py-3 text-[#5a6478] text-xs font-medium border-b border-[#1a1f2e]">
              <span>ارز</span><span className="text-right" dir="ltr">موجودی</span><span className="text-right" dir="ltr">قفل شده</span>
            </div>
            <div className="divide-y divide-[#1a1f2e]">
              {wallets.map((w: any) => (
                <div key={w.currency} className="flex items-center justify-between px-4 py-3 hover:bg-[#1a1f2e]/30 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#1a1f2e] flex items-center justify-center text-xs font-bold text-white">{w.currency.slice(0, 2)}</div>
                    <span className="text-white font-medium">{w.currency}</span>
                  </div>
                  <span className="text-white text-sm" dir="ltr">{w.balance.toFixed(4)}</span>
                  <span className="text-[#5a6478] text-sm" dir="ltr">{w.locked_balance.toFixed(4)}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {tab === 'deposit' && (
          <div className="bg-[#0f1319] border border-[#1a1f2e] rounded-xl p-6">
            <div className="flex gap-2 mb-6 overflow-x-auto">
              {CURRENCIES.map(c => (
                <button key={c} onClick={() => loadDepositAddress(c)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${selectedCurrency === c ? 'bg-[#00d4aa] text-[#0a0e17]' : 'bg-[#1a1f2e] text-[#8a94a6]'}`}>
                  {c}
                </button>
              ))}
            </div>
            <div className="text-center py-8">
              {depositAddress ? (
                <>
                  <div className="text-[#5a6478] text-sm mb-4">آدرس واریز {selectedCurrency}</div>
                  <div className="bg-[#0c1017] border border-[#1a1f2e] rounded-lg p-4 flex items-center gap-3 max-w-lg mx-auto">
                    <code className="text-white text-sm flex-1 break-all" dir="ltr">{depositAddress}</code>
                    <button onClick={copyAddress} className="text-[#00d4aa] hover:text-[#00b894] shrink-0">
                      {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                    </button>
                  </div>
                  <p className="text-[#5a6478] text-xs mt-4">فقط {selectedCurrency} به این آدرس واریز کنید</p>
                </>
              ) : (
                <div className="text-[#5a6478]">آدرس در حال بارگذاری...</div>
              )}
            </div>
          </div>
        )}

        {tab === 'withdraw' && (
          <div className="bg-[#0f1319] border border-[#1a1f2e] rounded-xl p-6">
            <div className="flex gap-2 mb-6 overflow-x-auto">
              {CURRENCIES.map(c => (
                <button key={c} onClick={() => { setSelectedCurrency(c); setMsg(''); }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${selectedCurrency === c ? 'bg-[#00d4aa] text-[#0a0e17]' : 'bg-[#1a1f2e] text-[#8a94a6]'}`}>
                  {c}
                </button>
              ))}
            </div>
            <div className="space-y-4 max-w-lg mx-auto">
              <div>
                <label className="block text-[#8a94a6] text-sm mb-1.5">آدرس مقصد</label>
                <input value={withdrawAddress} onChange={e => setWithdrawAddress(e.target.value)}
                  className="w-full bg-[#0c1017] border border-[#1a1f2e] rounded-lg px-4 py-3 text-white placeholder-[#5a6478] focus:outline-none focus:border-[#00d4aa]/40 transition-colors text-sm"
                  placeholder="آدرس کیف پول مقصد" dir="ltr" />
              </div>
              <div>
                <label className="block text-[#8a94a6] text-sm mb-1.5">مقدار</label>
                <input type="number" value={withdrawAmount} onChange={e => setWithdrawAmount(e.target.value)} step="any"
                  className="w-full bg-[#0c1017] border border-[#1a1f2e] rounded-lg px-4 py-3 text-white placeholder-[#5a6478] focus:outline-none focus:border-[#00d4aa]/40 transition-colors"
                  placeholder="0.00" dir="ltr" />
                <div className="text-[#5a6478] text-xs mt-1">
                  موجودی: {wallets.find((w: any) => w.currency === selectedCurrency)?.balance.toFixed(4) || '0'} {selectedCurrency}
                </div>
              </div>
              {msg && <div className={`text-sm p-3 rounded-lg ${msg.includes('موفقیت') ? 'bg-[#00d4aa]/10 text-[#00d4aa]' : 'bg-red-500/10 text-red-400'}`}>{msg}</div>}
              <button onClick={handleWithdraw} disabled={sending || !withdrawAddress || !withdrawAmount}
                className="w-full bg-[#00d4aa] hover:bg-[#00b894] text-[#0a0e17] font-bold py-3 rounded-lg transition-colors disabled:opacity-50">
                {sending ? '...' : 'برداشت'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
