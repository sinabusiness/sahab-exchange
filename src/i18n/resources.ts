export const LANGUAGES = [
  { code: "en", label: "English", flag: "🇺🇸" },
  { code: "ar", label: "العربية", flag: "🇸🇦" },
  { code: "fa", label: "فارسی", flag: "🇮🇷" },
  { code: "ur", label: "اردو", flag: "🇵🇰" },
  { code: "ru", label: "Русский", flag: "🇷🇺" },
  { code: "zh", label: "中文", flag: "🇨🇳" },
  { code: "tr", label: "Türkçe", flag: "🇹🇷" },
  { code: "fr", label: "Français", flag: "🇫🇷" },
  { code: "es", label: "Español", flag: "🇪🇸" },
  { code: "hi", label: "हिन्दी", flag: "🇮🇳" },
];

export const RTL_LANGS = ["ar", "fa", "ur"];

type Dict = {
  brand: string;
  nav: { rates: string; converter: string; services: string; contact: string; login: string; dashboard: string; logout: string; menuOpen: string; menuClose: string; language: string };
  hero: { tagline: string; subtitle: string; bullets: string; viewRates: string; convert: string; imgAlt: string };
  rates: { cryptoTitle: string; cryptoSub: string; metalsTitle: string; metalsSub: string; perOunce: string; fiatTitle: string; fiatSub: string; gold: string; silver: string };
  converter: { title: string; subtitle: string; from: string; to: string; fromAria: string; toAria: string; swap: string; disclaimer: string };
  services: { title: string; subtitle: string; items: { title: string; desc: string }[] };
  footer: { title: string; subtitle: string; whatsapp: string; email: string; rights: string };
  auth: { loginTitle: string; signupTitle: string; loginSub: string; signupSub: string; fullName: string; fullNamePh: string; email: string; password: string; submitLogin: string; submitSignup: string; toLogin: string; toSignup: string; loginErr: string; signupErr: string; signupOk: string; signupOkDesc: string; forgotPassword: string; resetDesc: string; resetSubmit: string; resetSent: string; resetSentDesc: string };
};

const en: Dict = {
  brand: "Sarraf",
  nav: { rates: "Rates", converter: "Convert", services: "Services", contact: "Contact", login: "Sign in", dashboard: "Dashboard", logout: "Sign out", menuOpen: "Open menu", menuClose: "Close menu", language: "Language" },
  hero: { tagline: "Sarraf", subtitle: "Crypto, gold & silver exchange platform", bullets: "Live rates • Instant transfers • Total security", viewRates: "View rates", convert: "Convert", imgAlt: "Sarraf - crypto and gold exchange platform" },
  rates: { cryptoTitle: "Cryptocurrencies", cryptoSub: "Live prices from the global market", metalsTitle: "Precious metals", metalsSub: "Gold and silver per ounce", perOunce: "per ounce", fiatTitle: "Local currencies", fiatSub: "Exchange rates against USD", gold: "Gold", silver: "Silver" },
  converter: { title: "Currency converter", subtitle: "Convert between world currencies at live rates", from: "From", to: "To", fromAria: "Source currency", toAria: "Target currency", swap: "Swap currencies", disclaimer: "Rates are approximate and update every minute" },
  services: { title: "Our services", subtitle: "Complete financial solutions for all your needs", items: [
    { title: "Crypto exchange", desc: "Buy and sell Bitcoin, Ethereum and 50+ cryptocurrencies" },
    { title: "Gold & silver trading", desc: "Competitive prices for precious metals with instant delivery" },
    { title: "Currency transfers", desc: "Fast transfers between all Arab and foreign currencies" },
    { title: "Total security", desc: "Advanced encryption and full protection for your funds" },
    { title: "Fast execution", desc: "Instant transactions with no delays or hidden fees" },
    { title: "24/7 support", desc: "Dedicated multilingual support team around the clock" },
  ]},
  footer: { title: "Contact us", subtitle: "We're here to help anytime", whatsapp: "Chat on WhatsApp", email: "Email us", rights: "© 2026 Sarraf. All rights reserved" },
  auth: { loginTitle: "Sign in", signupTitle: "Create account", loginSub: "Access your account to manage orders", signupSub: "Start trading safely in minutes", fullName: "Full name", fullNamePh: "Your name", email: "Email", password: "Password", submitLogin: "Sign in", submitSignup: "Create account", toLogin: "Have an account? Sign in", toSignup: "No account? Sign up now", loginErr: "Sign-in error", signupErr: "Sign-up error", signupOk: "Account created", signupOkDesc: "Check your email to verify your account", forgotPassword: "Forgot password?", resetDesc: "Enter your email and we'll send you a link to reset your password.", resetSubmit: "Send reset link", resetSent: "Email sent!", resetSentDesc: "Check your inbox for the password reset link." },
};

