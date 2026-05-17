import { MessageCircle, Mail } from "lucide-react";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <footer id="contact" className="py-12 sm:py-16 px-4 border-t border-border">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-10 sm:mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 gold-text">{t("footer.title")}</h2>
          <p className="text-muted-foreground">{t("footer.subtitle")}</p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4 mb-10 sm:mb-12">
          <a
            href="https://wa.me/1234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto gold-gradient text-primary-foreground px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-bold hover:opacity-90 transition-opacity inline-flex items-center justify-center gap-3 text-base sm:text-lg"
          >
            <MessageCircle className="w-5 h-5" />
            {t("footer.whatsapp")}
          </a>
          <a
            href="mailto:info@xn--mgbqp7cs.com"
            className="w-full sm:w-auto border border-primary/40 text-primary px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:bg-primary/10 transition-colors inline-flex items-center justify-center gap-3"
          >
            <Mail className="w-5 h-5" />
            {t("footer.email")}
          </a>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-start">
          <div className="text-2xl font-black gold-text">{t("brand")}</div>
          <p className="text-sm text-muted-foreground">{t("footer.rights")}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
