import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Navigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import { Loader2, Plus, Clock, CheckCircle, XCircle, ArrowUpDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useCryptoRates, fiatRates } from "@/hooks/useCryptoRates";
import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";

interface Order {
  id: string;
  order_type: string;
  from_currency: string;
  to_currency: string;
  amount: number;
  rate: number;
  total: number;
  status: string;
  notes: string | null;
  created_at: string;
}

const RTL = ["ar", "fa", "ur"];

const Dashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const { t, i18n } = useTranslation();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const { toast } = useToast();
  const { data: cryptoRates } = useCryptoRates();

  const isRtl = RTL.includes(i18n.language?.split("-")[0] || "en");
  const align = isRtl ? "text-right" : "text-left";

  const statusIcons: Record<string, any> = {
    pending: <Clock className="w-4 h-4 text-primary" />,
    confirmed: <ArrowUpDown className="w-4 h-4 text-accent" />,
    completed: <CheckCircle className="w-4 h-4 rate-positive" />,
    cancelled: <XCircle className="w-4 h-4 rate-negative" />,
  };
  const statusLabels: Record<string, string> = {
    pending: t("dashboard.statusPending"),
    confirmed: t("dashboard.statusConfirmed"),
    completed: t("dashboard.statusCompleted"),
    cancelled: t("dashboard.statusCancelled"),
  };

  // New order form
  const [orderType, setOrderType] = useState<"buy" | "sell">("buy");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("BTC");
  const [amount, setAmount] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const allCurrencies = [
    { code: "USD", label: "USD - USD" },
    ...fiatRates.map((f) => ({ code: f.code, label: `${f.code} - ${f.nameAr}` })),
    ...(cryptoRates || []).map((c) => ({ code: c.symbol, label: `${c.symbol} - ${c.name}` })),
  ];

  useEffect(() => {
    if (user) fetchOrders();
  }, [user]);

  const fetchOrders = async () => {
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error && data) setOrders(data as Order[]);
    setLoadingOrders(false);
  };

  const getRate = (from: string, to: string) => {
    const crypto = cryptoRates || [];
    const fromCrypto = crypto.find((c) => c.symbol === from);
    const toCrypto = crypto.find((c) => c.symbol === to);
    const fromFiat = fiatRates.find((f) => f.code === from);
    const toFiat = fiatRates.find((f) => f.code === to);

    let fromUsd = 1;
    let toUsd = 1;

    if (fromCrypto) fromUsd = fromCrypto.price;
    else if (fromFiat) fromUsd = 1 / fromFiat.rate;

    if (toCrypto) toUsd = toCrypto.price;
    else if (toFiat) toUsd = 1 / toFiat.rate;

    return fromUsd / toUsd;
  };

  const handleCreateOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSubmitting(true);

    const { data, error } = await supabase.functions.invoke("create-order", {
      body: {
        order_type: orderType,
        from_currency: fromCurrency,
        to_currency: toCurrency,
        amount: parseFloat(amount),
      },
    });

    if (error || (data as any)?.error) {
      console.error("create-order failed", error || (data as any)?.error);
      toast({ title: t("dashboard.error"), description: t("dashboard.createFailed", { defaultValue: "Could not create order. Please try again." }), variant: "destructive" });
    } else {
      toast({ title: t("dashboard.createSuccess") });
      setShowForm(false);
      setAmount("");
      fetchOrders();
    }
    setSubmitting(false);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) return <Navigate to="/auth" replace />;

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{t("dashboard.title")} | {t("brand")}</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <Navbar />
      <div className="pt-24 px-4 pb-12">
        <div className="container max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div>
              <h1 className="text-3xl font-bold gold-text">{t("dashboard.title")}</h1>
              <p className="text-muted-foreground text-sm mt-1" dir="ltr">{user.email}</p>
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="gold-gradient text-primary-foreground px-6 py-3 rounded-xl font-bold hover:opacity-90 transition-opacity flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              {t("dashboard.newOrder")}
            </button>
          </div>

          {showForm && (
            <div className="bg-card border border-border rounded-2xl p-6 mb-8 gold-glow">
              <h2 className="text-lg font-bold mb-4">{t("dashboard.createOrder")}</h2>
              <form onSubmit={handleCreateOrder} className="space-y-4">
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setOrderType("buy")}
                    className={`flex-1 py-2 rounded-lg font-semibold transition-colors ${
                      orderType === "buy"
                        ? "gold-gradient text-primary-foreground"
                        : "bg-secondary text-muted-foreground"
                    }`}
                  >
                    {t("dashboard.buy")}
                  </button>
                  <button
                    type="button"
                    onClick={() => setOrderType("sell")}
                    className={`flex-1 py-2 rounded-lg font-semibold transition-colors ${
                      orderType === "sell"
                        ? "gold-gradient text-primary-foreground"
                        : "bg-secondary text-muted-foreground"
                    }`}
                  >
                    {t("dashboard.sell")}
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label htmlFor="order-from" className="text-sm text-muted-foreground mb-1 block">{t("dashboard.fromCurrency")}</label>
                    <select id="order-from" value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}
                      className="w-full bg-secondary border border-border rounded-lg px-3 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                      {allCurrencies.map((c) => (<option key={c.code} value={c.code}>{c.label}</option>))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="order-to" className="text-sm text-muted-foreground mb-1 block">{t("dashboard.toCurrency")}</label>
                    <select id="order-to" value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}
                      className="w-full bg-secondary border border-border rounded-lg px-3 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                      {allCurrencies.map((c) => (<option key={c.code} value={c.code}>{c.label}</option>))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="order-amount" className="text-sm text-muted-foreground mb-1 block">{t("dashboard.amount")}</label>
                    <input id="order-amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required min="0.0001" step="any" dir="ltr"
                      className="w-full bg-secondary border border-border rounded-lg px-3 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary" />
                  </div>
                </div>

                {amount && (
                  <p className="text-sm text-muted-foreground">
                    {t("dashboard.approxRate")}: {(parseFloat(amount) * getRate(fromCurrency, toCurrency)).toLocaleString("en-US", { maximumFractionDigits: 8 })} {toCurrency}
                  </p>
                )}

                <button type="submit" disabled={submitting}
                  className="w-full gold-gradient text-primary-foreground py-3 rounded-xl font-bold hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2">
                  {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                  {t("dashboard.submit")}
                </button>
              </form>
            </div>
          )}

          <div className="bg-card border border-border rounded-2xl overflow-hidden">
            <div className="p-6 border-b border-border">
              <h2 className="text-lg font-bold">{t("dashboard.myOrders")}</h2>
            </div>

            {loadingOrders ? (
              <div className="p-12 text-center"><Loader2 className="w-6 h-6 animate-spin text-primary mx-auto" /></div>
            ) : orders.length === 0 ? (
              <div className="p-12 text-center text-muted-foreground">{t("dashboard.noOrders")}</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className={`border-b border-border text-sm text-muted-foreground`}>
                      <th className={`px-6 py-3 ${align}`}>{t("dashboard.type")}</th>
                      <th className={`px-6 py-3 ${align}`}>{t("dashboard.from")}</th>
                      <th className={`px-6 py-3 ${align}`}>{t("dashboard.to")}</th>
                      <th className={`px-6 py-3 ${align}`}>{t("dashboard.amount")}</th>
                      <th className={`px-6 py-3 ${align}`}>{t("dashboard.total")}</th>
                      <th className={`px-6 py-3 ${align}`}>{t("dashboard.status")}</th>
                      <th className={`px-6 py-3 ${align}`}>{t("dashboard.date")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                        <td className="px-6 py-4">
                          <span className={`text-sm font-semibold ${order.order_type === "buy" ? "rate-positive" : "rate-negative"}`}>
                            {order.order_type === "buy" ? t("dashboard.buy") : t("dashboard.sell")}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm">{order.from_currency}</td>
                        <td className="px-6 py-4 text-sm">{order.to_currency}</td>
                        <td className="px-6 py-4 text-sm" dir="ltr">{Number(order.amount).toLocaleString()}</td>
                        <td className="px-6 py-4 text-sm" dir="ltr">{Number(order.total).toLocaleString("en-US", { maximumFractionDigits: 8 })}</td>
                        <td className="px-6 py-4">
                          <span className="flex items-center gap-1.5 text-sm">
                            {statusIcons[order.status]}
                            {statusLabels[order.status] || order.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-muted-foreground" dir="ltr">
                          {new Date(order.created_at).toLocaleDateString(i18n.language || "en")}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
