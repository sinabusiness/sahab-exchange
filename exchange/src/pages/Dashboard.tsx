import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { walletAPI, orderAPI } from '../lib/api';
import { Wallet, TrendingUp, Clock, ArrowUpRight, ArrowDownRight, DollarSign, BarChart3, Loader2 } from 'lucide-react';

export default function Dashboard() {
  const { user, loading: authLoading } = useAuth();
  const nav = useNavigate();
  const [wallets, setWallets] = useState<any[]>([]);
  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [_loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) { nav('/login'); return; }
    if (user) {
      Promise.all([walletAPI.all(), orderAPI.history(10)])
        .then(([w, o]) => { setWallets(w.wallets || []); setRecentOrders(o.orders || []); })
        .catch(() => {})
        .finally(() => setLoading(false));
    }
  }, [user, authLoading]);

  if (authLoading || !user) return <div className="min-h-screen bg-[#0a0e17] pt-[52px] flex items-center justify-center"><Loader2 className="w-8 h-8 text-[#00d4aa] animate-spin" /></div>;

  const totalBalance = wallets.reduce((sum: number, w: any) => sum + (w.currency === 'USDT' ? w.balance : 0), 0);
  const totalAssets = wallets.filter((w: any) => w.balance > 0).length;

  return (
    <div className="min-h-screen bg-[#0a0e17] pt-[72px] pb-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white mb-1">داشبورد</h1>
          <p className="text-[#5a6478]">خوش آمدید، {user.name || user.email}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="bg-[#0f1319] border border-[#1a1f2e] rounded-xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-[#00d4aa]/10 flex items-center justify-center"><DollarSign className="w-5 h-5 text-[#00d4aa]" /></div>
              <span className="text-[#5a6478] text-sm">موجودی USDT</span>
            </div>
            <div className="text-2xl font-bold text-white" dir="ltr">${totalBalance.toFixed(2)}</div>
          </div>
          <div className="bg-[#0f1319] border border-[#1a1f2e] rounded-xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center"><Wallet className="w-5 h-5 text-blue-400" /></div>
              <span className="text-[#5a6478] text-sm">دارایی‌ها</span>
            </div>
            <div className="text-2xl font-bold text-white">{totalAssets}</div>
          </div>
          <div className="bg-[#0f1319] border border-[#1a1f2e] rounded-xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center"><BarChart3 className="w-5 h-5 text-purple-400" /></div>
              <span className="text-[#5a6478] text-sm">معاملات باز</span>
            </div>
            <div className="text-2xl font-bold text-white">{recentOrders.filter((o: any) => o.status === 'open').length}</div>
          </div>
          <div className="bg-[#0f1319] border border-[#1a1f2e] rounded-xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center"><Clock className="w-5 h-5 text-yellow-400" /></div>
              <span className="text-[#5a6478] text-sm">کل معاملات</span>
            </div>
            <div className="text-2xl font-bold text-white">{recentOrders.length}</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-[#0f1319] border border-[#1a1f2e] rounded-xl overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-[#1a1f2e]">
              <h2 className="text-white font-semibold">موجودی کیف پول</h2>
              <Link to="/wallet" className="text-[#00d4aa] text-sm hover:underline">مشاهده همه</Link>
            </div>
            <div className="divide-y divide-[#1a1f2e]">
              {wallets.filter((w: any) => w.balance > 0).length === 0 ? (
                <div className="p-6 text-center text-[#5a6478]">کیف پول خالی است</div>
              ) : (
                wallets.filter((w: any) => w.balance > 0).map((w: any) => (
                  <div key={w.currency} className="flex items-center justify-between p-4 hover:bg-[#1a1f2e]/30 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#1a1f2e] flex items-center justify-center text-xs font-bold text-white">{w.currency.slice(0, 2)}</div>
                      <span className="text-white font-medium">{w.currency}</span>
                    </div>
                    <div className="text-left" dir="ltr">
                      <div className="text-white font-semibold">{w.balance.toFixed(4)}</div>
                      {w.locked_balance > 0 && <div className="text-[#5a6478] text-xs">قفل شده: {w.locked_balance.toFixed(4)}</div>}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="bg-[#0f1319] border border-[#1a1f2e] rounded-xl overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b border-[#1a1f2e]">
              <h2 className="text-white font-semibold">آخرین معاملات</h2>
              <Link to="/trade" className="text-[#00d4aa] text-sm hover:underline">معامله</Link>
            </div>
            <div className="divide-y divide-[#1a1f2e]">
              {recentOrders.length === 0 ? (
                <div className="p-6 text-center text-[#5a6478]">هنوز معامله‌ای ندارید</div>
              ) : (
                recentOrders.slice(0, 8).map((o: any) => (
                  <div key={o.id} className="flex items-center justify-between p-4 hover:bg-[#1a1f2e]/30 transition-colors">
                    <div className="flex items-center gap-3">
                      {o.side === 'buy' ? <ArrowUpRight className="w-4 h-4 text-[#00d4aa]" /> : <ArrowDownRight className="w-4 h-4 text-[#ef4444]" />}
                      <div>
                        <span className="text-white font-medium">{o.pair}</span>
                        <span className={`ml-2 text-xs font-medium ${o.side === 'buy' ? 'text-[#00d4aa]' : 'text-[#ef4444]'}`}>
                          {o.side === 'buy' ? 'خرید' : 'فروش'}
                        </span>
                      </div>
                    </div>
                    <div className="text-left" dir="ltr">
                      <div className="text-white text-sm">{o.amount}</div>
                      <div className="text-[#5a6478] text-xs">${o.price}</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link to="/trade" className="bg-[#00d4aa]/10 border border-[#00d4aa]/20 rounded-xl p-5 hover:bg-[#00d4aa]/20 transition-colors text-center">
            <TrendingUp className="w-8 h-8 text-[#00d4aa] mx-auto mb-2" />
            <div className="text-white font-semibold">معامله</div>
          </Link>
          <Link to="/wallet" className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-5 hover:bg-blue-500/20 transition-colors text-center">
            <Wallet className="w-8 h-8 text-blue-400 mx-auto mb-2" />
            <div className="text-white font-semibold">کیف پول</div>
          </Link>
          <Link to="/swap" className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-5 hover:bg-purple-500/20 transition-colors text-center">
            <ArrowUpRight className="w-8 h-8 text-purple-400 mx-auto mb-2" />
            <div className="text-white font-semibold">تبدیل</div>
          </Link>
        </div>
      </div>
    </div>
  );
}
