export const languages = [
  { code: 'fa', name: 'فارسی', dir: 'rtl' },
  { code: 'ar', name: 'العربية', dir: 'rtl' },
  { code: 'en', name: 'English', dir: 'ltr' },
  { code: 'tr', name: 'Türkçe', dir: 'ltr' },
  { code: 'ru', name: 'Русский', dir: 'ltr' },
  { code: 'fr', name: 'Français', dir: 'ltr' },
  { code: 'de', name: 'Deutsch', dir: 'ltr' },
  { code: 'es', name: 'Español', dir: 'ltr' },
  { code: 'zh', name: '中文', dir: 'ltr' },
  { code: 'hi', name: 'हिन्दी', dir: 'ltr' },
] as const;

export type LangCode = typeof languages[number]['code'];

export type Dict = {
  nav: { home: string; swap: string; trade: string; fees: string; mainSite: string };
  hero: { title: string; subtitle: string; cta: string; stats: { users: string; coins: string; volume: string } };
  swap: {
    title: string; subtitle: string; youPay: string; youReceive: string; exchange: string; rate: string; noHiddenFees: string;
    balance: string; max: string; networkFee: string; estimatedTime: string; timeRange: string; included: string; poweredBy: string;
    recentSwaps: string; table: { coin: string; pay: string; receive: string; rate: string; status: string };
    statusCompleted: string; statusProcessing: string;
    why: { title: string; nonCustodial: string; nonCustodialDesc: string; fast: string; fastDesc: string; bestRate: string; bestRateDesc: string; noKyc: string; noKycDesc: string };
    noticeTitle: string; noticeDesc: string; volume24h: string; live: string; swapsToday: string; dailyTarget: string; topPairs: string;
  };
  home: {
    livePrices: string; whyTitle: string; howItWorks: string; startNow: string; startNowDesc: string; startSwapping: string;
    statsUsers: string; statsCoins: string; statsVolume: string;
    nonCustodial: string; nonCustodialDesc: string; fast: string; fastDesc: string; noKyc: string; noKycDesc: string;
    step1Title: string; step1Desc: string; step2Title: string; step2Desc: string; step3Title: string; step3Desc: string;
    marketOverview: string; topGainers: string; topLosers: string; mostTraded: string;
    securityTitle: string; sec2fa: string; sec2faDesc: string; secCold: string; secColdDesc: string; secInsurance: string; secInsuranceDesc: string; secAudit: string; secAuditDesc: string;
  };
  trade: {
    search: string; favorites: string; coin: string; price: string; change: string;
    h24Change: string; h24High: string; h24Low: string; h24Volume: string;
    tf1m: string; tf5m: string; tf15m: string; tf1h: string; tf4h: string; tf1d: string; tf1w: string;
    orderBook: string; recentTrades: string; priceUSDT: string; amount: string; total: string; time: string;
    buy: string; sell: string; limit: string; market: string; stopLimit: string; available: string;
  };
  fees: {
    title: string; subtitle: string;
    tradingTitle: string; tradingDesc: string; tier: string; monthlyVolume: string; makerFee: string; takerFee: string;
    withdrawalTitle: string; withdrawalDesc: string; coin: string; network: string; fee: string; approxUsd: string;
    point1Title: string; point1Desc: string; point2Title: string; point2Desc: string; point3Title: string; point3Desc: string;
    faqTitle: string;
    faq1Q: string; faq1A: string; faq2Q: string; faq2A: string; faq3Q: string; faq3A: string; faq4Q: string; faq4A: string; faq5Q: string; faq5A: string;
  };
  footer: { copyright: string; brandName: string; description: string; quickLinks: string; legal: string; terms: string; privacy: string; contactUs: string; contact: string };
};

