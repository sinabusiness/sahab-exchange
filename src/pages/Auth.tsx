import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
import { Mail, Lock, User, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const Auth = () => {
  const { t } = useTranslation();
  const { user, loading } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [isResetMode, setIsResetMode] = useState(false);
  const [resetSent, setResetSent] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { signIn, signUp, resetPassword } = useAuth();
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
        console.error("sign-in error", error);
        toast({ title: t("auth.loginErr"), description: t("auth.loginErrGeneric", { defaultValue: "Invalid email or password." }), variant: "destructive" });
      }
    } else {
      const { error, needsEmailConfirmation } = await signUp(email, password, fullName);
      if (error) {
        console.error("sign-up error", error);
        toast({
          title: t("auth.signupErr"),
          description: error.message || t("auth.signupErrGeneric", { defaultValue: "Registration failed. Please try again." }),
          variant: "destructive"
        });
      } else {
        toast({
          title: t("auth.signupOk"),
          description: needsEmailConfirmation
            ? t("auth.signupOkDesc", { defaultValue: "Your account was created. Please confirm your email before signing in." })
            : t("auth.signupOkDesc")
        });
        setIsLogin(true);
        setPassword("");
      }
    }
    setSubmitting(false);
  };

  const title = isLogin ? t("auth.loginTitle") : t("auth.signupTitle");

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4 py-10 geometric-pattern">
      <Helmet>
        <title>{`${title} | ${t("brand")}`}</title>
      </Helmet>
      <div className="absolute top-3 right-3 left-3 flex justify-between items-center">
        <a href="/" className="text-xl font-black gold-text">{t("brand")}</a>
        <LanguageSwitcher compact />
      </div>
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-foreground mt-4">{title}</h1>
          <p className="text-muted-foreground mt-2">{isLogin ? t("auth.loginSub") : t("auth.signupSub")}</p>
        </div>

        <div className="bg-card border border-border rounded-2xl p-6 sm:p-8 gold-glow">
          {isResetMode ? (
            resetSent ? (
              <div className="text-center py-4">
                <Mail className="w-12 h-12 text-primary mx-auto mb-4" />
                <h2 className="text-lg font-bold text-foreground mb-2">{t("auth.resetSent")}</h2>
                <p className="text-muted-foreground text-sm mb-6">{t("auth.resetSentDesc")}</p>
                <button onClick={() => { setIsResetMode(false); setResetSent(false); }} className="text-primary hover:underline text-sm">
                  {t("auth.toLogin")}
                </button>
              </div>
            ) : (
              <form onSubmit={async (e) => {
                e.preventDefault();
                setSubmitting(true);
                const { error } = await resetPassword(email);
                if (error) {
                  toast({ title: t("auth.loginErr"), description: error.message, variant: "destructive" });
                } else {
                  setResetSent(true);
                }
                setSubmitting(false);
              }} className="space-y-5">
                <p className="text-muted-foreground text-sm">{t("auth.resetDesc")}</p>
                <div>
                  <label htmlFor="reset-email" className="text-sm text-muted-foreground mb-1.5 block">{t("auth.email")}</label>
                  <div className="relative">
                    <Mail className="absolute start-3 top-3.5 w-4 h-4 text-muted-foreground" />
                    <input id="reset-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="example@email.com" required dir="ltr"
                      className="w-full bg-secondary border border-border rounded-lg px-4 py-3 ps-10 text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
                  </div>
                </div>
                <button type="submit" disabled={submitting}
                  className="w-full gold-gradient text-primary-foreground py-3 rounded-xl font-bold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2">
                  {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                  {t("auth.resetSubmit")}
                </button>
                <div className="text-center">
                  <button type="button" onClick={() => setIsResetMode(false)} className="text-primary hover:underline text-sm">
                    {t("auth.toLogin")}
                  </button>
                </div>
              </form>
            )
          ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div>
                <label htmlFor="auth-fullname" className="text-sm text-muted-foreground mb-1.5 block">{t("auth.fullName")}</label>
                <div className="relative">
                  <User className="absolute start-3 top-3.5 w-4 h-4 text-muted-foreground" />
                  <input
                    id="auth-fullname"
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={t("auth.fullNamePh")}
                    required
                    className="w-full bg-secondary border border-border rounded-lg px-4 py-3 ps-10 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
            )}

            <div>
              <label htmlFor="auth-email" className="text-sm text-muted-foreground mb-1.5 block">{t("auth.email")}</label>
              <div className="relative">
                <Mail className="absolute start-3 top-3.5 w-4 h-4 text-muted-foreground" />
                <input
                  id="auth-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="example@email.com"
                  required
                  dir="ltr"
                  className="w-full bg-secondary border border-border rounded-lg px-4 py-3 ps-10 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            <div>
              <label htmlFor="auth-password" className="text-sm text-muted-foreground mb-1.5 block">{t("auth.password")}</label>
              <div className="relative">
                <Lock className="absolute start-3 top-3.5 w-4 h-4 text-muted-foreground" />
                <input
                  id="auth-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  minLength={6}
                  dir="ltr"
                  className="w-full bg-secondary border border-border rounded-lg px-4 py-3 ps-10 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              {isLogin && (
                <button type="button" onClick={() => setIsResetMode(true)} className="text-primary hover:underline text-xs mt-1.5">
                  {t("auth.forgotPassword")}
                </button>
              )}
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full gold-gradient text-primary-foreground py-3 rounded-xl font-bold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
              {isLogin ? t("auth.submitLogin") : t("auth.submitSignup")}
            </button>
          </form>
          )}

          {!isResetMode && (
          <div className="mt-6 text-center">
            <button onClick={() => setIsLogin(!isLogin)} className="text-primary hover:underline text-sm">
              {isLogin ? t("auth.toSignup") : t("auth.toLogin")}
            </button>
          </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Auth;
