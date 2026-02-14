import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import LiveRates from "@/components/LiveRates";
import CurrencyConverter from "@/components/CurrencyConverter";
import Services from "@/components/Services";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <LiveRates />
      <CurrencyConverter />
      <Services />
      <Footer />
    </div>
  );
};

export default Index;
