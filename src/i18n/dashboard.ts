// Dashboard translations. Merged into i18n in config.ts.
export type DashboardDict = {
  title: string;
  newOrder: string;
  createOrder: string;
  buy: string;
  sell: string;
  fromCurrency: string;
  toCurrency: string;
  amount: string;
  approxRate: string;
  submit: string;
  myOrders: string;
  noOrders: string;
  type: string;
  from: string;
  to: string;
  total: string;
  status: string;
  date: string;
  statusPending: string;
  statusConfirmed: string;
  statusCompleted: string;
  statusCancelled: string;
  createSuccess: string;
  error: string;
  loading: string;
};

export const dashboardResources: Record<string, DashboardDict> = {
  en: { title: "Dashboard", newOrder: "New order", createOrder: "Create transfer order", buy: "Buy", sell: "Sell", fromCurrency: "From currency", toCurrency: "To currency", amount: "Amount", approxRate: "Approx price", submit: "Submit order", myOrders: "My orders", noOrders: "No orders yet. Create your first one!", type: "Type", from: "From", to: "To", total: "Total", status: "Status", date: "Date", statusPending: "Pending", statusConfirmed: "Confirmed", statusCompleted: "Completed", statusCancelled: "Cancelled", createSuccess: "Order created successfully", error: "Error", loading: "Loading" },
  ar: { title: "لوحة التحكم", newOrder: "طلب جديد", createOrder: "إنشاء طلب تحويل", buy: "شراء", sell: "بيع", fromCurrency: "من العملة", toCurrency: "إلى العملة", amount: "المبلغ", approxRate: "السعر التقريبي", submit: "إرسال الطلب", myOrders: "طلباتي", noOrders: "لا توجد طلبات بعد. أنشئ طلبك الأول!", type: "النوع", from: "من", to: "إلى", total: "الإجمالي", status: "الحالة", date: "التاريخ", statusPending: "قيد الانتظار", statusConfirmed: "مؤكد", statusCompleted: "مكتمل", statusCancelled: "ملغي", createSuccess: "تم إنشاء الطلب بنجاح", error: "خطأ", loading: "جارٍ التحميل" },
  fa: { title: "داشبورد", newOrder: "سفارش جدید", createOrder: "ایجاد سفارش انتقال", buy: "خرید", sell: "فروش", fromCurrency: "از ارز", toCurrency: "به ارز", amount: "مبلغ", approxRate: "قیمت تقریبی", submit: "ارسال سفارش", myOrders: "سفارش‌های من", noOrders: "هنوز سفارشی نیست. اولین سفارش خود را ایجاد کنید!", type: "نوع", from: "از", to: "به", total: "مجموع", status: "وضعیت", date: "تاریخ", statusPending: "در انتظار", statusConfirmed: "تایید شده", statusCompleted: "تکمیل شده", statusCancelled: "لغو شده", createSuccess: "سفارش با موفقیت ایجاد شد", error: "خطا", loading: "در حال بارگذاری" },
  ur: { title: "ڈیش بورڈ", newOrder: "نیا آرڈر", createOrder: "ٹرانسفر آرڈر بنائیں", buy: "خریدیں", sell: "فروخت", fromCurrency: "سے کرنسی", toCurrency: "تک کرنسی", amount: "رقم", approxRate: "تقریبی قیمت", submit: "آرڈر بھیجیں", myOrders: "میرے آرڈرز", noOrders: "ابھی کوئی آرڈر نہیں۔ پہلا آرڈر بنائیں!", type: "قسم", from: "سے", to: "تک", total: "کل", status: "حالت", date: "تاریخ", statusPending: "زیر التواء", statusConfirmed: "تصدیق شدہ", statusCompleted: "مکمل", statusCancelled: "منسوخ", createSuccess: "آرڈر کامیابی سے بن گیا", error: "خرابی", loading: "لوڈ ہو رہا ہے" },
  ru: { title: "Кабинет", newOrder: "Новый заказ", createOrder: "Создать заявку на перевод", buy: "Купить", sell: "Продать", fromCurrency: "Из валюты", toCurrency: "В валюту", amount: "Сумма", approxRate: "Примерная цена", submit: "Отправить заявку", myOrders: "Мои заказы", noOrders: "Заказов пока нет. Создайте первый!", type: "Тип", from: "Из", to: "В", total: "Итого", status: "Статус", date: "Дата", statusPending: "В ожидании", statusConfirmed: "Подтверждён", statusCompleted: "Завершён", statusCancelled: "Отменён", createSuccess: "Заказ успешно создан", error: "Ошибка", loading: "Загрузка" },
  zh: { title: "控制台", newOrder: "新订单", createOrder: "创建转账订单", buy: "买入", sell: "卖出", fromCurrency: "源币种", toCurrency: "目标币种", amount: "金额", approxRate: "大约价格", submit: "提交订单", myOrders: "我的订单", noOrders: "暂无订单，立即创建第一个！", type: "类型", from: "从", to: "到", total: "合计", status: "状态", date: "日期", statusPending: "待处理", statusConfirmed: "已确认", statusCompleted: "已完成", statusCancelled: "已取消", createSuccess: "订单创建成功", error: "错误", loading: "加载中" },
  tr: { title: "Panel", newOrder: "Yeni sipariş", createOrder: "Transfer siparişi oluştur", buy: "Al", sell: "Sat", fromCurrency: "Kaynak para", toCurrency: "Hedef para", amount: "Tutar", approxRate: "Tahmini fiyat", submit: "Siparişi gönder", myOrders: "Siparişlerim", noOrders: "Henüz sipariş yok. İlkini oluşturun!", type: "Tür", from: "Kaynak", to: "Hedef", total: "Toplam", status: "Durum", date: "Tarih", statusPending: "Bekliyor", statusConfirmed: "Onaylandı", statusCompleted: "Tamamlandı", statusCancelled: "İptal", createSuccess: "Sipariş başarıyla oluşturuldu", error: "Hata", loading: "Yükleniyor" },
  fr: { title: "Tableau de bord", newOrder: "Nouvelle commande", createOrder: "Créer un ordre de transfert", buy: "Acheter", sell: "Vendre", fromCurrency: "De la devise", toCurrency: "Vers la devise", amount: "Montant", approxRate: "Prix approximatif", submit: "Envoyer l'ordre", myOrders: "Mes commandes", noOrders: "Aucune commande. Créez la première !", type: "Type", from: "De", to: "Vers", total: "Total", status: "Statut", date: "Date", statusPending: "En attente", statusConfirmed: "Confirmé", statusCompleted: "Terminé", statusCancelled: "Annulé", createSuccess: "Commande créée avec succès", error: "Erreur", loading: "Chargement" },
  es: { title: "Panel", newOrder: "Nuevo pedido", createOrder: "Crear orden de transferencia", buy: "Comprar", sell: "Vender", fromCurrency: "Desde divisa", toCurrency: "Hacia divisa", amount: "Monto", approxRate: "Precio aproximado", submit: "Enviar pedido", myOrders: "Mis pedidos", noOrders: "Aún no hay pedidos. ¡Crea el primero!", type: "Tipo", from: "Desde", to: "Hacia", total: "Total", status: "Estado", date: "Fecha", statusPending: "Pendiente", statusConfirmed: "Confirmado", statusCompleted: "Completado", statusCancelled: "Cancelado", createSuccess: "Pedido creado con éxito", error: "Error", loading: "Cargando" },
  hi: { title: "डैशबोर्ड", newOrder: "नया ऑर्डर", createOrder: "ट्रांसफर ऑर्डर बनाएँ", buy: "खरीदें", sell: "बेचें", fromCurrency: "स्रोत मुद्रा", toCurrency: "लक्ष्य मुद्रा", amount: "राशि", approxRate: "अनुमानित मूल्य", submit: "ऑर्डर भेजें", myOrders: "मेरे ऑर्डर", noOrders: "अभी कोई ऑर्डर नहीं। पहला बनाएँ!", type: "प्रकार", from: "से", to: "तक", total: "कुल", status: "स्थिति", date: "तारीख", statusPending: "लंबित", statusConfirmed: "पुष्टि", statusCompleted: "पूर्ण", statusCancelled: "रद्द", createSuccess: "ऑर्डर सफलतापूर्वक बना", error: "त्रुटि", loading: "लोड हो रहा है" },
};