const ar: Dict = {
  brand: "صَرّاف",
  nav: { rates: "الأسعار", converter: "التحويل", services: "الخدمات", contact: "تواصل", login: "دخول", dashboard: "لوحة التحكم", logout: "تسجيل الخروج", menuOpen: "فتح القائمة", menuClose: "إغلاق القائمة", language: "اللغة" },
  hero: { tagline: "صَرّاف", subtitle: "منصة تبادل العملات الرقمية والذهب والفضة", bullets: "أسعار لحظية • تحويل فوري • أمان مطلق", viewRates: "مشاهدة الأسعار", convert: "تحويل العملات", imgAlt: "صراف - منصة تبادل العملات الرقمية والذهب" },
  rates: { cryptoTitle: "العملات الرقمية", cryptoSub: "أسعار لحظية من السوق العالمي", metalsTitle: "المعادن الثمينة", metalsSub: "أسعار الذهب والفضة بالأونصة", perOunce: "للأونصة الواحدة", fiatTitle: "العملات المحلية", fiatSub: "أسعار الصرف مقابل الدولار الأمريكي", gold: "الذهب", silver: "الفضة" },
  converter: { title: "محوّل العملات", subtitle: "حوّل بين العملات العالمية بأسعار لحظية", from: "من", to: "إلى", fromAria: "العملة المصدر", toAria: "العملة الهدف", swap: "تبديل العملات", disclaimer: "الأسعار تقريبية وتُحدّث كل دقيقة" },
  services: { title: "خدماتنا", subtitle: "حلول مالية شاملة تلبي جميع احتياجاتك", items: [
    { title: "تبادل العملات الرقمية", desc: "بيع وشراء البيتكوين والإيثريوم وأكثر من 50 عملة رقمية" },
    { title: "تداول الذهب والفضة", desc: "أسعار تنافسية للمعادن الثمينة مع توصيل فوري" },
    { title: "تحويل العملات", desc: "تحويلات سريعة بين جميع العملات العربية والأجنبية" },
    { title: "أمان مطلق", desc: "تشفير متقدم وحماية كاملة لأموالك ومعاملاتك" },
    { title: "سرعة التنفيذ", desc: "معاملات فورية بدون تأخير أو رسوم مخفية" },
    { title: "دعم على مدار الساعة", desc: "فريق دعم متخصص بالعربية والفارسية 24/7" },
  ]},
  footer: { title: "تواصل معنا", subtitle: "نحن هنا لمساعدتك في أي وقت", whatsapp: "تواصل عبر واتساب", email: "البريد الإلكتروني", rights: "© 2026 صراف. جميع الحقوق محفوظة" },
  auth: { loginTitle: "تسجيل الدخول", signupTitle: "إنشاء حساب جديد", loginSub: "ادخل إلى حسابك لإدارة طلباتك", signupSub: "ابدأ التبادل بأمان خلال دقائق", fullName: "الاسم الكامل", fullNamePh: "أدخل اسمك", email: "البريد الإلكتروني", password: "كلمة المرور", submitLogin: "تسجيل الدخول", submitSignup: "إنشاء حساب", toLogin: "لديك حساب؟ سجّل الدخول", toSignup: "ليس لديك حساب؟ سجّل الآن", loginErr: "خطأ في الدخول", signupErr: "خطأ في التسجيل", signupOk: "تم التسجيل بنجاح", signupOkDesc: "تحقق من بريدك الإلكتروني لتأكيد الحساب", forgotPassword: "نسيت كلمة المرور؟", resetDesc: "أدخل بريدك الإلكتروني وسنرسل لك رابط لإعادة تعيين كلمة المرور.", resetSubmit: "إرسال رابط الإعادة", resetSent: "تم الإرسال!", resetSentDesc: "تحقق من بريدك الإلكتروني للحصول على رابط إعادة تعيين كلمة المرور." },
};