const resources: Record<LangCode, { translation: Dict }> = {
  fa: {
    translation: {
      nav: { home: 'خانه', swap: 'مبادله', trade: 'معامله', fees: 'کارمزدها', mainSite: 'صراف.com' },
      hero: { title: 'صراف', subtitle: 'مبادله امن و سریع ارزهای دیجیتال', cta: 'شروع مبادله', stats: { users: '۱۰۰K+ کاربر', coins: '۱,۵۰۰+ ارز', volume: '$۱۰B+ حجم' } },
      swap: {
        title: 'مبادله ارز دیجیتال', subtitle: 'بدون احراز هویت، بدون کارمزد پنهان', youPay: 'می‌پردازید', youReceive: 'دریافت می‌کنید', exchange: 'مبادله', rate: 'نرخ مبادله', noHiddenFees: 'بدون کارمزد پنهان',
        balance: 'موجودی:', max: 'حداکثر', networkFee: 'کارمزد شبکه', estimatedTime: 'زمان تقریبی', timeRange: '۵-۳۰ دقیقه', included: 'شامل', poweredBy: 'پشتیبانی شده توسط Godex • بدون KYC • ۱,۵۰۰+ ارز',
        recentSwaps: 'آخرین مبادلات', table: { coin: 'ارز', pay: 'پرداخت', receive: 'دریافت', rate: 'نرخ', status: 'وضعیت' },
        statusCompleted: '✓ تکمیل شده', statusProcessing: '⏳ در حال پردازش',
        why: { title: 'چرا صراف', nonCustodial: 'غیر حضانتی', nonCustodialDesc: 'دارایی‌های شما در کیف پولتان باقی می‌ماند', fast: 'سریع', fastDesc: '۵-۳۰ دقیقه برای مبادله', bestRate: 'بهترین نرخ', bestRateDesc: 'مقایسه از ۱۰+ صرافی', noKyc: 'بدون KYC', noKycDesc: 'بدون احراز هویت' },
        noticeTitle: 'توجه', noticeDesc: 'صراف فقط از تبادل ارز دیجیتال به ارز دیجیتال پشتیبانی می‌کند. برای تبدیل ارزهای فیات از پلتفرم محلی استفاده کنید.', volume24h: 'حجم ۲۴ ساعته', live: 'زنده', swapsToday: '۱,۲۳۴ مبادله امروز', dailyTarget: 'هدف روزانه: $۳.۵M', topPairs: 'جفت ارزهای برتر',
      },
      home: {
        livePrices: 'قیمت‌های لحظه‌ای', whyTitle: 'چرا صراف', howItWorks: 'چگونه کار می‌کند؟', startNow: 'همین الان شروع کنید', startNowDesc: 'بدون ثبت‌نام، بدون انتظار. فوراً مبادله کنید.', startSwapping: 'شروع مبادله',
        statsUsers: 'کاربران', statsCoins: 'ارزها', statsVolume: 'حجم',
        nonCustodial: 'غیر حضانتی', nonCustodialDesc: 'دارایی‌های شما در کیف پولتان باقی می‌ماند. هرگز ارزهای شما را نگه نمی‌داریم.', fast: 'سریع', fastDesc: 'بیشتر مبادلات در ۵-۳۰ دقیقه انجام می‌شود.', noKyc: 'بدون KYC', noKycDesc: 'بدون احراز هویت معامله کنید. حریم خصوصی اول.',
        step1Title: 'ارزها را انتخاب کنید', step1Desc: 'ارز مورد نظر خود را از بیش از ۱,۵۰۰ ارز موجود انتخاب کنید.', step2Title: 'مبلغ را وارد کنید', step2Desc: 'مبلغ مورد نظر برای مبادله را وارد کنید. نرخ لحظه‌ای نمایش داده می‌شود.', step3Title: 'ارزهای خود را دریافت کنید', step3Desc: 'آدرس کیف پول خود را وارد کنید و ارزهای خود را در کمتر از ۵ دقیقه دریافت کنید.',
        marketOverview: 'نمای بازار', topGainers: 'بیشترین افزایش', topLosers: 'بیشترین کاهش', mostTraded: 'پرمعامله‌ترین',
        securityTitle: 'امنیت', sec2fa: 'احراز هویت دو مرحله‌ای', sec2faDesc: 'محافظت اضافی با 2FA برای حساب شما', secCold: 'ذخیره سرد', secColdDesc: '۹۸٪ دارایی‌ها در ذخیره سرد آفلاین', secInsurance: 'صندوق بیمه', secInsuranceDesc: 'بیمه دارایی‌ها تا $۱۰۰M', secAudit: 'حسابرسی منظم', secAuditDesc: 'بررسی امنیتی ماهانه توسط شرکت‌های مستقل',
      },
      trade: {
        search: 'جستجو...', favorites: 'مورد علاقه', coin: 'ارز', price: 'قیمت', change: 'تغییر',
        h24Change: 'تغییر ۲۴ ساعته', h24High: 'بالاترین ۲۴ ساعته', h24Low: 'پایین‌ترین ۲۴ ساعته', h24Volume: 'حجم ۲۴ ساعته',
        tf1m: '۱د', tf5m: '۵د', tf15m: '۱۵د', tf1h: '۱س', tf4h: '۴س', tf1d: '۱روز', tf1w: '۱هفته',
        orderBook: 'دفتر اوامر', recentTrades: 'آخرین معاملات', priceUSDT: 'قیمت (USDT)', amount: 'مقدار', total: 'جمع', time: 'زمان',
        buy: 'خرید', sell: 'فروش', limit: 'حد', market: 'بازار', stopLimit: 'حد توقف', available: 'موجود',
      },
      fees: {
        title: 'کارمزدها', subtitle: 'ساختار شفاف کارمزد بدون هزینه‌های پنهان',
        tradingTitle: 'کارمزد معاملات', tradingDesc: 'کارمزد سازنده و گیرنده بر اساس حجم معاملات ۳۰ روزه', tier: 'سطح', monthlyVolume: 'حجم ماهانه', makerFee: 'کارمزد سازنده', takerFee: 'کارمزد گیرنده',
        withdrawalTitle: 'کارمزد برداشت', withdrawalDesc: 'کارمزد برداشت برای هر شبکه', coin: 'ارز', network: 'شبکه', fee: 'کارمزد', approxUsd: 'تقریباً USD',
        point1Title: 'کارمزد پایین', point1Desc: 'شروع از ۰.۱۰٪ برای هر دو طرف معامله. بدون هزینه پنهان.', point2Title: 'تخفیف حجمی', point2Desc: 'تا ۱۰۰٪ تخفیف کارمزد سازنده برای کاربران VIP.', point3Title: 'برداشت رایگان', point3Desc: 'برداشت رایگان USDT از طریق شبکه TRC-20.',
        faqTitle: 'سوالات متداول',
        faq1Q: 'کارمزد سازنده و گیرنده چیست؟', faq1A: 'سازنده کسی است که سفارش را در دفتر سفارشات قرار می‌دهد. گیرنده کسی است که سفارش موجود را اجرا می‌کند.',
        faq2Q: 'آیا کارمزد برداشت ثابت است؟', faq2A: 'کارمزد برداشت بسته به شبکه متفاوت است. برای مثال USDT از طریق TRC-20 فقط ۱ USDT است.',
        faq3Q: 'چگونه کارمزد کمتری بپردازم؟', faq3A: 'با افزایش حجم معاملات ۳۰ روزه خود، سطح VIP بالاتری دریافت می‌کنید و کارمزد کمتری می‌پردازید.',
        faq4Q: 'آیا کارمزدی برای سپرده‌گذاری وجود دارد؟', faq4A: 'خیر، سپرده‌گذاری رایگان است. فقط کارمزد شبکه blockchain پرداخت می‌کنید.',
        faq5Q: 'آیا کارمزدها تغییر می‌کنند؟', faq5A: 'کارمزدها ممکن است بر اساس شرایط بازار تغییر کنند. همیشه آخرین نرخ‌ها را در صفحه کارمزدها بررسی کنید.',
      },
      footer: { copyright: '© ۲۰۲۶ صراف اکسچنج. تمامی حقوق محفوظ است.', brandName: 'صراف', description: 'پلتفرم امن و معتبر مبادله ارزهای دیجیتال.', quickLinks: 'لینک‌های سریع', legal: 'قانونی', terms: 'شرایط و قوانین', privacy: 'حریم خصوصی', contactUs: 'تماس با ما', contact: 'ارتباط' },
    },
  },
  ar: {
    translation: {
      nav: { home: 'الرئيسية', swap: 'التبديل', trade: 'التداول', fees: 'الرسوم', mainSite: 'صراف.com' },
      hero: { title: 'صراف', subtitle: 'تبادل آمن وسريع للعملات الرقمية', cta: 'ابدأ التبديل', stats: { users: '١٠٠K+ مستخدم', coins: '١,٥٠٠+ عملة', volume: '$١٠B+ حجم' } },
      swap: {
        title: 'تبادل العملات الرقمية', subtitle: 'بدون التحقق، بدون رسوم مخفية', youPay: 'تدفع', youReceive: 'تتلقى', exchange: 'تبادل', rate: 'سعر الصرف', noHiddenFees: 'بدون رسوم مخفية',
        balance: 'الرصيد:', max: 'الأقصى', networkFee: 'رسوم الشبكة', estimatedTime: 'الوقت المقدر', timeRange: '٥-٣٠ دقيقة', included: 'مضمونة', poweredBy: 'مدعوم بواسطة Godex • بدون KYC • ١,٥٠٠+ عملة',
        recentSwaps: 'آخر التبادلات', table: { coin: 'العملة', pay: 'تدفع', receive: 'تتلقى', rate: 'السعر', status: 'الحالة' },
        statusCompleted: '✓ مكتمل', statusProcessing: '⏳ قيد التنفيذ',
        why: { title: 'لماذا صراف', nonCustodial: 'غير حاضن', nonCustodialDesc: 'أموالك تبقى في محفظتك', fast: 'سريع', fastDesc: '٥-٣٠ دقيقة للتبادل', bestRate: 'أفضل سعر', bestRateDesc: 'نقارن من ١٠+ منصات', noKyc: 'بدون KYC', noKycDesc: 'بدون التحقق من الهوية' },
        noticeTitle: 'تنبيه', noticeDesc: 'صراف يدعم فقط التبادل من عملة رقمية إلى عملة رقمية أخرى. لتحويل العملات المحلية، استخدم منصة محلية.', volume24h: 'حجم ٢٤ ساعة', live: 'مباشر', swapsToday: '١,٢٣٤ تبادل اليوم', dailyTarget: 'الهدف اليومي: $٣.٥M', topPairs: 'أزواج مميزة',
      },
      home: {
        livePrices: 'الأسعار المباشرة', whyTitle: 'لماذا صراف', howItWorks: 'كيف يعمل؟', startNow: 'ابدأ الآن', startNowDesc: 'بدون تسجيل، بدون انتظار. قم بتبادل العملات الرقمية فوراً.', startSwapping: 'ابدأ التبديل',
        statsUsers: 'المستخدمين', statsCoins: 'العملات', statsVolume: 'الحجم',
        nonCustodial: 'غير حاضن', nonCustodialDesc: 'أموالك تبقى في محفظتك. لا نحتفظ بعملاتك أبداً.', fast: 'سريع', fastDesc: 'تتم معظم التبادلات في ٥-٣٠ دقيقة.', noKyc: 'بدون KYC', noKycDesc: 'تداول بدون التحقق من الهوية. الخصوصية أولاً.',
        step1Title: 'اختر العملات', step1Desc: 'اختر العملة التي تريد تبادلها من أكثر من ١,٥٠٠ عملة متاحة.', step2Title: 'أدخل المبلغ', step2Desc: 'أدخل المبلغ الذي تريد تبادله. يتم عرض سعر الصرف اللحظي.', step3Title: 'استلم عملاتك', step3Desc: 'أدخل عنوان محفظتك واستلم عملاتك في أقل من ٥ دقائق.',
        marketOverview: 'نظرة عامة على السوق', topGainers: 'الارتفاعات', topLosers: 'الانخفاضات', mostTraded: 'الأكثر تداولاً',
        securityTitle: 'الأمان', sec2fa: 'المصادقة الثنائية', sec2faDesc: 'حماية إضافية بـ 2FA لحسابك', secCold: 'التخزين البارد', secColdDesc: '٩٨٪ من الأصول في التخزين البارد', secInsurance: 'صندوق التأمين', secInsuranceDesc: 'تأمين الأصول حتى $١٠٠M', secAudit: 'تدقيق دوري', secAuditDesc: 'مراجعة أمنية شهرية من شركات مستقلة',
      },
      trade: {
        search: 'بحث...', favorites: 'المفضلة', coin: 'العملة', price: 'السعر', change: 'التغيير',
        h24Change: 'تغيير ٢٤ ساعة', h24High: 'أعلى ٢٤ ساعة', h24Low: 'أدنى ٢٤ ساعة', h24Volume: 'حجم ٢٤ ساعة',
        tf1m: '١د', tf5m: '٥د', tf15m: '١٥د', tf1h: '١س', tf4h: '٤س', tf1d: '١يوم', tf1w: '١أسبوع',
        orderBook: 'دفتر الأوامر', recentTrades: 'آخر الصفقات', priceUSDT: 'السعر (USDT)', amount: 'الكمية', total: 'المجموع', time: 'الوقت',
        buy: 'شراء', sell: 'بيع', limit: 'حد', market: 'سوق', stopLimit: 'حد توقف', available: 'المتاح',
      },
      fees: {
        title: 'الرسوم', subtitle: 'هيكل رسوم شفاف بدون تكاليف خفية',
        tradingTitle: 'رسوم التداول', tradingDesc: 'رسوم صانع ومستلم الأسعار بناءً على حجم التداول لمدة ٣٠ يوماً', tier: 'المستوى', monthlyVolume: 'الحجم الشهري', makerFee: 'رسوم الصانع', takerFee: 'رسوم المستلم',
        withdrawalTitle: 'رسوم السحب', withdrawalDesc: 'رسوم السحب لكل شبكة', coin: 'العملة', network: 'الشبكة', fee: 'الرسوم', approxUsd: 'تقريباً بالدولار',
        point1Title: 'رسوم منخفضة', point1Desc: 'تبدأ من ٠.١٠٪ لكل طرف. بدون تكاليف مخفية.', point2Title: 'خصم الحجم', point2Desc: 'خصم يصل إلى ١٠٠٪ لمستويات VIP.', point3Title: 'سحب مجاني', point3Desc: 'سحب مجاني USDT عبر شبكة TRC-20.',
        faqTitle: 'الأسئلة الشائعة',
        faq1Q: 'ما هي رسوم الصانع والمستلم؟', faq1A: 'الصانع هو من يضع طلب في دفتر الطلبات. المستلم هو من ينفيذ طلباً موجوداً.',
        faq2Q: 'هل رسوم السحب ثابتة؟', faq2A: 'تختلف رسوم السحب حسب الشبكة. مثلاً USDT عبر TRC-20 فقط ١ USDT.',
        faq3Q: 'كيف أدفع رسوماً أقل؟', faq3A: 'بزيادة حجم تداولك الشهري، تحصل على مستوى VIP أعلى ورسوم أقل.',
        faq4Q: 'هل توجد رسوم للإيداع؟', faq4A: 'لا، الإيداع مجاني. تدفع فقط رسوم شبكة البلوكتشين.',
        faq5Q: 'هل تتغير الرسوم؟', faq5A: 'قد تتغير الرسوم حسب ظروف السوق. تحقق دائماً من أحدث الأسعار.',
      },
      footer: { copyright: '© ٢٠٢٦ صراف اكسچنج. جميع الحقوق محفوظة.', brandName: 'صراف', description: 'منصة آمنة وموثوقة لتبادل العملات الرقمية.', quickLinks: 'روابط سريعة', legal: 'قانوني', terms: 'الشروط والأحكام', privacy: 'سياسة الخصوصية', contactUs: 'تواصل معنا', contact: 'التواصل' },
    },
  },
  en: {
    translation: {
      nav: { home: 'Home', swap: 'Swap', trade: 'Trade', fees: 'Fees', mainSite: 'Sarraf.com' },
      hero: { title: 'Sarraf Exchange', subtitle: 'Secure and fast cryptocurrency trading', cta: 'Start Swapping', stats: { users: '100K+ Users', coins: '1,500+ Coins', volume: '$10B+ Volume' } },
      swap: {
        title: 'Swap Cryptocurrency', subtitle: 'No KYC, no hidden fees', youPay: 'You Pay', youReceive: 'You Receive', exchange: 'Swap', rate: 'Exchange Rate', noHiddenFees: 'No hidden fees',
        balance: 'Balance:', max: 'MAX', networkFee: 'Network Fee', estimatedTime: 'Estimated Time', timeRange: '5-30 min', included: 'Included', poweredBy: 'Powered by Godex • No KYC • 1,500+ coins',
        recentSwaps: 'Recent Swaps', table: { coin: 'Pair', pay: 'You Pay', receive: 'You Get', rate: 'Rate', status: 'Status' },
        statusCompleted: '✓ Completed', statusProcessing: '⏳ Processing',
        why: { title: 'Why Sarraf', nonCustodial: 'Non-Custodial', nonCustodialDesc: 'Your funds stay in your wallet', fast: 'Fast', fastDesc: '5-30 minutes for swaps', bestRate: 'Best Rate', bestRateDesc: 'Compare from 10+ exchanges', noKyc: 'No KYC', noKycDesc: 'No identity verification' },
        noticeTitle: 'Notice', noticeDesc: 'Sarraf only supports crypto-to-crypto swaps. For fiat exchange, use a local platform.', volume24h: '24h Volume', live: 'Live', swapsToday: '1,234 swaps today', dailyTarget: 'Daily target: $3.5M', topPairs: 'Top Pairs',
      },
      home: {
        livePrices: 'Live Prices', whyTitle: 'Why Sarraf', howItWorks: 'How It Works', startNow: 'Start Now', startNowDesc: 'No registration, no waiting. Swap crypto instantly.', startSwapping: 'Start Swapping',
        statsUsers: 'Users', statsCoins: 'Coins', statsVolume: 'Volume',
        nonCustodial: 'Non-Custodial', nonCustodialDesc: 'Your funds stay in your wallet. We never hold your crypto.', fast: 'Fast', fastDesc: 'Most swaps complete in 5-30 minutes.', noKyc: 'No KYC', noKycDesc: 'Trade without identity verification. Privacy first.',
        step1Title: 'Choose Coins', step1Desc: 'Select the crypto you want to swap from 1,500+ available coins.', step2Title: 'Enter Amount', step2Desc: 'Enter the amount you want to swap. The live rate is shown.', step3Title: 'Receive Coins', step3Desc: 'Enter your wallet address and receive your crypto in under 5 minutes.',
        marketOverview: 'Market Overview', topGainers: 'Top Gainers', topLosers: 'Top Losers', mostTraded: 'Most Traded',
        securityTitle: 'Security', sec2fa: 'Two-Factor Auth', sec2faDesc: 'Extra protection with 2FA for your account', secCold: 'Cold Storage', secColdDesc: '98% of assets stored offline in cold wallets', secInsurance: 'Insurance Fund', secInsuranceDesc: 'Asset coverage up to $100M', secAudit: 'Regular Audits', secAuditDesc: 'Monthly security reviews by independent firms',
      },
      trade: {
        search: 'Search...', favorites: 'Favorites', coin: 'Pair', price: 'Price', change: 'Change',
        h24Change: '24h Change', h24High: '24h High', h24Low: '24h Low', h24Volume: '24h Volume',
        tf1m: '1m', tf5m: '5m', tf15m: '15m', tf1h: '1h', tf4h: '4h', tf1d: '1d', tf1w: '1w',
        orderBook: 'Order Book', recentTrades: 'Recent Trades', priceUSDT: 'Price (USDT)', amount: 'Amount', total: 'Total', time: 'Time',
        buy: 'Buy', sell: 'Sell', limit: 'Limit', market: 'Market', stopLimit: 'Stop Limit', available: 'Available',
      },
      fees: {
        title: 'Fee Structure', subtitle: 'Transparent fee structure with no hidden charges',
        tradingTitle: 'Trading Fees', tradingDesc: 'Maker and taker fees based on 30-day trading volume', tier: 'Tier', monthlyVolume: '30d Volume', makerFee: 'Maker Fee', takerFee: 'Taker Fee',
        withdrawalTitle: 'Withdrawal Fees', withdrawalDesc: 'Withdrawal fees by network', coin: 'Coin', network: 'Network', fee: 'Fee', approxUsd: 'Est. USD',
        point1Title: 'Low Fees', point1Desc: 'Starting from 0.10% for both maker and taker. No hidden charges.', point2Title: 'Volume Discounts', point2Desc: 'Up to 100% maker fee discount for VIP users.', point3Title: 'Free Withdrawals', point3Desc: 'Free USDT withdrawals via TRC-20 network.',
        faqTitle: 'Frequently Asked Questions',
        faq1Q: 'What are maker and taker fees?', faq1A: 'A maker places an order on the order book. A taker executes an existing order.',
        faq2Q: 'Are withdrawal fees fixed?', faq2A: 'Withdrawal fees vary by network. For example, USDT via TRC-20 is only 1 USDT.',
        faq3Q: 'How do I pay lower fees?', faq3A: 'By increasing your 30-day trading volume, you unlock higher VIP tiers with lower fees.',
        faq4Q: 'Are there deposit fees?', faq4A: 'No, deposits are free. You only pay the blockchain network fee.',
        faq5Q: 'Do fees change?', faq5A: 'Fees may change based on market conditions. Always check the latest rates on the fees page.',
      },
      footer: { copyright: '© 2026 Sarraf Exchange. All rights reserved.', brandName: 'Sarraf', description: 'Secure and trusted platform for cryptocurrency exchange.', quickLinks: 'Quick Links', legal: 'Legal', terms: 'Terms & Conditions', privacy: 'Privacy Policy', contactUs: 'Contact Us', contact: 'Contact' },
    },
  },
  tr: {
    translation: {
      nav: { home: 'Ana Sayfa', swap: 'Takas', trade: 'İşlem', fees: 'Ücretler', mainSite: 'Sarraf.com' },
      hero: { title: 'Sarraf Borsa', subtitle: 'Güvenli ve hızlı kripto para ticareti', cta: 'Takasa Başla', stats: { users: '100K+ Kullanıcı', coins: '1,500+ Coin', volume: '$10B+ Hacim' } },
      swap: {
        title: 'Kripto Para Takası', subtitle: 'KYC yok, gizli ücret yok', youPay: 'Ödersiniz', youReceive: 'Alırsınız', exchange: 'Takas', rate: 'Kur', noHiddenFees: 'Gizli ücret yok',
        balance: 'Bakiye:', max: 'MAKS', networkFee: 'Ağ Ücreti', estimatedTime: 'Tahmini Süre', timeRange: '5-30 dk', included: 'Dahil', poweredBy: 'Godex tarafından desteklenir • KYC yok • 1.500+ coin',
        recentSwaps: 'Son Takaslar', table: { coin: 'Çift', pay: 'Ödersiniz', receive: 'Alırsınız', rate: 'Kur', status: 'Durum' },
        statusCompleted: '✓ Tamamlandı', statusProcessing: '⏳ İşleniyor',
        why: { title: 'Neden Sarraf', nonCustodial: 'Saklama Yok', nonCustodialDesc: 'Fonlarınız cüzdanınızda kalır', fast: 'Hızlı', fastDesc: 'Takaslar için 5-30 dakika', bestRate: 'En İyi Kurs', bestRateDesc: '10+ borsadan karşılaştırın', noKyc: 'KYC Yok', noKycDesc: 'Kimlik doğrulama yok' },
        noticeTitle: 'Uyarı', noticeDesc: 'Sarraf yalnızca kriptodan kriptoya takasları destekler. Fiat para birimi için yerel bir platform kullanın.', volume24h: '24s Hacim', live: 'Canlı', swapsToday: 'Bugün 1.234 takas', dailyTarget: 'Günlük hedef: $3.5M', topPairs: 'En İyi Çiftler',
      },
      home: {
        livePrices: 'Canlı Fiyatlar', whyTitle: 'Neden Sarraf', howItWorks: 'Nasıl Çalışır', startNow: 'Hemen Başla', startNowDesc: 'Kayıt yok, bekleme yok. Anında kripto takas edin.', startSwapping: 'Takasa Başla',
        statsUsers: 'Kullanıcılar', statsCoins: 'Coinler', statsVolume: 'Hacim',
        nonCustodial: 'Saklama Yok', nonCustodialDesc: 'Fonlarınız cüzdanınızda kalır. Kriptolarınızı asla tutmayız.', fast: 'Hızlı', fastDesc: 'Çoğu takas 5-30 dakikada tamamlanır.', noKyc: 'KYC Yok', noKycDesc: 'Kimlik doğrulaması olmadan ticaret yapın. Gizlilik öncelikli.',
        step1Title: 'Coin Seçin', step1Desc: '1.500+ mevcut coinden takas etmek istediğiniz kriptoyu seçin.', step2Title: 'Miktar Girin', step2Desc: 'Takas etmek istediğiniz miktarı girin. Canlı kur gösterilir.', step3Title: 'Coinlerinizi Alın', step3Desc: 'Cüzdan adresinizi girin ve 5 dakikadan kısa sürede coinlerinizi alın.',
        marketOverview: 'Piyasa Özeti', topGainers: 'En Çok Yükselenler', topLosers: 'En Çok Düşenler', mostTraded: 'En Çok İşlem Görenler',
        securityTitle: 'Güvenlik', sec2fa: 'İki Faktörlü Doğrulama', sec2faDesc: 'Hesabınız için 2FA ile ek koruma', secCold: 'Soğuk Depolama', secColdDesc: '%98 varlık çevrimdışı soğuk cüzdanlarda', secInsurance: 'Sigorta Fonu', secInsuranceDesc: '$100M\'a kadar varlık sigortası', secAudit: 'Düzenli Denetimler', secAuditDesc: 'Bağımsız firmalar tarafından aylık güvenlik incelemeleri',
      },
      trade: {
        search: 'Ara...', favorites: 'Favoriler', coin: 'Çift', price: 'Fiyat', change: 'Değişim',
        h24Change: '24s Değişim', h24High: '24s Yüksek', h24Low: '24s Düşük', h24Volume: '24s Hacim',
        tf1m: '1d', tf5m: '5d', tf15m: '15d', tf1h: '1s', tf4h: '4s', tf1d: '1g', tf1w: '1h',
        orderBook: 'Emir Defteri', recentTrades: 'Son İşlemler', priceUSDT: 'Fiyat (USDT)', amount: 'Miktar', total: 'Toplam', time: 'Zaman',
        buy: 'Al', sell: 'Sat', limit: 'Limit', market: 'Piyasa', stopLimit: 'Durdurma Limiti', available: 'Mevcut',
      },
      fees: {
        title: 'Ücret Yapısı', subtitle: 'Gizli ücret olmayan şeffaf ücret yapısı',
        tradingTitle: 'İşlem Ücretleri', tradingDesc: '30 günlük işlem hacmine göre yapıcı ve alıcı ücretleri', tier: 'Seviye', monthlyVolume: '30g Hacim', makerFee: 'Yapıcı Ücreti', takerFee: 'Alıcı Ücreti',
        withdrawalTitle: 'Çekim Ücretleri', withdrawalDesc: 'Ağa göre çekim ücretleri', coin: 'Coin', network: 'Ağ', fee: 'Ücret', approxUsd: 'Tahmini USD',
        point1Title: 'Düşük Ücretler', point1Desc: '0.10\'dan başlayan oranlar. Gizli ücret yok.', point2Title: 'Hacim İndirimleri', point2Desc: 'VIP kullanıcılar için %100\'e varan indirim.', point3Title: 'Ücretsiz Çekim', point3Desc: 'TRC-20 üzerinden ücretsiz USDT çekimi.',
        faqTitle: 'Sıkça Sorulan Sorular',
        faq1Q: 'Yapıcı ve alıcı ücreti nedir?', faq1A: 'Yapıcı emir defterine emir koyar. Alıcı mevcut emri gerçekleştirir.',
        faq2Q: 'Çekim ücretleri sabit mi?', faq2A: 'Çekim ücretleri ağa göre değişir. Örneğin USDT TRC-20 ile sadece 1 USDT.',
        faq3Q: 'Daha düşük ücret nasıl öderim?', faq3A: '30 günlük işlem hacminizi artırarak daha yüksek VIP seviyelerine ulaşabilirsiniz.',
        faq4Q: 'Yatırım ücreti var mı?', faq4A: 'Hayır, yatırımlar ücretsizdir. Sadece blockchain ağ ücreti ödersiniz.',
        faq5Q: 'Ücretler değişir mi?', faq5A: 'Ücretler piyasa koşullarına göre değişebilir. Her zaman güncel oranları kontrol edin.',
      },
      footer: { copyright: '© 2026 Sarraf Borsa. Tüm hakları saklıdır.', brandName: 'Sarraf', description: 'Kripto para borsası için güvenilir platform.', quickLinks: 'Hızlı Bağlantılar', legal: 'Yasal', terms: 'Şartlar & Koşullar', privacy: 'Gizlilik Politikası', contactUs: 'Bize Ulaşın', contact: 'İletişim' },
    },
  },
  ru: {
    translation: {
      nav: { home: 'Главная', swap: 'Обмен', trade: 'Трейдинг', fees: 'Комиссии', mainSite: 'Sarraf.com' },
      hero: { title: 'Sarraf Биржа', subtitle: 'Безопасная и быстрая торговля криптовалютой', cta: 'Начать обмен', stats: { users: '100K+ Пользователей', coins: '1,500+ Монет', volume: '$10B+ Объём' } },
      swap: {
        title: 'Обмен криптовалюты', subtitle: 'Без KYC, без скрытых комиссий', youPay: 'Вы платите', youReceive: 'Вы получаете', exchange: 'Обмен', rate: 'Курс', noHiddenFees: 'Без скрытых комиссий',
        balance: 'Баланс:', max: 'МАКС', networkFee: 'Комиссия сети', estimatedTime: 'Примерное время', timeRange: '5-30 мин', included: 'Включена', poweredBy: 'На базе Godex • Без KYC • 1,500+ монет',
        recentSwaps: 'Последние обмены', table: { coin: 'Пара', pay: 'Платите', receive: 'Получаете', rate: 'Курс', status: 'Статус' },
        statusCompleted: '✓ Завершено', statusProcessing: '⏳ В обработке',
        why: { title: 'Почему Sarraf', nonCustodial: 'Без хранения', nonCustodialDesc: 'Ваши средства остаются в вашем кошельке', fast: 'Быстро', fastDesc: '5-30 минут на обмен', bestRate: 'Лучший курс', bestRateDesc: 'Сравнение с 10+ биржами', noKyc: 'Без KYC', noKycDesc: 'Без верификации личности' },
        noticeTitle: 'Уведомление', noticeDesc: 'Sarraf поддерживает только обмен криптовалюты на криптовалюту. Для обмена фиатных валют используйте местную платформу.', volume24h: 'Объём 24ч', live: 'Онлайн', swapsToday: '1,234 обмена сегодня', dailyTarget: 'Дневная цель: $3.5M', topPairs: 'Топ пары',
      },
      home: {
        livePrices: 'Текущие цены', whyTitle: 'Почему Sarraf', howItWorks: 'Как это работает', startNow: 'Начать сейчас', startNowDesc: 'Без регистрации, без ожидания. Мгновенный обмен криптовалюты.', startSwapping: 'Начать обмен',
        statsUsers: 'Пользователи', statsCoins: 'Монеты', statsVolume: 'Объём',
        nonCustodial: 'Без хранения', nonCustodialDesc: 'Ваши средства остаются в вашем кошельке. Мы никогда не храним ваши криптовалюты.', fast: 'Быстро', fastDesc: 'Большинство обменов завершаются за 5-30 минут.', noKyc: 'Без KYC', noKycDesc: 'Торгуйте без верификации личности. Конфиденциальность прежде всего.',
        step1Title: 'Выберите монеты', step1Desc: 'Выберите криптовалюту для обмена из 1,500+ доступных монет.', step2Title: 'Введите сумму', step2Desc: 'Введите сумму для обмена. Показывается текущий курс.', step3Title: 'Получите монеты', step3Desc: 'Введите адрес кошелька и получите криптовалюту менее чем за 5 минут.',
        marketOverview: 'Обзор рынка', topGainers: 'Топ растущих', topLosers: 'Топ падающих', mostTraded: 'Самые торгуемые',
        securityTitle: 'Безопасность', sec2fa: 'Двухфакторная аутентификация', sec2faDesc: 'Дополнительная защита с 2FA для вашего аккаунта', secCold: 'Холодное хранение', secColdDesc: '98% активов хранятся в холодных кошельках', secInsurance: 'Страховой фонд', secInsuranceDesc: 'Страхование активов до $100M', secAudit: 'Регулярные аудиты', secAuditDesc: 'Ежемесячные проверки безопасности независимыми компаниями',
      },
      trade: {
        search: 'Поиск...', favorites: 'Избранное', coin: 'Пара', price: 'Цена', change: 'Изменение',
        h24Change: '24ч изменение', h24High: '24ч максимум', h24Low: '24ч минимум', h24Volume: '24ч объём',
        tf1m: '1м', tf5m: '5м', tf15m: '15м', tf1h: '1ч', tf4h: '4ч', tf1d: '1д', tf1w: '1н',
        orderBook: 'Стакан', recentTrades: 'Последние сделки', priceUSDT: 'Цена (USDT)', amount: 'Количество', total: 'Сумма', time: 'Время',
        buy: 'Купить', sell: 'Продать', limit: 'Лимит', market: 'Рынок', stopLimit: 'Стоп-лимит', available: 'Доступно',
      },
      fees: {
        title: 'Структура комиссий', subtitle: 'Прозрачная структура комиссий без скрытых платежей',
        tradingTitle: 'Торговые комиссии', tradingDesc: 'Комиссии мейкера и тейкера на основе объёма за 30 дней', tier: 'Уровень', monthlyVolume: '30д объём', makerFee: 'Мейкер', takerFee: 'Тейкер',
        withdrawalTitle: 'Комиссии на вывод', withdrawalDesc: 'Комиссии на вывод по сетям', coin: 'Монета', network: 'Сеть', fee: 'Комиссия', approxUsd: 'Примерно USD',
        point1Title: 'Низкие комиссии', point1Desc: 'От 0.10% для мейкера и тейкера. Без скрытых платежей.', point2Title: 'Скидки за объём', point2Desc: 'До 100% скидки для VIP-пользователей.', point3Title: 'Бесплатный вывод', point3Desc: 'Бесплатный вывод USDT через TRC-20.',
        faqTitle: 'Часто задаваемые вопросы',
        faq1Q: 'Что такое комиссии мейкера и тейкера?', faq1A: 'Мейкер выставляет ордер в стакан. Тейкер исполняет существующий ордер.',
        faq2Q: 'Фиксированы ли комиссии на вывод?', faq2A: 'Комиссии на вывод зависят от сети. Например, USDT через TRC-20 — всего 1 USDT.',
        faq3Q: 'Как платить меньше?', faq3A: 'Увеличив объём торгов за 30 дней, вы получаете более высокий уровень VIP с меньшими комиссиями.',
        faq4Q: 'Есть ли комиссии за пополнение?', faq4A: 'Нет, пополнение бесплатно. Вы платите только комиссию сети блокчейна.',
        faq5Q: 'Изменяются ли комиссии?', faq5A: 'Комиссии могут изменяться в зависимости от рыночных условий. Всегда проверяйте актуальные ставки.',
      },
      footer: { copyright: '© 2026 Sarraf Биржа. Все права защищены.', brandName: 'Sarraf', description: 'Безопасная платформа для обмена криптовалюты.', quickLinks: 'Быстрые ссылки', legal: 'Юридическая', terms: 'Условия', privacy: 'Конфиденциальность', contactUs: 'Связаться с нами', contact: 'Контакты' },
    },
  },
  fr: {
    translation: {
      nav: { home: 'Accueil', swap: 'Échange', trade: 'Trading', fees: 'Frais', mainSite: 'Sarraf.com' },
      hero: { title: 'Sarraf Exchange', subtitle: 'Trading de cryptomonnaie sécurisé et rapide', cta: 'Commencer', stats: { users: '100K+ Utilisateurs', coins: '1,500+ Coins', volume: '$10B+ Volume' } },
      swap: {
        title: 'Échanger des cryptomonnaies', subtitle: 'Pas de KYC, pas de frais cachés', youPay: 'Vous payez', youReceive: 'Vous recevez', exchange: 'Échanger', rate: 'Taux', noHiddenFees: 'Pas de frais cachés',
        balance: 'Solde:', max: 'MAX', networkFee: 'Frais réseau', estimatedTime: 'Temps estimé', timeRange: '5-30 min', included: 'Inclus', poweredBy: 'Propulsé par Godex • Pas de KYC • 1 500+ coins',
        recentSwaps: 'Échanges récents', table: { coin: 'Paire', pay: 'Vous payez', receive: 'Vous recevez', rate: 'Taux', status: 'Statut' },
        statusCompleted: '✓ Terminé', statusProcessing: '⏳ En cours',
        why: { title: 'Pourquoi Sarraf', nonCustodial: 'Non-Custodial', nonCustodialDesc: 'Vos fonds restent dans votre portefeuille', fast: 'Rapide', fastDesc: '5-30 minutes pour les échanges', bestRate: 'Meilleur taux', bestRateDesc: 'Comparez depuis 10+ exchanges', noKyc: 'Pas de KYC', noKycDesc: 'Pas de vérification d\'identité' },
        noticeTitle: 'Avis', noticeDesc: 'Sarraf ne prend en charge que les échanges crypto-vers-crypto. Pour les devises fiduciaires, utilisez une plateforme locale.', volume24h: 'Volume 24h', live: 'En direct', swapsToday: '1 234 échanges aujourd\'hui', dailyTarget: 'Objectif quotidien: $3.5M', topPairs: 'Paires principales',
      },
      home: {
        livePrices: 'Prix en direct', whyTitle: 'Pourquoi Sarraf', howItWorks: 'Comment ça marche', startNow: 'Commencer maintenant', startNowDesc: 'Pas d\'inscription, pas d\'attente. Échangez instantanément.', startSwapping: 'Commencer l\'échange',
        statsUsers: 'Utilisateurs', statsCoins: 'Coins', statsVolume: 'Volume',
        nonCustodial: 'Non-Custodial', nonCustodialDesc: 'Vos fonds restent dans votre portefeuille. Nous ne détenons jamais vos cryptos.', fast: 'Rapide', fastDesc: 'La plupart des échanges sont terminés en 5-30 minutes.', noKyc: 'Pas de KYC', noKycDesc: 'Négociez sans vérification d\'identité. La confidentialité d\'abord.',
        step1Title: 'Choisissez les coins', step1Desc: 'Sélectionnez la crypto à échanger parmi 1 500+ coins disponibles.', step2Title: 'Entrez le montant', step2Desc: 'Entrez le montant à échanger. Le taux en direct est affiché.', step3Title: 'Recevez les coins', step3Desc: 'Entrez l\'adresse de votre portefeuille et recevez vos cryptos en moins de 5 minutes.',
        marketOverview: 'Aperçu du marché', topGainers: 'Meilleures hausses', topLosers: 'Meilleures baisses', mostTraded: 'Plus échangés',
        securityTitle: 'Sécurité', sec2fa: 'Authentification à deux facteurs', sec2faDesc: 'Protection supplémentaire avec 2FA pour votre compte', secCold: 'Stockage à froid', secColdDesc: '98% des actifs stockés hors ligne', secInsurance: 'Fonds d\'assurance', secInsuranceDesc: 'Couverture des actifs jusqu\'à $100M', secAudit: 'Audits réguliers', secAuditDesc: 'Revues mensuelles de sécurité par des entreprises indépendantes',
      },
      trade: {
        search: 'Rechercher...', favorites: 'Favoris', coin: 'Paire', price: 'Prix', change: 'Variation',
        h24Change: 'Var. 24h', h24High: 'Haut 24h', h24Low: 'Bas 24h', h24Volume: 'Volume 24h',
        tf1m: '1m', tf5m: '5m', tf15m: '15m', tf1h: '1h', tf4h: '4h', tf1d: '1j', tf1w: '1s',
        orderBook: 'Carnet d\'ordres', recentTrades: 'Dernières transactions', priceUSDT: 'Prix (USDT)', amount: 'Montant', total: 'Total', time: 'Heure',
        buy: 'Acheter', sell: 'Vendre', limit: 'Limite', market: 'Marché', stopLimit: 'Stop-Limite', available: 'Disponible',
      },
      fees: {
        title: 'Structure des frais', subtitle: 'Structure de frais transparente sans frais cachés',
        tradingTitle: 'Frais de trading', tradingDesc: 'Frais maker et taker basés sur le volume de 30 jours', tier: 'Niveau', monthlyVolume: 'Volume 30j', makerFee: 'Frais Maker', takerFee: 'Frais Taker',
        withdrawalTitle: 'Frais de retrait', withdrawalDesc: 'Frais de retrait par réseau', coin: 'Coin', network: 'Réseau', fee: 'Frais', approxUsd: 'Est. USD',
        point1Title: 'Frais bas', point1Desc: 'À partir de 0.10% pour maker et taker. Sans frais cachés.', point2Title: 'Réductions volume', point2Desc: 'Jusqu\'à 100% de réduction pour les VIP.', point3Title: 'Retraits gratuits', point3Desc: 'Retraits USDT gratuits via TRC-20.',
        faqTitle: 'Questions fréquentes',
        faq1Q: 'Que sont les frais maker et taker?', faq1A: 'Un maker place un ordre dans le carnet. Un taker exécute un ordre existant.',
        faq2Q: 'Les frais de retrait sont-ils fixes?', faq2A: 'Les frais varient selon le réseau. Par exemple, USDT via TRC-20 coûte seulement 1 USDT.',
        faq3Q: 'Comment payer moins?', faq3A: 'En augmentant votre volume de 30 jours, vous débloquez des niveaux VIP avec des frais réduits.',
        faq4Q: 'Y a-t-il des frais de dépôt?', faq4A: 'Non, les dépôts sont gratuits. Vous ne payez que les frais réseau blockchain.',
        faq5Q: 'Les frais changent-ils?', faq5A: 'Les frais peuvent changer selon les conditions du marché. Vérifiez toujours les derniers taux.',
      },
      footer: { copyright: '© 2026 Sarraf Exchange. Tous droits réservés.', brandName: 'Sarraf', description: 'Plateforme sécurisée et fiable pour l\'échange de cryptomonnaies.', quickLinks: 'Liens rapides', legal: 'Juridique', terms: 'Conditions', privacy: 'Politique de confidentialité', contactUs: 'Nous contacter', contact: 'Contact' },
    },
  },
  de: {
    translation: {
      nav: { home: 'Startseite', swap: 'Tausch', trade: 'Handel', fees: 'Gebühren', mainSite: 'Sarraf.com' },
      hero: { title: 'Sarraf Börse', subtitle: 'Sicherer und schneller Kryptohandel', cta: 'Jetzt tauschen', stats: { users: '100K+ Nutzer', coins: '1,500+ Coins', volume: '$10B+ Volumen' } },
      swap: {
        title: 'Kryptowährung tauschen', subtitle: 'Kein KYC, keine versteckten Gebühren', youPay: 'Sie zahlen', youReceive: 'Sie erhalten', exchange: 'Tauschen', rate: 'Wechselkurs', noHiddenFees: 'Keine versteckten Gebühren',
        balance: 'Guthaben:', max: 'MAX', networkFee: 'Netzwerkgebühr', estimatedTime: 'Geschätzte Zeit', timeRange: '5-30 Min', included: 'Enthalten', poweredBy: 'Unterstützt von Godex • Kein KYC • 1.500+ Coins',
        recentSwaps: 'Letzte Tausche', table: { coin: 'Paar', pay: 'Sie zahlen', receive: 'Sie erhalten', rate: 'Kurs', status: 'Status' },
        statusCompleted: '✓ Abgeschlossen', statusProcessing: '⏳ Verarbeitung',
        why: { title: 'Warum Sarraf', nonCustodial: 'Non-Custodial', nonCustodialDesc: 'Ihre Gelder bleiben in Ihrer Wallet', fast: 'Schnell', fastDesc: '5-30 Minuten für Tausche', bestRate: 'Bester Kurs', bestRateDesc: 'Vergleichen Sie mit 10+ Börsen', noKyc: 'Kein KYC', noKycDesc: 'Keine Identitätsprüfung' },
        noticeTitle: 'Hinweis', noticeDesc: 'Sarraf unterstützt nur Krypto-zu-Krypto-Tausch. Für Fiat-Währungen verwenden Sie eine lokale Plattform.', volume24h: '24h Volumen', live: 'Live', swapsToday: '1.234 Tausche heute', dailyTarget: 'Tagesziel: $3.5M', topPairs: 'Top-Paare',
      },
      home: {
        livePrices: 'Live-Preise', whyTitle: 'Warum Sarraf', howItWorks: 'So funktioniert es', startNow: 'Jetzt starten', startNowDesc: 'Keine Anmeldung, kein Warten. Sofort tauschen.', startSwapping: 'Tausch starten',
        statsUsers: 'Nutzer', statsCoins: 'Coins', statsVolume: 'Volumen',
        nonCustodial: 'Non-Custodial', nonCustodialDesc: 'Ihre Gelder bleiben in Ihrer Wallet. Wir halten Ihre Krypto niemals.', fast: 'Schnell', fastDesc: 'Die meisten Tausche sind in 5-30 Minuten abgeschlossen.', noKyc: 'Kein KYC', noKycDesc: 'Handeln Sie ohne Identitätsprüfung. Privatsphäre zuerst.',
        step1Title: 'Coins wählen', step1Desc: 'Wählen Sie die Kryptowährung zum Tauschen aus 1.500+ verfügbaren Coins.', step2Title: 'Betrag eingeben', step2Desc: 'Geben Sie den Tauschbetrag ein. Der Live-Kurs wird angezeigt.', step3Title: 'Coins erhalten', step3Desc: 'Geben Sie Ihre Wallet-Adresse ein und erhalten Sie Ihre Krypto in unter 5 Minuten.',
        marketOverview: 'Marktübersicht', topGainers: 'Top-Gewinner', topLosers: 'Top-Verlierer', mostTraded: 'Meistgehandelt',
        securityTitle: 'Sicherheit', sec2fa: 'Zwei-Faktor-Authentifizierung', sec2faDesc: 'Zusätzlicher Schutz mit 2FA für Ihr Konto', secCold: 'Kaltenspeicherung', secColdDesc: '98% der Vermögenswerte offline', secInsurance: 'Versicherungsfonds', secInsuranceDesc: 'Vermögensschutz bis zu $100M', secAudit: 'Regelmäßige Audits', secAuditDesc: 'Monatliche Sicherheitsüberprüfungen durch unabhängige Firmen',
      },
      trade: {
        search: 'Suchen...', favorites: 'Favoriten', coin: 'Paar', price: 'Preis', change: 'Änderung',
        h24Change: '24h Änderung', h24High: '24h Hoch', h24Low: '24h Tief', h24Volume: '24h Volumen',
        tf1m: '1m', tf5m: '5m', tf15m: '15m', tf1h: '1h', tf4h: '4h', tf1d: '1T', tf1w: '1W',
        orderBook: 'Orderbuch', recentTrades: 'Letzte Trades', priceUSDT: 'Preis (USDT)', amount: 'Menge', total: 'Gesamt', time: 'Zeit',
        buy: 'Kaufen', sell: 'Verkaufen', limit: 'Limit', market: 'Markt', stopLimit: 'Stop-Limit', available: 'Verfügbar',
      },
      fees: {
        title: 'Gebührenstruktur', subtitle: 'Transparente Gebührenstruktur ohne versteckte Kosten',
        tradingTitle: 'Handelsgebühren', tradingDesc: 'Maker- und Taker-Gebühren basierend auf 30-Tage-Volumen', tier: 'Stufe', monthlyVolume: '30T Volumen', makerFee: 'Maker-Gebühr', takerFee: 'Taker-Gebühr',
        withdrawalTitle: 'Auszahlungsgebühren', withdrawalDesc: 'Auszahlungsgebühren nach Netzwerk', coin: 'Coin', network: 'Netzwerk', fee: 'Gebühr', approxUsd: 'Ca. USD',
        point1Title: 'Niedrige Gebühren', point1Desc: 'Ab 0.10% für Maker und Taker. Keine versteckten Kosten.', point2Title: 'Volumenrabatte', point2Desc: 'Bis zu 100% Rabatt für VIP-Nutzer.', point3Title: 'Kostenlose Auszahlungen', point3Desc: 'Kostenlose USDT-Auszahlungen über TRC-20.',
        faqTitle: 'Häufig gestellte Fragen',
        faq1Q: 'Was sind Maker- und Taker-Gebühren?', faq1A: 'Ein Maker platziert eine Order im Orderbuch. Ein Taker führt eine bestehende Order aus.',
        faq2Q: 'Sind Auszahlungsgebühren fest?', faq2A: 'Auszahlungsgebühren variieren je nach Netzwerk. USDT über TRC-20 kostet nur 1 USDT.',
        faq3Q: 'Wie zahle ich weniger?', faq3A: 'Durch Erhöhung Ihres 30-Tage-Volumens erhalten Sie höhere VIP-Stufen mit niedrigeren Gebühren.',
        faq4Q: 'Gibt es Einzahlungsgebühren?', faq4A: 'Nein, Einzahlungen sind kostenlos. Sie zahlen nur die Blockchain-Netzwerkgebühr.',
        faq5Q: 'Ändern sich die Gebühren?', faq5A: 'Gebühren können je nach Marktbedingungen variieren. Prüfen Sie immer die aktuellen Sätze.',
      },
      footer: { copyright: '© 2026 Sarraf Börse. Alle Rechte vorbehalten.', brandName: 'Sarraf', description: 'Sichere und vertrauenswürdige Plattform für Kryptohandel.', quickLinks: 'Schnelllinks', legal: 'Rechtliches', terms: 'AGB', privacy: 'Datenschutz', contactUs: 'Kontakt', contact: 'Kontakt' },
    },
  },
  es: {
    translation: {
      nav: { home: 'Inicio', swap: 'Intercambio', trade: 'Trading', fees: 'Comisiones', mainSite: 'Sarraf.com' },
      hero: { title: 'Sarraf Exchange', subtitle: 'Trading de criptomonedas seguro y rápido', cta: 'Empezar', stats: { users: '100K+ Usuarios', coins: '1,500+ Coins', volume: '$10B+ Volumen' } },
      swap: {
        title: 'Intercambiar criptomonedas', subtitle: 'Sin KYC, sin comisiones ocultas', youPay: 'Pagas', youReceive: 'Recibes', exchange: 'Intercambiar', rate: 'Tipo de cambio', noHiddenFees: 'Sin comisiones ocultas',
        balance: 'Saldo:', max: 'MÁX', networkFee: 'Comisión de red', estimatedTime: 'Tiempo estimado', timeRange: '5-30 min', included: 'Incluido', poweredBy: 'Impulsado por Godex • Sin KYC • 1,500+ coins',
        recentSwaps: 'Intercambios recientes', table: { coin: 'Par', pay: 'Pagas', receive: 'Recibes', rate: 'Tipo', status: 'Estado' },
        statusCompleted: '✓ Completado', statusProcessing: '⏳ Procesando',
        why: { title: 'Por qué Sarraf', nonCustodial: 'Sin custodia', nonCustodialDesc: 'Tus fondos permanecen en tu billetera', fast: 'Rápido', fastDesc: '5-30 minutos para intercambios', bestRate: 'Mejor tipo', bestRateDesc: 'Compara desde 10+ exchanges', noKyc: 'Sin KYC', noKycDesc: 'Sin verificación de identidad' },
        noticeTitle: 'Aviso', noticeDesc: 'Sarraf solo soporta intercambios de cripto a cripto. Para moneda fiat, usa una plataforma local.', volume24h: 'Volumen 24h', live: 'En vivo', swapsToday: '1,234 intercambios hoy', dailyTarget: 'Objetivo diario: $3.5M', topPairs: 'Principales pares',
      },
      home: {
        livePrices: 'Precios en vivo', whyTitle: 'Por qué Sarraf', howItWorks: 'Cómo funciona', startNow: 'Empieza ahora', startNowDesc: 'Sin registro, sin espera. Intercambia cripto al instante.', startSwapping: 'Empezar intercambio',
        statsUsers: 'Usuarios', statsCoins: 'Coins', statsVolume: 'Volumen',
        nonCustodial: 'Sin custodia', nonCustodialDesc: 'Tus fondos permanecen en tu billetera. Nunca guardamos tu cripto.', fast: 'Rápido', fastDesc: 'La mayoría de intercambios se completan en 5-30 minutos.', noKyc: 'Sin KYC', noKycDesc: 'Opera sin verificación de identidad. Privacidad primero.',
        step1Title: 'Elige coins', step1Desc: 'Selecciona la cripto a intercambiar de 1,500+ coins disponibles.', step2Title: 'Ingresa el monto', step2Desc: 'Ingresa el monto a intercambiar. Se muestra el tipo de cambio en vivo.', step3Title: 'Recibe coins', step3Desc: 'Ingresa la dirección de tu billetera y recibe tu cripto en menos de 5 minutos.',
        marketOverview: 'Resumen del mercado', topGainers: 'Mejores subidas', topLosers: 'Mejores bajadas', mostTraded: 'Más operados',
        securityTitle: 'Seguridad', sec2fa: 'Autenticación de dos factores', sec2faDesc: 'Protección adicional con 2FA para tu cuenta', secCold: 'Almacenamiento frío', secColdDesc: '98% de activos almacenados fuera de línea', secInsurance: 'Fondo de seguros', secInsuranceDesc: 'Cobertura de activos hasta $100M', secAudit: 'Auditorías regulares', secAuditDesc: 'Revisiones mensuales de seguridad por empresas independientes',
      },
      trade: {
        search: 'Buscar...', favorites: 'Favoritos', coin: 'Par', price: 'Precio', change: 'Cambio',
        h24Change: 'Cambio 24h', h24High: 'Máx 24h', h24Low: 'Mín 24h', h24Volume: 'Volumen 24h',
        tf1m: '1m', tf5m: '5m', tf15m: '15m', tf1h: '1h', tf4h: '4h', tf1d: '1d', tf1w: '1s',
        orderBook: 'Libro de órdenes', recentTrades: 'Últimas operaciones', priceUSDT: 'Precio (USDT)', amount: 'Cantidad', total: 'Total', time: 'Hora',
        buy: 'Comprar', sell: 'Vender', limit: 'Límite', market: 'Mercado', stopLimit: 'Stop-Límite', available: 'Disponible',
      },
      fees: {
        title: 'Estructura de comisiones', subtitle: 'Estructura de comisiones transparente sin cargos ocultos',
        tradingTitle: 'Comisiones de trading', tradingDesc: 'Comisiones maker y taker basadas en volumen de 30 días', tier: 'Nivel', monthlyVolume: 'Volumen 30d', makerFee: 'Comisión Maker', takerFee: 'Comisión Taker',
        withdrawalTitle: 'Comisiones de retiro', withdrawalDesc: 'Comisiones de retiro por red', coin: 'Coin', network: 'Red', fee: 'Comisión', approxUsd: 'Est. USD',
        point1Title: 'Comisiones bajas', point1Desc: 'Desde 0.10% para maker y taker. Sin cargos ocultos.', point2Title: 'Descuentos por volumen', point2Desc: 'Hasta 100% de descuento para usuarios VIP.', point3Title: 'Retiros gratuitos', point3Desc: 'Retiros USDT gratuitos vía TRC-20.',
        faqTitle: 'Preguntas frecuentes',
        faq1Q: '¿Qué son las comisiones maker y taker?', faq1A: 'Un maker coloca una orden en el libro. Un taker ejecuta una orden existente.',
        faq2Q: '¿Las comisiones de retiro son fijas?', faq2A: 'Las comisiones varían por red. USDT vía TRC-20 cuesta solo 1 USDT.',
        faq3Q: '¿Cómo pago menos?', faq3A: 'Aumentando tu volumen de 30 días, desbloqueas niveles VIP con menores comisiones.',
        faq4Q: '¿Hay comisiones de depósito?', faq4A: 'No, los depósitos son gratuitos. Solo pagas la comisión de la red blockchain.',
        faq5Q: '¿Las comisiones cambian?', faq5A: 'Las comisiones pueden cambiar según las condiciones del mercado. Siempre verifica las tarifas más recientes.',
      },
      footer: { copyright: '© 2026 Sarraf Exchange. Todos los derechos reservados.', brandName: 'Sarraf', description: 'Plataforma segura y confiable para intercambio de criptomonedas.', quickLinks: 'Enlaces rápidos', legal: 'Legal', terms: 'Términos', privacy: 'Privacidad', contactUs: 'Contáctanos', contact: 'Contacto' },
    },
  },
  zh: {
    translation: {
      nav: { home: '首页', swap: '兑换', trade: '交易', fees: '手续费', mainSite: 'Sarraf.com' },
      hero: { title: 'Sarraf 交易所', subtitle: '安全快速的加密货币交易', cta: '开始兑换', stats: { users: '100K+ 用户', coins: '1,500+ 币种', volume: '$10B+ 交易量' } },
      swap: {
        title: '加密货币兑换', subtitle: '无需KYC，无隐藏费用', youPay: '支付', youReceive: '收到', exchange: '兑换', rate: '汇率', noHiddenFees: '无隐藏费用',
        balance: '余额:', max: '最大', networkFee: '网络费用', estimatedTime: '预计时间', timeRange: '5-30 分钟', included: '已包含', poweredBy: '由 Godex 提供支持 • 无需 KYC • 1,500+ 币种',
        recentSwaps: '最近兑换', table: { coin: '交易对', pay: '支付', receive: '收到', rate: '汇率', status: '状态' },
        statusCompleted: '✓ 已完成', statusProcessing: '⏳ 处理中',
        why: { title: '为什么选择 Sarraf', nonCustodial: '非托管', nonCustodialDesc: '您的资金留在您的钱包中', fast: '快速', fastDesc: '兑换仅需 5-30 分钟', bestRate: '最佳汇率', bestRateDesc: '比较 10+ 交易所', noKyc: '无需KYC', noKycDesc: '无需身份验证' },
        noticeTitle: '提示', noticeDesc: 'Sarraf 仅支持加密货币之间的兑换。法币兑换请使用本地平台。', volume24h: '24小时交易量', live: '实时', swapsToday: '今日 1,234 次兑换', dailyTarget: '每日目标: $3.5M', topPairs: '热门交易对',
      },
      home: {
        livePrices: '实时价格', whyTitle: '为什么选择 Sarraf', howItWorks: '如何使用', startNow: '立即开始', startNowDesc: '无需注册，无需等待。即时兑换加密货币。', startSwapping: '开始兑换',
        statsUsers: '用户', statsCoins: '币种', statsVolume: '交易量',
        nonCustodial: '非托管', nonCustodialDesc: '您的资金留在您的钱包中。我们永不保管您的加密货币。', fast: '快速', fastDesc: '大多数兑换在 5-30 分钟内完成。', noKyc: '无需KYC', noKycDesc: '无需身份验证即可交易。隐私优先。',
        step1Title: '选择币种', step1Desc: '从 1,500+ 种可用币种中选择要兑换的加密货币。', step2Title: '输入金额', step2Desc: '输入要兑换的金额。显示实时汇率。', step3Title: '收到币种', step3Desc: '输入钱包地址，5 分钟内收到您的加密货币。',
        marketOverview: '市场概览', topGainers: '涨幅榜', topLosers: '跌幅榜', mostTraded: '交易量排行',
        securityTitle: '安全保障', sec2fa: '双重身份验证', sec2faDesc: '2FA 为您的账户提供额外保护', secCold: '冷存储', secColdDesc: '98% 资产存储在离线冷钱包中', secInsurance: '保险基金', secInsuranceDesc: '资产保障高达 $100M', secAudit: '定期审计', secAuditDesc: '由独立公司进行月度安全审查',
      },
      trade: {
        search: '搜索...', favorites: '收藏', coin: '交易对', price: '价格', change: '涨跌',
        h24Change: '24h 涨跌', h24High: '24h 最高', h24Low: '24h 最低', h24Volume: '24h 交易量',
        tf1m: '1分', tf5m: '5分', tf15m: '15分', tf1h: '1时', tf4h: '4时', tf1d: '1天', tf1w: '1周',
        orderBook: '订单簿', recentTrades: '最新交易', priceUSDT: '价格 (USDT)', amount: '数量', total: '总计', time: '时间',
        buy: '买入', sell: '卖出', limit: '限价', market: '市价', stopLimit: '止损限价', available: '可用',
      },
      fees: {
        title: '手续费结构', subtitle: '透明的手续费结构，无隐藏费用',
        tradingTitle: '交易手续费', tradingDesc: '基于 30 天交易量的挂单和吃单手续费', tier: '等级', monthlyVolume: '30天交易量', makerFee: '挂单费率', takerFee: '吃单费率',
        withdrawalTitle: '提现手续费', withdrawalDesc: '按网络收取的提现手续费', coin: '币种', network: '网络', fee: '手续费', approxUsd: '约 USD',
        point1Title: '低手续费', point1Desc: '从 0.10% 起，无隐藏费用。', point2Title: '交易量折扣', point2Desc: 'VIP 用户最高 100% 挂单费折扣。', point3Title: '免费提现', point3Desc: 'TRC-20 网络 USDT 免费提现。',
        faqTitle: '常见问题',
        faq1Q: '什么是挂单和吃单手续费？', faq1A: '挂单者在订单簿上挂单，吃单者执行已有订单。',
        faq2Q: '提现手续费是固定的吗？', faq2A: '提现手续费因网络而异。例如 USDT 通过 TRC-20 仅需 1 USDT。',
        faq3Q: '如何支付更低的手续费？', faq3A: '增加 30 天交易量可解锁更高等级的 VIP，享受更低手续费。',
        faq4Q: '充值有手续费吗？', faq4A: '没有，充值免费。只需支付区块链网络费用。',
        faq5Q: '手续费会变化吗？', faq5A: '手续费可能随市场条件变化。请始终查看最新费率。',
      },
      footer: { copyright: '© 2026 Sarraf 交易所。保留所有权利。', brandName: 'Sarraf', description: '安全可靠的加密货币交易平台。', quickLinks: '快速链接', legal: '法律', terms: '条款', privacy: '隐私政策', contactUs: '联系我们', contact: '联系' },
    },
  },
  hi: {
    translation: {
      nav: { home: 'होम', swap: 'स्वैप', trade: 'ट्रेड', fees: 'शुल्क', mainSite: 'Sarraf.com' },
      hero: { title: 'Sarraf एक्सचेंज', subtitle: 'सुरक्षित और तेज़ क्रिप्टो ट्रेडिंग', cta: 'स्वैप शुरू करें', stats: { users: '100K+ उपयोगकर्ता', coins: '1,500+ कॉइन', volume: '$10B+ वॉल्यूम' } },
      swap: {
        title: 'क्रिप्टो स्वैप', subtitle: 'बिना KYC, बिना छिपी फीस', youPay: 'आप भुगतान करते हैं', youReceive: 'आप प्राप्त करते हैं', exchange: 'स्वैप', rate: 'विनिमय दर', noHiddenFees: 'बिना छिपी फीस',
        balance: 'शेष:', max: 'अधिकतम', networkFee: 'नेटवर्क शुल्क', estimatedTime: 'अनुमानित समय', timeRange: '5-30 मिनट', included: 'शामिल', poweredBy: 'Godex द्वारा संचालित • बिना KYC • 1,500+ कॉइन',
        recentSwaps: 'हाल के स्वैप', table: { coin: 'जोड़ी', pay: 'आप देते हैं', receive: 'आप पाते हैं', rate: 'दर', status: 'स्थिति' },
        statusCompleted: '✓ पूर्ण', statusProcessing: '⏳ प्रसंस्करण',
        why: { title: 'Sarraf क्यों', nonCustodial: 'गैर-कस्टोडियल', nonCustodialDesc: 'आपके फंड आपके वॉलेट में रहते हैं', fast: 'तेज़', fastDesc: 'स्वैप के लिए 5-30 मिनट', bestRate: 'सर्वोत्तम दर', bestRateDesc: '10+ एक्सचेंजों से तुलना करें', noKyc: 'बिना KYC', noKycDesc: 'बिना पहचान सत्यापन' },
        noticeTitle: 'सूचना', noticeDesc: 'Sarraf केवल क्रिप्टो-से-क्रिप्टो स्वैप का समर्थन करता है। फिएट मुद्रा के लिए स्थानीय प्लेटफॉर्म का उपयोग करें।', volume24h: '24घ वॉल्यूम', live: 'लाइव', swapsToday: 'आज 1,234 स्वैप', dailyTarget: 'दैनिक लक्ष्य: $3.5M', topPairs: 'शीर्ष जोड़ियाँ',
      },
      home: {
        livePrices: 'लाइव कीमतें', whyTitle: 'Sarraf क्यों', howItWorks: 'यह कैसे काम करता है', startNow: 'अभी शुरू करें', startNowDesc: 'कोई पंजीकरण नहीं, कोई इंतज़ार नहीं। तुरंत क्रिप्टो स्वैप करें।', startSwapping: 'स्वैप शुरू करें',
        statsUsers: 'उपयोगकर्ता', statsCoins: 'कॉइन', statsVolume: 'वॉल्यूम',
        nonCustodial: 'गैर-कस्टोडियल', nonCustodialDesc: 'आपके फंड आपके वॉलेट में रहते हैं। हम कभी आपका क्रिप्टो नहीं रखते।', fast: 'तेज़', fastDesc: 'अधिकांश स्वैप 5-30 मिनट में पूरे होते हैं।', noKyc: 'बिना KYC', noKycDesc: 'बिना पहचान सत्यापन के व्यापार करें। गोपनीयता पहले।',
        step1Title: 'कॉइन चुनें', step1Desc: '1,500+ उपलब्ध कॉइन में से स्वैप करने के लिए क्रिप्टो चुनें।', step2Title: 'राशि दर्ज करें', step2Desc: 'स्वैप करने की राशि दर्ज करें। लाइव दर दिखाई देती है।', step3Title: 'कॉइन प्राप्त करें', step3Desc: 'अपना वॉलेट पता दर्ज करें और 5 मिनट से कम समय में अपना क्रिप्टो प्राप्त करें。',
        marketOverview: 'बाज़ार अवलोकन', topGainers: 'टॉप बढ़ने वाले', topLosers: 'टॉप घटने वाले', mostTraded: 'सबसे अधिक ट्रेडेड',
        securityTitle: 'सुरक्षा', sec2fa: 'दो-कारक प्रमाणीकरण', sec2faDesc: 'आपके खाते के लिए 2FA के साथ अतिरिक्त सुरक्षा', secCold: 'कोल्ड स्टोरेज', secColdDesc: '98% संपत्ति ऑफलाइन स्टोरेज में', secInsurance: 'बीमा कोष', secInsuranceDesc: '$100M तक की संपत्ति का बीमा', secAudit: 'नियमित ऑडिट', secAuditDesc: 'स्वतंत्र कंपनियों द्वारा मासिक सुरक्षा समीक्षा',
      },
      trade: {
        search: 'खोजें...', favorites: 'पसंदीदा', coin: 'जोड़ी', price: 'कीमत', change: 'बदलाव',
        h24Change: '24घ बदलाव', h24High: '24घ उच्च', h24Low: '24घ निम्न', h24Volume: '24घ वॉल्यूम',
        tf1m: '1मि', tf5m: '5मि', tf15m: '15मि', tf1h: '1घ', tf4h: '4घ', tf1d: '1द', tf1w: '1सप्ताह',
        orderBook: 'ऑर्डर बुक', recentTrades: 'हालिया ट्रेड', priceUSDT: 'कीमत (USDT)', amount: 'मात्रा', total: 'कुल', time: 'समय',
        buy: 'खरीदें', sell: 'बेचें', limit: 'सीमा', market: 'बाज़ार', stopLimit: 'स्टॉप-सीमा', available: 'उपलब्ध',
      },
      fees: {
        title: 'शुल्क संरचना', subtitle: 'पारदर्शी शुल्क संरचना, कोई छिपी फीस नहीं',
        tradingTitle: 'ट्रेडिंग शुल्क', tradingDesc: '30-दिवसीय वॉल्यूम के आधार पर मेकर और टेकर शुल्क', tier: 'स्तर', monthlyVolume: '30द वॉल्यूम', makerFee: 'मेकर शुल्क', takerFee: 'टेकर शुल्क',
        withdrawalTitle: 'निकासी शुल्क', withdrawalDesc: 'नेटवर्क के अनुसार निकासी शुल्क', coin: 'कॉइन', network: 'नेटवर्क', fee: 'शुल्क', approxUsd: 'अनुमानित USD',
        point1Title: 'कम शुल्क', point1Desc: '0.10% से शुरू। कोई छिपी फीस नहीं।', point2Title: 'वॉल्यूम छूट', point2Desc: 'VIP उपयोगकर्ताओं के लिए 100% तक छूट।', point3Title: 'मुफ्त निकासी', point3Desc: 'TRC-20 के माध्यम से मुफ्त USDT निकासी।',
        faqTitle: 'अक्सर पूछे जाने वाले प्रश्न',
        faq1Q: 'मेकर और टेकर शुल्क क्या है?', faq1A: 'मेकर ऑर्डर बुक में ऑर्डर रखता है। टेकर मौजूदा ऑर्डर निष्पादित करता है।',
        faq2Q: 'क्या निकासी शुल्क निश्चित है?', faq2A: 'निकासी शुल्क नेटवर्क के अनुसार बदलते हैं। USDT TRC-20 केवल 1 USDT।',
        faq3Q: 'मैं कम शुल्क कैसे दूं?', faq3A: 'अपना 30-दिवसीय वॉल्यूम बढ़ाकर आप उच्च VIP स्तर प्राप्त कर सकते हैं।',
        faq4Q: 'क्या जमा शुल्क है?', faq4A: 'नहीं, जमा मुफ्त है। आप केवल ब्लॉकचेन नेटवर्क शुल्क देते हैं।',
        faq5Q: 'क्या शुल्क बदलते हैं?', faq5A: 'शुल्क बाज़ार की स्थितियों के अनुसार बदल सकते हैं। हमेशा नवीनतम दरें जांचें।',
      },
      footer: { copyright: '© 2026 Sarraf एक्सचेंज। सर्वाधिकार सुरक्षित।', brandName: 'Sarraf', description: 'क्रिप्टो विनिमय के लिए सुरक्षित मंच।', quickLinks: 'त्वरित लिंक', legal: 'कानूनी', terms: 'शर्तें', privacy: 'गोपनीयता', contactUs: 'संपर्क करें', contact: 'संपर्क' },
    },
  },
};

export default resources;
