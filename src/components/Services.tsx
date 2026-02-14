import { Shield, Zap, Globe, HeadphonesIcon, Coins, TrendingUp } from "lucide-react";

const services = [
  { icon: Coins, title: "تبادل العملات الرقمية", desc: "بيع وشراء البيتكوين والإيثريوم وأكثر من 50 عملة رقمية" },
  { icon: TrendingUp, title: "تداول الذهب والفضة", desc: "أسعار تنافسية للمعادن الثمينة مع توصيل فوري" },
  { icon: Globe, title: "تحويل العملات", desc: "تحويلات سريعة بين جميع العملات العربية والأجنبية" },
  { icon: Shield, title: "أمان مطلق", desc: "تشفير متقدم وحماية كاملة لأموالك ومعاملاتك" },
  { icon: Zap, title: "سرعة التنفيذ", desc: "معاملات فورية بدون تأخير أو رسوم مخفية" },
  { icon: HeadphonesIcon, title: "دعم على مدار الساعة", desc: "فريق دعم متخصص بالعربية والفارسية 24/7" },
];

const Services = () => {
  return (
    <section id="services" className="py-20 px-4 bg-surface-1">
      <div className="container max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-2 gold-text">
          خدماتنا
        </h2>
        <p className="text-muted-foreground text-center mb-12">
          حلول مالية شاملة تلبي جميع احتياجاتك
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <div
              key={i}
              className="bg-card border border-border rounded-xl p-6 card-hover group"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="gold-gradient w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <service.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{service.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{service.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