const fa: Dict = {
  brand: "صرّاف",
  nav: { rates: "قیمت‌ها", converter: "تبدیل", services: "خدمات", contact: "تماس", login: "ورود", dashboard: "داشبورد", logout: "خروج", menuOpen: "باز کردن منو", menuClose: "بستن منو", language: "زبان" },
  hero: { tagline: "صرّاف", subtitle: "پلتفرم تبادل ارز دیجیتال، طلا و نقره", bullets: "قیمت‌های لحظه‌ای • انتقال فوری • امنیت کامل", viewRates: "مشاهده قیمت‌ها", convert: "تبدیل ارز", imgAlt: "صراف - پلتفرم تبادل ارز دیجیتال و طلا" },
  rates: { cryptoTitle: "ارزهای دیجیتال", cryptoSub: "قیمت‌های لحظه‌ای از بازار جهانی", metalsTitle: "فلزات گرانبها", metalsSub: "قیمت طلا و نقره به ازای هر اونس", perOunce: "هر اونس", fiatTitle: "ارزهای محلی", fiatSub: "نرخ تبدیل در برابر دلار آمریکا", gold: "طلا", silver: "نقره" },
  converter: { title: "مبدل ارز", subtitle: "تبدیل میان ارزهای جهانی با نرخ لحظه‌ای", from: "از", to: "به", fromAria: "ارز مبدا", toAria: "ارز مقصد", swap: "تعویض ارزها", disclaimer: "قیمت‌ها تقریبی هستند و هر دقیقه به‌روزرسانی می‌شوند" },
  services: { title: "خدمات ما", subtitle: "راهکارهای مالی جامع برای همه نیازهای شما", items: [
    { title: "تبادل ارز دیجیتال", desc: "خرید و فروش بیت‌کوین، اتریوم و بیش از ۵۰ ارز دیجیتال" },
    { title: "معاملات طلا و نقره", desc: "قیمت‌های رقابتی برای فلزات گرانبها با تحویل فوری" },
    { title: "انتقال ارز", desc: "انتقال‌های سریع میان ارزهای عربی و خارجی" },
    { title: "امنیت کامل", desc: "رمزنگاری پیشرفته و محافظت کامل از سرمایه شما" },
    { title: "اجرای سریع", desc: "تراکنش‌های فوری بدون تاخیر یا کارمزد پنهان" },
    { title: "پشتیبانی ۲۴ ساعته", desc: "تیم پشتیبانی چندزبانه در تمام ساعات شبانه‌روز" },
  ]},
  footer: { title: "با ما در تماس باشید", subtitle: "ما هر زمان آماده کمک هستیم", whatsapp: "گفتگو در واتساپ", email: "ایمیل", rights: "© ۲۰۲۶ صراف. تمامی حقوق محفوظ است" },
  auth: { loginTitle: "ورود", signupTitle: "ایجاد حساب جدید", loginSub: "برای مدیریت سفارش‌ها وارد شوید", signupSub: "در چند دقیقه به‌صورت امن آغاز کنید", fullName: "نام کامل", fullNamePh: "نام خود را وارد کنید", email: "ایمیل", password: "رمز عبور", submitLogin: "ورود", submitSignup: "ایجاد حساب", toLogin: "حساب دارید؟ وارد شوید", toSignup: "حساب ندارید؟ اکنون ثبت‌نام کنید", loginErr: "خطا در ورود", signupErr: "خطا در ثبت‌نام", signupOk: "حساب با موفقیت ایجاد شد", signupOkDesc: "ایمیل خود را برای تایید حساب بررسی کنید", forgotPassword: "رمز عبور را فراموش کردید؟", resetDesc: "ایمیل خود را وارد کنید تا لینک بازیابی رمز عبور برایتان ارسال شود.", resetSubmit: "ارسال لینک بازیابی", resetSent: "ایمیل ارسال شد!", resetSentDesc: "ایمیل خود را برای دریافت لینک بازیابی رمز عبور بررسی کنید." },
};

