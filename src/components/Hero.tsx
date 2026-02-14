import heroBg from "@/assets/hero-bg.jpg";
import { TrendingUp, ArrowDown } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={heroBg}
          alt="صراف - منصة تبادل العملات"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
      </div>

      {/* Content */}
      <div className="relative z-10 container text-center px-4 py-20">
        <div className="animate-fade-in">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6">
            <span className="gold-text">صَرّاف</span>
          </h1>
          <p className="text-xl md:text-2xl text-foreground/80 max-w-2xl mx-auto mb-4 font-light">
            منصتك الموثوقة لتبادل العملات الرقمية والذهب والفضة
          </p>
          <p className="text-muted-foreground text-lg mb-10 max-w-xl mx-auto">
            أسعار لحظية • تحويل فوري • أمان مطلق
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#rates"
              className="gold-gradient text-primary-foreground px-8 py-4 rounded-xl text-lg font-bold hover:opacity-90 transition-opacity pulse-gold inline-flex items-center gap-2"
            >
              <TrendingUp className="w-5 h-5" />
              مشاهدة الأسعار
            </a>
            <a
              href="#converter"
              className="border border-primary/40 text-primary px-8 py-4 rounded-xl text-lg font-semibold hover:bg-primary/10 transition-colors inline-flex items-center gap-2"
            >
              تحويل العملات
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <ArrowDown className="w-6 h-6 text-primary/60" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
