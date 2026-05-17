import { Shield, Zap, Globe, HeadphonesIcon, Coins, TrendingUp } from "lucide-react";
import { useTranslation } from "react-i18next";

const icons = [Coins, TrendingUp, Globe, Shield, Zap, HeadphonesIcon];

const Services = () => {
  const { t } = useTranslation();
  const items = t("services.items", { returnObjects: true }) as { title: string; desc: string }[];

  return (
    <section id="services" className="py-16 sm:py-20 px-4 bg-surface-1">
      <div className="container max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-2 gold-text">{t("services.title")}</h2>
        <p className="text-muted-foreground text-center mb-10 sm:mb-12 px-2">{t("services.subtitle")}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {items.map((service, i) => {
            const Icon = icons[i] || Coins;
            return (
              <div key={i} className="bg-card border border-border rounded-xl p-6 card-hover group">
                <div className="gold-gradient w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-2">{service.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{service.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