const ur: Dict = {
  brand: "صرّاف",
  nav: { rates: "نرخیں", converter: "تبدیلی", services: "خدمات", contact: "رابطہ", login: "لاگ ان", dashboard: "ڈیش بورڈ", logout: "لاگ آؤٹ", menuOpen: "مینو کھولیں", menuClose: "مینو بند کریں", language: "زبان" },
  hero: { tagline: "صرّاف", subtitle: "کرپٹو، سونا اور چاندی کے تبادلے کا پلیٹ فارم", bullets: "براہ راست نرخ • فوری منتقلی • مکمل سیکیورٹی", viewRates: "نرخیں دیکھیں", convert: "کرنسی تبدیل کریں", imgAlt: "صراف - کرپٹو اور سونے کے تبادلے کا پلیٹ فارم" },
  rates: { cryptoTitle: "کرپٹو کرنسیز", cryptoSub: "عالمی مارکیٹ سے براہ راست قیمتیں", metalsTitle: "قیمتی دھاتیں", metalsSub: "فی اونس سونے اور چاندی کی قیمت", perOunce: "فی اونس", fiatTitle: "مقامی کرنسیز", fiatSub: "امریکی ڈالر کے مقابلے میں شرحیں", gold: "سونا", silver: "چاندی" },
  converter: { title: "کرنسی کنورٹر", subtitle: "براہ راست نرخوں پر دنیا کی کرنسیوں کے درمیان تبدیل کریں", from: "سے", to: "تک", fromAria: "ماخذ کرنسی", toAria: "ہدف کرنسی", swap: "کرنسیاں تبدیل کریں", disclaimer: "نرخیں تخمینی ہیں اور ہر منٹ اپ ڈیٹ ہوتی ہیں" },
  services: { title: "ہماری خدمات", subtitle: "آپ کی تمام ضروریات کے لیے مکمل مالی حل", items: [
    { title: "کرپٹو ایکسچینج", desc: "بٹ کوائن، ایتھیریم اور 50 سے زیادہ کرپٹو کرنسیاں خریدیں اور بیچیں" },
    { title: "سونے چاندی کی تجارت", desc: "فوری ڈیلیوری کے ساتھ قیمتی دھاتوں کی مسابقتی قیمتیں" },
    { title: "کرنسی منتقلی", desc: "تمام عربی اور غیر ملکی کرنسیوں کے درمیان تیز منتقلی" },
    { title: "مکمل سیکیورٹی", desc: "ایڈوانس انکرپشن اور آپ کے فنڈز کا مکمل تحفظ" },
    { title: "تیز عمل درآمد", desc: "کسی تاخیر یا چھپی فیس کے بغیر فوری ٹرانزیکشنز" },
    { title: "24/7 سپورٹ", desc: "چوبیس گھنٹے کثیر اللسانی سپورٹ ٹیم" },
  ]},
  footer: { title: "ہم سے رابطہ کریں", subtitle: "ہم ہر وقت مدد کے لیے حاضر ہیں", whatsapp: "واٹس ایپ پر چیٹ کریں", email: "ای میل", rights: "© 2026 صراف۔ جملہ حقوق محفوظ ہیں" },
  auth: { loginTitle: "لاگ ان", signupTitle: "نیا اکاؤنٹ بنائیں", loginSub: "آرڈرز منظم کرنے کے لیے لاگ ان کریں", signupSub: "منٹوں میں محفوظ طریقے سے شروع کریں", fullName: "پورا نام", fullNamePh: "اپنا نام درج کریں", email: "ای میل", password: "پاس ورڈ", submitLogin: "لاگ ان", submitSignup: "اکاؤنٹ بنائیں", toLogin: "اکاؤنٹ ہے؟ لاگ ان کریں", toSignup: "اکاؤنٹ نہیں؟ ابھی رجسٹر کریں", loginErr: "لاگ ان میں خرابی", signupErr: "رجسٹریشن میں خرابی", signupOk: "اکاؤنٹ بن گیا", signupOkDesc: "اپنے اکاؤنٹ کی تصدیق کے لیے ای میل دیکھیں", forgotPassword: "پاس ورڈ بھول گئے؟", resetDesc: "اپنا ای میل درج کریں اور ہم آپ کو پاس ورڈ ری سیٹ لنک بھیجیں گے۔", resetSubmit: "ری سیٹ لنک بھیجیں", resetSent: "ای میل بھیج دیا گیا!", resetSentDesc: "پاس ورڈ ری سیٹ لنک کے لیے اپنا ان باکس چیک کریں۔" },
};

const ru: Dict = {
  brand: "Sarraf",
  nav: { rates: "Курсы", converter: "Конвертер", services: "Услуги", contact: "Контакты", login: "Войти", dashboard: "Кабинет", logout: "Выйти", menuOpen: "Открыть меню", menuClose: "Закрыть меню", language: "Язык" },
  hero: { tagline: "Sarraf", subtitle: "Платформа обмена криптовалют, золота и серебра", bullets: "Курсы онлайн • Мгновенные переводы • Полная безопасность", viewRates: "Смотреть курсы", convert: "Конвертировать", imgAlt: "Sarraf — платформа обмена криптовалют и золота" },
  rates: { cryptoTitle: "Криптовалюты", cryptoSub: "Цены с мирового рынка в реальном времени", metalsTitle: "Драгоценные металлы", metalsSub: "Золото и серебро за унцию", perOunce: "за унцию", fiatTitle: "Местные валюты", fiatSub: "Курсы по отношению к USD", gold: "Золото", silver: "Серебро" },
  converter: { title: "Конвертер валют", subtitle: "Конвертируйте мировые валюты по актуальным курсам", from: "Из", to: "В", fromAria: "Исходная валюта", toAria: "Целевая валюта", swap: "Поменять местами", disclaimer: "Курсы приблизительные, обновляются каждую минуту" },
  services: { title: "Наши услуги", subtitle: "Комплексные финансовые решения для любых задач", items: [
    { title: "Обмен криптовалют", desc: "Покупка и продажа Bitcoin, Ethereum и более 50 криптовалют" },
    { title: "Торговля золотом и серебром", desc: "Выгодные цены на драгоценные металлы с мгновенной поставкой" },
    { title: "Переводы валют", desc: "Быстрые переводы между арабскими и иностранными валютами" },
    { title: "Полная безопасность", desc: "Современное шифрование и защита ваших средств" },
    { title: "Быстрое исполнение", desc: "Мгновенные операции без задержек и скрытых комиссий" },
    { title: "Поддержка 24/7", desc: "Многоязычная команда поддержки круглосуточно" },
  ]},
  footer: { title: "Свяжитесь с нами", subtitle: "Мы всегда готовы помочь", whatsapp: "Написать в WhatsApp", email: "Электронная почта", rights: "© 2026 Sarraf. Все права защищены" },
  auth: { loginTitle: "Вход", signupTitle: "Создать аккаунт", loginSub: "Войдите для управления заказами", signupSub: "Начните торговлю безопасно за минуты", fullName: "Полное имя", fullNamePh: "Введите ваше имя", email: "Email", password: "Пароль", submitLogin: "Войти", submitSignup: "Создать аккаунт", toLogin: "Уже есть аккаунт? Войти", toSignup: "Нет аккаунта? Зарегистрироваться", loginErr: "Ошибка входа", signupErr: "Ошибка регистрации", signupOk: "Регистрация успешна", signupOkDesc: "Проверьте email для подтверждения аккаунта", forgotPassword: "Забыли пароль?", resetDesc: "Введите email, и мы отправим ссылку для сброса пароля.", resetSubmit: "Отправить ссылку", resetSent: "Письмо отправлено!", resetSentDesc: "Проверьте почту для ссылки на сброс пароля." },
};

