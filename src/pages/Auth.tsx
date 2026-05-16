import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
import { Mail, Lock, User, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Helmet } from "react-helmet-async";

const Auth = () => {
  const { user, loading } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { signIn, signUp } = useAuth();
  const { toast } = useToast();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (user) return <Navigate to="/dashboard" replace />;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    if (isLogin) {
      const { error } = await signIn(email, password);
      if (error) {
        toast({ title: "خطأ في الدخول", description: error.message, variant: "destructive" });
      }
    } else {
      const { error } = await signUp(email, password, fullName);
      if (error) {
        toast({ title: "خطأ في التسجيل", description: error.message, variant: "destructive" });
      } else {
        toast({ title: "تم التسجيل بنجاح", description: "تحقق من بريدك الإلكتروني لتأكيد الحساب" });
      }
    }
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 geometric-pattern">
      <Helmet>
        <title>{isLogin ? "تسجيل الدخول | صراف" : "إنشاء حساب | صراف"}</title>
        <meta
          name="description"
          content={isLogin
            ? "سجّل الدخول إلى حسابك في صراف لإدارة طلبات تبادل العملات الرقمية والذهب والفضة بأمان."
            : "أنشئ حساباً جديداً في صراف وابدأ بتبادل العملات الرقمية والذهب والفضة بأسعار لحظية موثوقة."}
        />
        <link rel="canonical" href="https://sarraf-connect-hub.lovable.app/auth" />
        <meta property="og:title" content={isLogin ? "تسجيل الدخول | صراف" : "إنشاء حساب | صراف"} />
        <meta property="og:description" content={isLogin ? "سجّل الدخول إلى حسابك في صراف." : "أنشئ حساباً جديداً في صراف."} />
        <meta property="og:url" content="https://sarraf-connect-hub.lovable.app/auth" />
        <meta property="og:type" content="website" />
      </Helmet>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <a href="/" className="text-4xl font-black gold-text">صَرّاف</a>
          <h1 className="text-2xl font-bold text-foreground mt-4">
            {isLogin ? "تسجيل الدخول" : "إنشاء حساب جديد"}
          </h1>
          <p className="text-muted-foreground mt-2">
            {isLogin ? "ادخل إلى حسابك لإدارة طلباتك" : "ابدأ التبادل بأمان خلال دقائق"}
          </p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-8 gold-glow">
          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div>
                <label htmlFor="auth-fullname" className="text-sm text-muted-foreground mb-1.5 block">الاسم الكامل</label>
                <div className="relative">
                  <User className="absolute right-3 top-3.5 w-4 h-4 text-muted-foreground" />
                  <input
                    id="auth-fullname"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="أدخل اسمك"
                    required
                    className="w-full bg-secondary border border-border rounded-lg px-4 py-3 pr-10 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
            )}

            <div>
              <label htmlFor="auth-email" className="text-sm text-muted-foreground mb-1.5 block">البريد الإلكتروني</label>
              <div className="relative">
                <Mail className="absolute right-3 top-3.5 w-4 h-4 text-muted-foreground" />
                <input
                  id="auth-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@email.com"
                  required
                  dir="ltr"
                  className="w-full bg-secondary border border-border rounded-lg px-4 py-3 pr-10 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div>
              <label htmlFor="auth-password" className="text-sm text-muted-foreground mb-1.5 block">كلمة المرور</label>
              <div className="relative">
                <Lock className="absolute right-3 top-3.5 w-4 h-4 text-muted-foreground" />
                <input
                  id="auth-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  minLength={6}
                  dir="ltr"
                  className="w-full bg-secondary border border-border rounded-lg px-4 py-3 pr-10 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full gold-gradient text-primary-foreground py-3 rounded-xl font-bold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
              {isLogin ? "تسجيل الدخول" : "إنشاء حساب"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-primary hover:underline text-sm"
            >
              {isLogin ? "ليس لديك حساب؟ سجّل الآن" : "لديك حساب؟ سجّل الدخول"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
