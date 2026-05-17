import { useState } from "react";
import { ArrowLeftRight } from "lucide-react";
import { fiatRates } from "@/hooks/useCryptoRates";
import { useTranslation } from "react-i18next";

const currencies = [
  { code: "USD", flag: "🇺🇸", rate: 1 },
  ...fiatRates,
];

const CurrencyConverter = () => {
  const { t } = useTranslation();
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
    <section id="converter" className="py-16 sm:py-20 px-4">
      <div className="container max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-2 gold-text">
          {t("converter.title")}
        </h2>
        <p className="text-muted-foreground text-center mb-8 sm:mb-10 px-2">
          {t("converter.subtitle")}
        </p>

        <div className="bg-card border border-border rounded-2xl p-4 sm:p-6 md:p-8 gold-glow">
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4">
            {/* From */}
            <div className="flex-1 w-full min-w-0">
              <label htmlFor="conv-from-amount" className="text-sm text-muted-foreground mb-2 block">{t("converter.from")}</label>
              <div className="flex gap-2">
                <input
                  id="conv-from-amount"
                  type="number"
                  inputMode="decimal"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="flex-1 min-w-0 bg-secondary border border-border rounded-lg px-3 py-3 text-foreground text-base sm:text-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  dir="ltr"
                />
                <select
                  aria-label={t("converter.fromAria")}
                  value={fromCurrency}
                  onChange={(e) => setFromCurrency(e.target.value)}
                  className="shrink-0 bg-secondary border border-border rounded-lg px-2 sm:px-3 py-3 text-foreground text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary max-w-[7rem]"
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
            <div className="flex justify-center md:mt-6">
              <button
                onClick={swap}
                aria-label={t("converter.swap")}
                className="bg-primary text-primary-foreground p-3 rounded-full hover:opacity-90 transition-opacity"
              >
                <ArrowLeftRight className="w-5 h-5 rotate-90 md:rotate-0" />
              </button>
            </div>

            {/* To */}
            <div className="flex-1 w-full min-w-0">
              <label htmlFor="conv-to-amount" className="text-sm text-muted-foreground mb-2 block">{t("converter.to")}</label>
              <div className="flex gap-2">
                <input
                  id="conv-to-amount"
                  type="text"
                  value={converted.toLocaleString("en-US", { maximumFractionDigits: 2 })}
                  readOnly
                  className="flex-1 min-w-0 bg-secondary border border-border rounded-lg px-3 py-3 text-foreground text-base sm:text-lg"
                  dir="ltr"
                />
                <select
                  aria-label={t("converter.toAria")}
                  value={toCurrency}
                  onChange={(e) => setToCurrency(e.target.value)}
                  className="shrink-0 bg-secondary border border-border rounded-lg px-2 sm:px-3 py-3 text-foreground text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-primary max-w-[7rem]"
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
            {t("converter.disclaimer")}
          </p>
        </div>
      </div>
    </section>
  );
};

export default CurrencyConverter;