const zh: Dict = {
  brand: "Sarraf",
  nav: { rates: "汇率", converter: "兑换", services: "服务", contact: "联系", login: "登录", dashboard: "控制台", logout: "退出", menuOpen: "打开菜单", menuClose: "关闭菜单", language: "语言" },
  hero: { tagline: "Sarraf", subtitle: "加密货币、黄金与白银交易平台", bullets: "实时汇率 • 即时转账 • 全面安全", viewRates: "查看汇率", convert: "立即兑换", imgAlt: "Sarraf - 加密货币和黄金交易平台" },
  rates: { cryptoTitle: "加密货币", cryptoSub: "来自全球市场的实时价格", metalsTitle: "贵金属", metalsSub: "每盎司黄金与白银价格", perOunce: "每盎司", fiatTitle: "本地货币", fiatSub: "兑美元汇率", gold: "黄金", silver: "白银" },
  converter: { title: "货币兑换器", subtitle: "以实时汇率在世界货币之间兑换", from: "从", to: "到", fromAria: "源货币", toAria: "目标货币", swap: "切换货币", disclaimer: "汇率为近似值，每分钟更新一次" },
  services: { title: "我们的服务", subtitle: "满足您所有需求的全面金融解决方案", items: [
    { title: "加密货币兑换", desc: "买卖比特币、以太坊及50多种加密货币" },
    { title: "黄金白银交易", desc: "贵金属具竞争力的价格，即时交付" },
    { title: "货币转账", desc: "在所有阿拉伯及外币之间快速转账" },
    { title: "全面安全", desc: "先进加密技术，全面保护您的资金" },
    { title: "快速执行", desc: "即时交易，无延迟无隐藏费用" },
    { title: "全天候支持", desc: "多语种支持团队全天候服务" },
  ]},
  footer: { title: "联系我们", subtitle: "我们随时为您提供帮助", whatsapp: "WhatsApp 聊天", email: "电子邮件", rights: "© 2026 Sarraf。版权所有" },
  auth: { loginTitle: "登录", signupTitle: "创建账户", loginSub: "登录以管理您的订单", signupSub: "几分钟内安全开始交易", fullName: "全名", fullNamePh: "请输入您的姓名", email: "电子邮件", password: "密码", submitLogin: "登录", submitSignup: "创建账户", toLogin: "已有账户？登录", toSignup: "没有账户？立即注册", loginErr: "登录错误", signupErr: "注册错误", signupOk: "账户已创建", signupOkDesc: "请检查邮箱以验证您的账户", forgotPassword: "忘记密码？", resetDesc: "输入您的邮箱，我们将发送密码重置链接。", resetSubmit: "发送重置链接", resetSent: "邮件已发送！", resetSentDesc: "请检查邮箱获取密码重置链接。" },
};

