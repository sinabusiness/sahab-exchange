import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import LiveRates from "@/components/LiveRates";
import CurrencyConverter from "@/components/CurrencyConverter";
import Services from "@/components/Services";
import Footer from "@/components/Footer";

const Index = () => {
  const orgLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "صراف",
    alternateName: "Sarraf",
    url: "https://sarraf-connect-hub.lovable.app",
    description:
      "منصة صراف لتبادل العملات الرقمية والذهب والفضة والعملات المحلية في الشرق الأوسط بأسعار لحظية.",
  };
  const siteLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "صراف",
    url: "https://sarraf-connect-hub.lovable.app",
    inLanguage: "ar",
  };
  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "تبادل العملات الرقمية والذهب والفضة",
    provider: { "@type": "Organization", name: "صراف" },
    areaServed: ["AE", "SA", "EG", "IR"],
    description:
      "خدمات تبادل العملات الرقمية والذهب والفضة والعملات المحلية بأسعار لحظية وأمان مطلق.",
  };

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>صراف | تبادل العملات الرقمية والذهب والفضة بأسعار لحظية</title>
        <meta
          name="description"
          content="صراف - منصتك الموثوقة لتبادل العملات الرقمية والذهب والفضة والعملات المحلية في الشرق الأوسط بأسعار لحظية وأمان مطلق."
        />
        <link rel="canonical" href="https://sarraf-connect-hub.lovable.app/" />
        <meta property="og:url" content="https://sarraf-connect-hub.lovable.app/" />
        <script type="application/ld+json">{JSON.stringify(orgLd)}</script>
        <script type="application/ld+json">{JSON.stringify(siteLd)}</script>
        <script type="application/ld+json">{JSON.stringify(serviceLd)}</script>
      </Helmet>
      <Navbar />
      <main>
        <Hero />
        <LiveRates />
        <CurrencyConverter />
        <Services />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
