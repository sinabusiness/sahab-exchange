import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLang } from '../i18n/useLang';
import { useAuth } from '../hooks/useAuth';
import { ChevronDown, Menu, X, LogIn, LayoutDashboard, Wallet, LogOut } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const { t } = useTranslation();
  const { lang, setLang, languages } = useLang();
  const { user, logout } = useAuth();
  const location = useLocation();
  const [langOpen, setLangOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { to: '/', label: t('nav.home') },
    { to: '/swap', label: t('nav.swap') },
    { to: '/trade', label: t('nav.trade') },
    { to: '/fees', label: t('nav.fees') },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0a0e17]/70 backdrop-blur-2xl border-b border-[#1a1f2e]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 bg-[#00d4aa] rounded-lg flex items-center justify-center transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(0,212,170,0.3)]">
              <span className="text-[#0c1017] font-bold text-sm">S</span>
            </div>
            <span className="text-white font-semibold text-lg tracking-tight">صراف</span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-0.5 bg-[#0f1319]/50 rounded-xl px-1.5 py-1 border border-[#1a1f2e]/30">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`px-4 py-1.5 rounded-lg text-[13px] font-medium transition-all duration-200 ${
                  location.pathname === link.to
                    ? 'bg-[#1a1f2e]/80 text-white shadow-sm'
                    : 'text-[#8892a4] hover:text-white hover:bg-[#1a1f2e]/30'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop right */}
          <div className="hidden md:flex items-center gap-3">
            <div className="relative">
              <button
                onClick={() => setLangOpen(!langOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-[13px] text-[#8892a4] hover:text-white rounded-lg hover:bg-[#1a1f2e]/40 transition-all duration-200"
              >
                {lang.name}
                <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${langOpen ? 'rotate-180' : ''}`} />
              </button>
              {langOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setLangOpen(false)} />
                  <div className="absolute top-full right-0 mt-2 w-40 bg-[#151a24] border border-[#1a1f2e]/60 rounded-xl shadow-2xl z-50 py-1.5 backdrop-blur-xl">
                    {languages.map(l => (
                      <button
                        key={l.code}
                        onClick={() => { setLang(l.code); setLangOpen(false); }}
                        className={`w-full text-left px-3.5 py-2 text-[13px] transition-colors ${
                          lang.code === l.code ? 'text-[#00d4aa] bg-[#00d4aa]/[0.08]' : 'text-[#8892a4] hover:text-white hover:bg-[#1a1f2e]/50'
                        }`}
                      >
                        {l.name}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
            <Link
              to="/swap"
              className="px-5 py-1.5 bg-[#00d4aa] text-[#0c1017] text-[13px] font-semibold rounded-lg hover:bg-[#00c49c] transition-all duration-200 glow-green-hover"
            >
              {t('nav.swap')}
            </Link>
            {user ? (
              <>
                <Link to="/dashboard" className="px-4 py-1.5 text-[13px] text-[#8892a4] hover:text-white rounded-lg hover:bg-[#1a1f2e]/40 transition-all duration-200 flex items-center gap-1.5">
                  <LayoutDashboard className="w-3.5 h-3.5" />داشبورد
                </Link>
                <Link to="/wallet" className="px-4 py-1.5 text-[13px] text-[#8892a4] hover:text-white rounded-lg hover:bg-[#1a1f2e]/40 transition-all duration-200 flex items-center gap-1.5">
                  <Wallet className="w-3.5 h-3.5" />کیف پول
                </Link>
                <button onClick={logout} className="px-4 py-1.5 text-[13px] text-[#8892a4] hover:text-[#ef4444] rounded-lg hover:bg-[#1a1f2e]/40 transition-all duration-200 flex items-center gap-1.5">
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </>
            ) : (
              <Link to="/login" className="px-5 py-1.5 text-[13px] text-[#8892a4] hover:text-white rounded-lg border border-[#1a1f2e] hover:bg-[#1a1f2e]/40 transition-all duration-200 flex items-center gap-1.5">
                <LogIn className="w-3.5 h-3.5" />ورود
              </Link>
            )}
            <a
              href="https://xn--mgbtl4c.com"
              className="px-5 py-1.5 border border-[#d4a017]/40 text-[#d4a017] text-[13px] font-semibold rounded-lg hover:bg-[#d4a017]/10 transition-all duration-200"
            >
              {t('nav.mainSite')}
            </a>
          </div>

          {/* Mobile toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="text-[#8892a4] hover:text-white p-2"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-[#0a0e17] border-t border-[#1a1f2e]/40 px-4 py-4 space-y-1">
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className={`block px-4 py-2.5 rounded-lg text-[14px] font-medium transition-colors ${
                location.pathname === link.to
                  ? 'bg-[#1a1f2e]/80 text-white'
                  : 'text-[#8892a4] hover:text-white hover:bg-[#1a1f2e]/30'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="border-t border-[#1a1f2e]/40 pt-3 mt-3 space-y-2">
            <Link to="/swap" onClick={() => setMobileOpen(false)} className="block text-center px-5 py-2.5 bg-[#00d4aa] text-[#0c1017] text-[14px] font-semibold rounded-lg">{t('nav.swap')}</Link>
            {user ? (
              <>
                <Link to="/dashboard" onClick={() => setMobileOpen(false)} className="block px-4 py-2.5 rounded-lg text-[14px] font-medium text-[#8892a4] hover:text-white hover:bg-[#1a1f2e]/30">داشبورد</Link>
                <Link to="/wallet" onClick={() => setMobileOpen(false)} className="block px-4 py-2.5 rounded-lg text-[14px] font-medium text-[#8892a4] hover:text-white hover:bg-[#1a1f2e]/30">کیف پول</Link>
                <button onClick={() => { logout(); setMobileOpen(false); }} className="block w-full text-left px-4 py-2.5 rounded-lg text-[14px] font-medium text-[#ef4444] hover:bg-[#1a1f2e]/30">خروج</button>
              </>
            ) : (
              <Link to="/login" onClick={() => setMobileOpen(false)} className="block text-center px-5 py-2.5 border border-[#1a1f2e] text-[#8892a4] text-[14px] font-semibold rounded-lg">ورود</Link>
            )}
            <a href="https://xn--mgbtl4c.com" className="block text-center px-5 py-2.5 border border-[#d4a017]/40 text-[#d4a017] text-[14px] font-semibold rounded-lg">{t('nav.mainSite')}</a>
          </div>
          <div className="border-t border-[#1a1f2e]/40 pt-3 mt-3">
            <div className="grid grid-cols-3 gap-1">
              {languages.map(l => (
                <button
                  key={l.code}
                  onClick={() => { setLang(l.code); setMobileOpen(false); }}
                  className={`px-2 py-2 rounded-lg text-[12px] font-medium transition-colors ${
                    lang.code === l.code ? 'text-[#00d4aa] bg-[#00d4aa]/[0.1]' : 'text-[#8892a4] hover:text-white hover:bg-[#1a1f2e]/50'
                  }`}
                >
                  {l.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