const tr: Dict = {
  brand: "Sarraf",
  nav: { rates: "Kurlar", converter: "Çevirici", services: "Hizmetler", contact: "İletişim", login: "Giriş", dashboard: "Panel", logout: "Çıkış", menuOpen: "Menüyü aç", menuClose: "Menüyü kapat", language: "Dil" },
  hero: { tagline: "Sarraf", subtitle: "Kripto, altın ve gümüş takas platformu", bullets: "Canlı kurlar • Anında transfer • Tam güvenlik", viewRates: "Kurları gör", convert: "Çevir", imgAlt: "Sarraf - kripto ve altın takas platformu" },
  rates: { cryptoTitle: "Kripto paralar", cryptoSub: "Küresel piyasadan canlı fiyatlar", metalsTitle: "Değerli metaller", metalsSub: "Ons başına altın ve gümüş", perOunce: "ons başına", fiatTitle: "Yerel para birimleri", fiatSub: "USD karşısındaki kurlar", gold: "Altın", silver: "Gümüş" },
  converter: { title: "Para birimi çevirici", subtitle: "Dünya para birimleri arasında canlı kurlarla çevirin", from: "Kaynak", to: "Hedef", fromAria: "Kaynak para birimi", toAria: "Hedef para birimi", swap: "Yerlerini değiştir", disclaimer: "Kurlar yaklaşıktır ve her dakika güncellenir" },
  services: { title: "Hizmetlerimiz", subtitle: "Tüm ihtiyaçlarınız için kapsamlı finansal çözümler", items: [
    { title: "Kripto takası", desc: "Bitcoin, Ethereum ve 50+ kripto para alın satın" },
    { title: "Altın & gümüş ticareti", desc: "Anında teslimatlı, rekabetçi metal fiyatları" },
    { title: "Para transferleri", desc: "Tüm Arap ve yabancı para birimleri arasında hızlı transfer" },
    { title: "Tam güvenlik", desc: "Gelişmiş şifreleme ve fonlarınız için tam koruma" },
    { title: "Hızlı işlem", desc: "Gecikmesiz ve gizli ücretsiz anında işlemler" },
    { title: "7/24 destek", desc: "Çok dilli destek ekibi gece gündüz hizmetinizde" },
  ]},
  footer: { title: "Bize ulaşın", subtitle: "Her zaman yardıma hazırız", whatsapp: "WhatsApp'tan yazın", email: "E-posta", rights: "© 2026 Sarraf. Tüm hakları saklıdır" },
  auth: { loginTitle: "Giriş", signupTitle: "Hesap oluştur", loginSub: "Siparişlerinizi yönetmek için giriş yapın", signupSub: "Dakikalar içinde güvenle başlayın", fullName: "Ad soyad", fullNamePh: "Adınızı girin", email: "E-posta", password: "Şifre", submitLogin: "Giriş yap", submitSignup: "Hesap oluştur", toLogin: "Hesabınız var mı? Giriş yapın", toSignup: "Hesabınız yok mu? Kaydolun", loginErr: "Giriş hatası", signupErr: "Kayıt hatası", signupOk: "Hesap oluşturuldu", signupOkDesc: "Hesabınızı doğrulamak için e-postanızı kontrol edin", forgotPassword: "Şifreni mi unuttun?", resetDesc: "E-postanızı girin, size şifre sıfırlama bağlantısı gönderelim.", resetSubmit: "Bağlantı gönder", resetSent: "E-posta gönderildi!", resetSentDesc: "Şifre sıfırlama bağlantısı için gelen kutunuzu kontrol edin." },
};

