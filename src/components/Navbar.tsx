import { useState } from "react";
import { Menu, X, LogIn, LayoutDashboard, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, signOut } = useAuth();
  const { t } = useTranslation();

  const links = [
    { href: "/#rates", label: t("nav.rates") },
    { href: "/#converter", label: t("nav.converter") },
    { href: "/#services", label: t("nav.services") },
    { href: "/#contact", label: t("nav.contact") },
  ];

  return (
    <nav className="fixed top-0 right-0 left-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="container max-w-6xl mx-auto flex items-center justify-between px-4 py-3 gap-2">
        <Link to="/" className="text-xl sm:text-2xl font-black gold-text shrink-0">{t("brand")}</Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-muted-foreground hover:text-primary transition-colors font-medium text-sm">
              {l.label}
            </a>
          ))}

          <LanguageSwitcher />

          {user ? (
            <div className="flex items-center gap-3">
              <Link
                to="/dashboard"
                className="text-primary hover:text-primary/80 transition-colors font-medium flex items-center gap-1.5 text-sm"
              >
                <LayoutDashboard className="w-4 h-4" />
                {t("nav.dashboard")}
              </Link>
              <button
                onClick={signOut}
                aria-label={t("nav.logout")}
                className="text-muted-foreground hover:text-destructive transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <Link
              to="/auth"
              className="gold-gradient text-primary-foreground px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center gap-1.5 text-sm"
            >
              <LogIn className="w-4 h-4" />
              {t("nav.login")}
            </Link>
          )}
        </div>

        {/* Mobile */}
        <div className="flex md:hidden items-center gap-1">
          <LanguageSwitcher compact />
          <button
            onClick={() => setOpen(!open)}
            aria-label={open ? t("nav.menuClose") : t("nav.menuOpen")}
            aria-expanded={open}
            className="text-foreground p-2"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-background border-t border-border px-4 py-4 space-y-3">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="block text-foreground hover:text-primary transition-colors font-medium py-2">
              {l.label}
            </a>
          ))}
          {user ? (
            <>
              <Link to="/dashboard" onClick={() => setOpen(false)} className="block text-primary font-medium py-2">{t("nav.dashboard")}</Link>
              <button onClick={() => { signOut(); setOpen(false); }} className="block text-destructive font-medium py-2">{t("nav.logout")}</button>
            </>
          ) : (
            <Link to="/auth" onClick={() => setOpen(false)} className="block text-primary font-medium py-2">{t("nav.login")}</Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
