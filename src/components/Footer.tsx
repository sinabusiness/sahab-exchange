import { MessageCircle, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer id="contact" className="py-16 px-4 border-t border-border">
      <div className="container max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-2 gold-text">تواصل معنا</h2>
          <p className="text-muted-foreground">نحن هنا لمساعدتك في أي وقت</p>
        </div>

        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12">
          <a
            href="https://wa.me/1234567890"
            target="_blank"
            rel="noopener noreferrer"
            className="gold-gradient text-primary-foreground px-8 py-4 rounded-xl font-bold hover:opacity-90 transition-opacity inline-flex items-center gap-3 text-lg"
          >
            <MessageCircle className="w-5 h-5" />
            تواصل عبر واتساب
          </a>
          <a
            href="mailto:info@xn--mgbqp7cs.com"
            className="border border-primary/40 text-primary px-8 py-4 rounded-xl font-semibold hover:bg-primary/10 transition-colors inline-flex items-center gap-3"
          >
            <Mail className="w-5 h-5" />
            البريد الإلكتروني
          </a>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-2xl font-black gold-text">صَرّاف</div>
          <nav className="flex gap-6 text-sm text-muted-foreground">
            <a href="#rates" className="hover:text-primary transition-colors">الأسعار</a>
            <a href="#converter" className="hover:text-primary transition-colors">التحويل</a>
            <a href="#services" className="hover:text-primary transition-colors">الخدمات</a>
            <a href="#contact" className="hover:text-primary transition-colors">تواصل</a>
          </nav>
          <p className="text-sm text-muted-foreground">
            © 2026 صراف. جميع الحقوق محفوظة
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