const fr: Dict = {
  brand: "Sarraf",
  nav: { rates: "Cours", converter: "Convertir", services: "Services", contact: "Contact", login: "Connexion", dashboard: "Tableau de bord", logout: "Déconnexion", menuOpen: "Ouvrir le menu", menuClose: "Fermer le menu", language: "Langue" },
  hero: { tagline: "Sarraf", subtitle: "Plateforme d'échange crypto, or et argent", bullets: "Cours en direct • Transferts instantanés • Sécurité totale", viewRates: "Voir les cours", convert: "Convertir", imgAlt: "Sarraf - plateforme d'échange crypto et or" },
  rates: { cryptoTitle: "Cryptomonnaies", cryptoSub: "Prix en direct du marché mondial", metalsTitle: "Métaux précieux", metalsSub: "Or et argent à l'once", perOunce: "à l'once", fiatTitle: "Devises locales", fiatSub: "Taux de change face au dollar", gold: "Or", silver: "Argent" },
  converter: { title: "Convertisseur de devises", subtitle: "Convertissez entre les devises mondiales aux taux en direct", from: "De", to: "Vers", fromAria: "Devise source", toAria: "Devise cible", swap: "Inverser les devises", disclaimer: "Les taux sont approximatifs et mis à jour chaque minute" },
  services: { title: "Nos services", subtitle: "Des solutions financières complètes pour tous vos besoins", items: [
    { title: "Échange crypto", desc: "Achetez et vendez Bitcoin, Ethereum et plus de 50 cryptos" },
    { title: "Trading or & argent", desc: "Prix compétitifs sur les métaux précieux avec livraison rapide" },
    { title: "Transferts de devises", desc: "Transferts rapides entre devises arabes et étrangères" },
    { title: "Sécurité totale", desc: "Chiffrement avancé et protection complète de vos fonds" },
    { title: "Exécution rapide", desc: "Transactions instantanées sans délais ni frais cachés" },
    { title: "Support 24/7", desc: "Équipe d'assistance multilingue disponible en continu" },
  ]},
  footer: { title: "Contactez-nous", subtitle: "Nous sommes là pour vous aider à tout moment", whatsapp: "Discuter sur WhatsApp", email: "E-mail", rights: "© 2026 Sarraf. Tous droits réservés" },
  auth: { loginTitle: "Connexion", signupTitle: "Créer un compte", loginSub: "Connectez-vous pour gérer vos commandes", signupSub: "Commencez en toute sécurité en quelques minutes", fullName: "Nom complet", fullNamePh: "Votre nom", email: "E-mail", password: "Mot de passe", submitLogin: "Se connecter", submitSignup: "Créer le compte", toLogin: "Déjà un compte ? Se connecter", toSignup: "Pas de compte ? S'inscrire", loginErr: "Erreur de connexion", signupErr: "Erreur d'inscription", signupOk: "Compte créé", signupOkDesc: "Vérifiez votre e-mail pour activer votre compte", forgotPassword: "Mot de passe oublié ?", resetDesc: "Entrez votre e-mail et nous vous enverrons un lien pour réinitialiser votre mot de passe.", resetSubmit: "Envoyer le lien", resetSent: "E-mail envoyé !", resetSentDesc: "Vérifiez votre boîte de réception pour le lien de réinitialisation." },
};

const es: Dict = {
  brand: "Sarraf",
  nav: { rates: "Tasas", converter: "Convertir", services: "Servicios", contact: "Contacto", login: "Entrar", dashboard: "Panel", logout: "Salir", menuOpen: "Abrir menú", menuClose: "Cerrar menú", language: "Idioma" },
  hero: { tagline: "Sarraf", subtitle: "Plataforma de intercambio de cripto, oro y plata", bullets: "Tasas en vivo • Transferencias instantáneas • Seguridad total", viewRates: "Ver tasas", convert: "Convertir", imgAlt: "Sarraf - plataforma de intercambio de cripto y oro" },
  rates: { cryptoTitle: "Criptomonedas", cryptoSub: "Precios en vivo del mercado global", metalsTitle: "Metales preciosos", metalsSub: "Oro y plata por onza", perOunce: "por onza", fiatTitle: "Monedas locales", fiatSub: "Tasas frente al dólar estadounidense", gold: "Oro", silver: "Plata" },
  converter: { title: "Conversor de divisas", subtitle: "Convierte entre divisas mundiales con tasas en vivo", from: "De", to: "A", fromAria: "Divisa de origen", toAria: "Divisa de destino", swap: "Intercambiar divisas", disclaimer: "Las tasas son aproximadas y se actualizan cada minuto" },
  services: { title: "Nuestros servicios", subtitle: "Soluciones financieras integrales para todas tus necesidades", items: [
    { title: "Intercambio cripto", desc: "Compra y vende Bitcoin, Ethereum y más de 50 criptos" },
    { title: "Oro y plata", desc: "Precios competitivos en metales preciosos con entrega rápida" },
    { title: "Transferencia de divisas", desc: "Transferencias rápidas entre monedas árabes y extranjeras" },
    { title: "Seguridad total", desc: "Cifrado avanzado y protección total de tus fondos" },
    { title: "Ejecución rápida", desc: "Transacciones instantáneas sin retrasos ni cargos ocultos" },
    { title: "Soporte 24/7", desc: "Equipo de soporte multilingüe a toda hora" },
  ]},
  footer: { title: "Contáctanos", subtitle: "Estamos para ayudarte en cualquier momento", whatsapp: "Chatear por WhatsApp", email: "Correo electrónico", rights: "© 2026 Sarraf. Todos los derechos reservados" },
  auth: { loginTitle: "Iniciar sesión", signupTitle: "Crear cuenta", loginSub: "Accede para gestionar tus pedidos", signupSub: "Empieza a operar de forma segura en minutos", fullName: "Nombre completo", fullNamePh: "Tu nombre", email: "Correo", password: "Contraseña", submitLogin: "Entrar", submitSignup: "Crear cuenta", toLogin: "¿Ya tienes cuenta? Inicia sesión", toSignup: "¿Sin cuenta? Regístrate", loginErr: "Error al iniciar sesión", signupErr: "Error de registro", signupOk: "Cuenta creada", signupOkDesc: "Revisa tu correo para verificar la cuenta", forgotPassword: "¿Olvidaste tu contraseña?", resetDesc: "Ingresa tu correo y te enviaremos un enlace para restablecer tu contraseña.", resetSubmit: "Enviar enlace", resetSent: "¡Correo enviado!", resetSentDesc: "Revisa tu bandeja para el enlace de restablecimiento." },
};

