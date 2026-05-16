import { useState } from "react";
import { Menu, X, LogIn, LayoutDashboard, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, signOut } = useAuth();

  const links = [
    { href: "#rates", label: "الأسعار" },
    { href: "#converter", label: "التحويل" },
    { href: "#services", label: "الخدمات" },
    { href: "#contact", label: "تواصل" },
  ];

  return (
    <nav className="fixed top-0 right-0 left-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
      <div className="container max-w-6xl mx-auto flex items-center justify-between px-4 py-3">
        <Link to="/" className="text-2xl font-black gold-text">صَرّاف</Link>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-muted-foreground hover:text-primary transition-colors font-medium">
              {l.label}
            </a>
          ))}

          {user ? (
            <div className="flex items-center gap-3">
              <Link
                to="/dashboard"
                className="text-primary hover:text-primary/80 transition-colors font-medium flex items-center gap-1.5"
              >
                <LayoutDashboard className="w-4 h-4" />
                لوحة التحكم
              </Link>
              <button
                onClick={signOut}
                aria-label="تسجيل الخروج"
                className="text-muted-foreground hover:text-destructive transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <Link
              to="/auth"
              className="gold-gradient text-primary-foreground px-5 py-2 rounded-lg font-semibold hover:opacity-90 transition-opacity flex items-center gap-1.5 text-sm"
            >
              <LogIn className="w-4 h-4" />
              دخول
            </Link>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          aria-label={open ? "إغلاق القائمة" : "فتح القائمة"}
          aria-expanded={open}
          className="md:hidden text-foreground"
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
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
              <Link to="/dashboard" onClick={() => setOpen(false)} className="block text-primary font-medium py-2">لوحة التحكم</Link>
              <button onClick={() => { signOut(); setOpen(false); }} className="block text-destructive font-medium py-2">تسجيل الخروج</button>
            </>
          ) : (
            <Link to="/auth" onClick={() => setOpen(false)} className="block text-primary font-medium py-2">تسجيل الدخول</Link>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
