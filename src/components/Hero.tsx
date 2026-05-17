import heroBg from "@/assets/hero-bg.jpg";
import { TrendingUp, ArrowDown } from "lucide-react";
import { useTranslation } from "react-i18next";

const Hero = () => {
  const { t } = useTranslation();
  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt={t("hero.imgAlt")}
          width={1920}
          height={1080}
          fetchPriority="high"
          decoding="async"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
      </div>

      <div className="relative z-10 container text-center px-4 py-20">
        <div className="animate-fade-in">
          <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black mb-6">
            <span className="gold-text">{t("hero.tagline")}</span>
            <span className="block text-xl sm:text-2xl md:text-3xl lg:text-4xl mt-4 text-foreground/90 font-bold">
              {t("hero.subtitle")}
            </span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-10 max-w-xl mx-auto">
            {t("hero.bullets")}
          </p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            <a
              href="#rates"
              className="w-full sm:w-auto gold-gradient text-primary-foreground px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-bold hover:opacity-90 transition-opacity pulse-gold inline-flex items-center justify-center gap-2"
            >
              <TrendingUp className="w-5 h-5" />
              {t("hero.viewRates")}
            </a>
            <a
              href="#converter"
              className="w-full sm:w-auto border border-primary/40 text-primary px-6 sm:px-8 py-3 sm:py-4 rounded-xl text-base sm:text-lg font-semibold hover:bg-primary/10 transition-colors inline-flex items-center justify-center gap-2"
            >
              {t("hero.convert")}
            </a>
          </div>
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce hidden sm:block">
          <ArrowDown className="w-6 h-6 text-primary/60" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