const hi: Dict = {
  brand: "Sarraf",
  nav: { rates: "दरें", converter: "बदलें", services: "सेवाएँ", contact: "संपर्क", login: "साइन इन", dashboard: "डैशबोर्ड", logout: "साइन आउट", menuOpen: "मेनू खोलें", menuClose: "मेनू बंद करें", language: "भाषा" },
  hero: { tagline: "Sarraf", subtitle: "क्रिप्टो, सोना और चांदी विनिमय मंच", bullets: "लाइव दरें • तत्काल स्थानांतरण • पूर्ण सुरक्षा", viewRates: "दरें देखें", convert: "बदलें", imgAlt: "Sarraf - क्रिप्टो और सोना विनिमय मंच" },
  rates: { cryptoTitle: "क्रिप्टोकरेंसी", cryptoSub: "वैश्विक बाज़ार से लाइव दरें", metalsTitle: "कीमती धातुएँ", metalsSub: "प्रति औंस सोना और चांदी", perOunce: "प्रति औंस", fiatTitle: "स्थानीय मुद्राएँ", fiatSub: "USD के मुकाबले दरें", gold: "सोना", silver: "चांदी" },
  converter: { title: "मुद्रा परिवर्तक", subtitle: "लाइव दरों पर विश्व मुद्राओं के बीच बदलें", from: "से", to: "तक", fromAria: "स्रोत मुद्रा", toAria: "लक्ष्य मुद्रा", swap: "मुद्राएँ बदलें", disclaimer: "दरें अनुमानित हैं और हर मिनट अपडेट होती हैं" },
  services: { title: "हमारी सेवाएँ", subtitle: "आपकी सभी आवश्यकताओं के लिए संपूर्ण वित्तीय समाधान", items: [
    { title: "क्रिप्टो विनिमय", desc: "बिटकॉइन, एथेरियम और 50+ क्रिप्टो खरीदें-बेचें" },
    { title: "सोना-चांदी कारोबार", desc: "कीमती धातुओं पर प्रतिस्पर्धी दामों के साथ तुरंत डिलीवरी" },
    { title: "मुद्रा स्थानांतरण", desc: "सभी अरब और विदेशी मुद्राओं के बीच तेज़ ट्रांसफर" },
    { title: "पूर्ण सुरक्षा", desc: "उन्नत एन्क्रिप्शन और आपके धन की पूर्ण सुरक्षा" },
    { title: "तेज़ निष्पादन", desc: "बिना देरी और छुपे शुल्क के तुरंत लेन-देन" },
    { title: "24/7 सहायता", desc: "बहुभाषी सहायता टीम चौबीसों घंटे उपलब्ध" },
  ]},
  footer: { title: "संपर्क करें", subtitle: "हम हर समय मदद के लिए तैयार हैं", whatsapp: "WhatsApp पर चैट करें", email: "ईमेल", rights: "© 2026 Sarraf. सर्वाधिकार सुरक्षित" },
  auth: { loginTitle: "साइन इन", signupTitle: "खाता बनाएँ", loginSub: "अपने ऑर्डर प्रबंधित करने के लिए साइन इन करें", signupSub: "मिनटों में सुरक्षित रूप से शुरू करें", fullName: "पूरा नाम", fullNamePh: "अपना नाम दर्ज करें", email: "ईमेल", password: "पासवर्ड", submitLogin: "साइन इन", submitSignup: "खाता बनाएँ", toLogin: "खाता है? साइन इन करें", toSignup: "खाता नहीं? अभी रजिस्टर करें", loginErr: "साइन इन त्रुटि", signupErr: "रजिस्टर त्रुटि", signupOk: "खाता बन गया", signupOkDesc: "अपने खाते को सत्यापित करने के लिए ईमेल देखें", forgotPassword: "पासवर्ड भूल गए?", resetDesc: "अपना ईमेल दर्ज करें और हम आपको पासवर्ड रीसेट लिंक भेजेंगे।", resetSubmit: "लिंक भेजें", resetSent: "ईमेल भेज दिया!", resetSentDesc: "पासवर्ड रीसेट लिंक के लिए अपना इनबॉक्स देखें।" },
};

export const resources = {
  en: { translation: en },
  ar: { translation: ar },
  fa: { translation: fa },
  ur: { translation: ur },
  ru: { translation: ru },
  zh: { translation: zh },
  tr: { translation: tr },
  fr: { translation: fr },
  es: { translation: es },
  hi: { translation: hi },
} as const;
