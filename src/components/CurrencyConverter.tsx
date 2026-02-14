import { useState } from "react";
import { ArrowLeftRight } from "lucide-react";
import { fiatRates } from "@/hooks/useCryptoRates";

const currencies = [
  { code: "USD", nameAr: "دولار أمريكي", flag: "🇺🇸", rate: 1 },
  ...fiatRates,
];

const CurrencyConverter = () => {
  const [amount, setAmount] = useState("1000");
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("AED");

  const fromRate = currencies.find((c) => c.code === fromCurrency)?.rate || 1;
  const toRate = currencies.find((c) => c.code === toCurrency)?.rate || 1;
  const converted = ((parseFloat(amount) || 0) / fromRate) * toRate;

  const swap = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <section id="converter" className="py-20 px-4">
      <div className="container max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-2 gold-text">
          محوّل العملات
        </h2>
        <p className="text-muted-foreground text-center mb-10">
          حوّل بين العملات العالمية بأسعار لحظية
        </p>

        <div className="bg-card border border-border rounded-2xl p-6 md:p-8 gold-glow">
          <div className="flex flex-col md:flex-row items-center gap-4">
            {/* From */}
            <div className="flex-1 w-full">
              <label className="text-sm text-muted-foreground mb-2 block">من</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="flex-1 bg-secondary border border-border rounded-lg px-4 py-3 text-foreground text-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  dir="ltr"
                />
                <select
                  value={fromCurrency}
                  onChange={(e) => setFromCurrency(e.target.value)}
                  className="bg-secondary border border-border rounded-lg px-3 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {currencies.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.flag} {c.code}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Swap button */}
            <button
              onClick={swap}
              className="bg-primary text-primary-foreground p-3 rounded-full hover:opacity-90 transition-opacity mt-4 md:mt-6"
            >
              <ArrowLeftRight className="w-5 h-5" />
            </button>

            {/* To */}
            <div className="flex-1 w-full">
              <label className="text-sm text-muted-foreground mb-2 block">إلى</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={converted.toLocaleString("en-US", { maximumFractionDigits: 2 })}
                  readOnly
                  className="flex-1 bg-secondary border border-border rounded-lg px-4 py-3 text-foreground text-lg"
                  dir="ltr"
                />
                <select
                  value={toCurrency}
                  onChange={(e) => setToCurrency(e.target.value)}
                  className="bg-secondary border border-border rounded-lg px-3 py-3 text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {currencies.map((c) => (
                    <option key={c.code} value={c.code}>
                      {c.flag} {c.code}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <p className="text-center text-muted-foreground text-sm mt-6">
            الأسعار تقريبية وتُحدّث كل دقيقة
          </p>
        </div>
      </div>
    </section>
  );
};

export default CurrencyConverter;
