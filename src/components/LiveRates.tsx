import { useCryptoRates, metalRates, fiatRates } from "@/hooks/useCryptoRates";
import { TrendingUp, TrendingDown, Loader2 } from "lucide-react";

const LiveRates = () => {
  const { data: cryptoRates, isLoading } = useCryptoRates();

  const formatPrice = (price: number) => {
    if (price >= 1000) return price.toLocaleString("en-US", { maximumFractionDigits: 0 });
    if (price >= 1) return price.toLocaleString("en-US", { maximumFractionDigits: 2 });
    return price.toLocaleString("en-US", { maximumFractionDigits: 4 });
  };

  return (
    <section id="rates" className="py-20 px-4 geometric-pattern">
      <div className="container max-w-6xl mx-auto">
        {/* Crypto */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-2 gold-text">
          العملات الرقمية
        </h2>
        <p className="text-muted-foreground text-center mb-10">أسعار لحظية من السوق العالمي</p>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 text-primary animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
            {cryptoRates?.map((coin) => (
              <div
                key={coin.id}
                className="bg-card border border-border rounded-xl p-5 card-hover flex items-center gap-4"
              >
                <img src={coin.image} alt={coin.nameAr} className="w-10 h-10 rounded-full" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-foreground">{coin.nameAr}</span>
                    <span className="text-muted-foreground text-sm" dir="ltr">{coin.symbol}</span>
                  </div>
                  <div className="text-lg font-bold text-foreground" dir="ltr">
                    ${formatPrice(coin.price)}
                  </div>
                </div>
                <div className={`flex items-center gap-1 text-sm font-semibold ${coin.change24h >= 0 ? "rate-positive" : "rate-negative"}`}>
                  {coin.change24h >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                  <span dir="ltr">{Math.abs(coin.change24h).toFixed(2)}%</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Metals */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-2 gold-text">
          المعادن الثمينة
        </h2>
        <p className="text-muted-foreground text-center mb-10">أسعار الذهب والفضة بالأونصة</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-16">
          {metalRates.map((metal) => (
            <div
              key={metal.symbol}
              className="bg-card border border-border rounded-xl p-6 card-hover text-center gold-glow"
            >
              <div className="text-4xl mb-2">{metal.symbol === "XAU" ? "🥇" : "🥈"}</div>
              <h3 className="text-xl font-bold text-foreground mb-1">{metal.nameAr}</h3>
              <div className="text-2xl font-black gold-text" dir="ltr">
                ${formatPrice(metal.pricePerOz)}
              </div>
              <div className="text-sm text-muted-foreground mt-1">للأونصة الواحدة</div>
              <div className={`mt-2 text-sm font-semibold ${metal.change24h >= 0 ? "rate-positive" : "rate-negative"}`}>
                {metal.change24h >= 0 ? "+" : ""}{metal.change24h.toFixed(2)}%
              </div>
            </div>
          ))}
        </div>

        {/* Fiat */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-2 gold-text">
          العملات المحلية
        </h2>
        <p className="text-muted-foreground text-center mb-10">أسعار الصرف مقابل الدولار الأمريكي</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {fiatRates.map((fiat) => (
            <div
              key={fiat.code}
              className="bg-card border border-border rounded-xl p-4 card-hover text-center"
            >
              <div className="text-2xl mb-1">{fiat.flag}</div>
              <div className="font-bold text-foreground text-sm">{fiat.nameAr}</div>
              <div className="text-lg font-bold text-primary mt-1" dir="ltr">
                {fiat.rate < 10 ? fiat.rate.toFixed(3) : fiat.rate.toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground">{fiat.code}/USD</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LiveRates;
