import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export default function Footer() {
  const { t } = useTranslation();

  return (
    <footer className="border-t border-[#1a1f2e]/40 bg-[#0a0e17]/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          <div>
            <Link to="/" className="flex items-center gap-2.5 mb-4 group">
              <div className="w-8 h-8 bg-[#00d4aa] rounded-lg flex items-center justify-center transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(0,212,170,0.3)]">
                <span className="text-[#0c1017] font-bold text-sm">S</span>
              </div>
              <span className="text-white font-semibold text-lg tracking-tight">صراف</span>
            </Link>
            <p className="text-[#5a6478] text-[13px] leading-relaxed max-w-xs">{t('footer.description')}</p>
          </div>
          <div>
            <h4 className="text-white text-[13px] font-semibold mb-4 uppercase tracking-wider">{t('footer.quickLinks')}</h4>
            <div className="space-y-2.5">
              <Link to="/" className="block text-[#5a6478] text-[13px] hover:text-[#00d4aa] transition-colors duration-200">{t('nav.home')}</Link>
              <Link to="/swap" className="block text-[#5a6478] text-[13px] hover:text-[#00d4aa] transition-colors duration-200">{t('nav.swap')}</Link>
              <Link to="/trade" className="block text-[#5a6478] text-[13px] hover:text-[#00d4aa] transition-colors duration-200">{t('nav.trade')}</Link>
              <Link to="/fees" className="block text-[#5a6478] text-[13px] hover:text-[#00d4aa] transition-colors duration-200">{t('nav.fees')}</Link>
            </div>
          </div>
          <div>
            <h4 className="text-white text-[13px] font-semibold mb-4 uppercase tracking-wider">{t('footer.legal')}</h4>
            <div className="space-y-2.5">
              <a href="#" className="block text-[#5a6478] text-[13px] hover:text-[#00d4aa] transition-colors duration-200">{t('footer.terms')}</a>
              <a href="#" className="block text-[#5a6478] text-[13px] hover:text-[#00d4aa] transition-colors duration-200">{t('footer.privacy')}</a>
              <a href="#" className="block text-[#5a6478] text-[13px] hover:text-[#00d4aa] transition-colors duration-200">{t('footer.contactUs')}</a>
            </div>
          </div>
          <div>
            <h4 className="text-white text-[13px] font-semibold mb-4 uppercase tracking-wider">{t('footer.contact')}</h4>
            <p className="text-[#5a6478] text-[13px]" dir="ltr">support@صراف.com</p>
          </div>
        </div>
        <div className="section-divider mt-10 pt-6 text-center">
          <p className="text-[#5a6478] text-[12px]">{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
}
