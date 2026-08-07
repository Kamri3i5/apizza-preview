/* ==========================================
   BACKEND CONFIG
   Point this at your FastAPI server (see server/README.md).
   Local dev example: 'http://localhost:3001'
   Production example: 'https://api.your-domain.com'
   ========================================== */
const API_BASE_URL = 'http://localhost:3001';

const translations = {
    ru: {

        nav_home: 'Главная',
        nav_menu: 'Меню',
        nav_story: 'О нас',
        nav_delivery: 'Доставка',
        nav_deals: 'Акции',
        

        hero_title: 'Аутентичная пицца, приготовленная свежей ежедневно',
        hero_subtitle: 'Испытайте настоящий вкус Америки с нашими пиццами премиум-класса',
        hero_order: 'Заказать сейчас',
        hero_menu: 'Посмотреть меню',
        pizza_call_text: 'Хотите заказать?',
        pizza_call_btn: 'Позвонить и заказать',
        pizza_add_order: 'В заказ',
        pizza_added: 'Добавлено',
        order_title: 'Ваш заказ',
        order_empty: 'Пока пусто. Выберите пиццу и размер, потом нажмите «В заказ».',
        order_total: 'Итого',
        order_call_btn: 'Позвонить и заказать',
        sets_title: 'Сеты и комбо',
        sets_subtitle: 'Выгоднее, чем заказывать по отдельности',
        drinks_title: 'Напитки',
        drinks_subtitle: 'Освежающие напитки к вашей пицце',
        quicknav_pizza: 'Пицца',
        quicknav_sets: 'Сеты',
        quicknav_drinks: 'Напитки',
        

        signature_title: 'Наши фирменные пиццы',
        signature_subtitle: 'Избранные фавориты, за которыми возвращаются наши клиенты',
        menu_title: 'Полное меню',
        menu_subtitle: 'Изучите наш полный ассортимент пицц ручной работы',
        

        filter_size: 'Размер',
        filter_dietary: 'Особенности',
        filter_price: 'Цена',
        filter_veg: '🌱 Вегетарианская',
        filter_spicy: '🌶️ Острая',
        filter_upto: 'До',
        currency: 'сум',
        

        cart_title: 'Ваш заказ',
        cart_empty: 'Ваша корзина пуста',
        cart_subtotal: 'Промежуточный итог:',
        cart_delivery: 'Доставка:',
        cart_free: 'Бесплатно',
        cart_total: 'Итого:',
        cart_checkout: 'Оформить заказ',
        cart_remove: 'Удалить',
        

        story_title: 'О нас',
        story_p1: 'American Pizza. Discover new state.',
        story_p2: 'Пицца приезжает горячей и вовремя.',
        story_p3: 'Круглосуточная доставка — 24/7. Звоните прямо сейчас! +998 (33)105-10-10',
        story_f1: 'Свежее тесто',
        story_f2: 'Аутентичный рецепт',
        story_f3: 'Из печи',
        

        delivery_title: 'Быстрая доставка до двери',
        delivery_subtitle: 'Доставляем горячую, свежую пиццу по всему Ташкенту',
        delivery_loc_title: 'Центр Ташкента',
        delivery_time_title: 'Время доставки',
        delivery_time_val: '30-45 минут',
        delivery_min_title: 'Минимальный заказ',
        delivery_fee_title: 'Стоимость доставки',
        delivery_free_cond: 'Бесплатно от 100,000 сум',
        delivery_fee_val: 'Иначе 10,000 сум',
        delivery_contact: 'Связаться с нами',
        delivery_partner_desc: 'Официальный партнер по доставке',
        delivery_order_uzum: 'Заказать в Uzum',


        pizza_from: 'от',
        pizza_add_cart: 'Заказать',
        badge_bestseller: '⭐ Хит',
        badge_spicy: '🌶️ Острая',
        badge_vegetarian: '🌱 Вегетарианская',
        modal_customize: 'Настройте свою',
        size_cm: 'см',
        crust_thin: 'тонкое тесто',
        crust_thick: 'толстое тесто',
        crust_stuffed: 'с начинкой',
        

        deal_calzone_title: 'Calzone set',
        deal_calzone_desc: 'Кальцоне — 2 шт, фри — 2 порции, Fanta 0.5 — 2 шт, соус кетчуп — 2 шт.',
        deal_combo2_title: 'Комбо для двоих',
        deal_combo2_desc: 'Американо 35 см — 1 шт, Coca-Cola 1 л — 1 шт, соус — 2 шт, картофель по-деревенски — 2 порции.',
        deal_mega_title: 'Mega Combo',
        deal_mega_desc: 'Пиццы Texas, Pennsylvania, Pepperoni.',
        deal_super_title: 'Super Box',
        deal_super_desc: 'Ceasar 30 см — 1 шт, фри — 2 порции, Fanta 0.5 — 2 шт, соус кетчуп — 2 шт.',
        deal_megaxit_title: 'Mega Xit',
        deal_megaxit_desc: 'Пицца Hawaii — 1 шт, бургер — 2 порции, фри — 2 шт, Coca-Cola 0.5 — 2 шт, кетчуп.',
        deal_drinks_title: 'Напитки',
        deal_drinks_desc: 'Cola / Fanta / Sprite 1.5 L',
        payment_title: 'Выберите способ оплаты',
        payment_cash: 'Наличные',
        payment_success: 'Спасибо за заказ! Мы свяжемся с вами для подтверждения.',
        payment_processing: 'Перенаправление на оплату...',
        delivery_choose_title: 'Выберите партнера по доставке',
        delivery_call_us: 'или позвоните нам напрямую: <br><strong>+998 (33) 105-10-10</strong>',

        checkout_name: 'Имя',
        checkout_name_placeholder: 'Ваше имя',
        checkout_phone: 'Телефон',
        checkout_address: 'Адрес доставки',
        checkout_address_placeholder: 'Улица, дом, квартира',
        checkout_comment: 'Комментарий',
        checkout_comment_placeholder: 'Домофон, этаж и т.д. (необязательно)',
        checkout_submitting: 'Отправляем заказ...',
        checkout_error_required: 'Заполните имя, телефон и адрес.',
        checkout_error_network: 'Не удалось отправить заказ. Проверьте интернет и попробуйте снова.',
        checkout_order_number: 'Номер заказа'
    },
    en: {

        nav_home: 'Home',
        nav_menu: 'Menu',
        nav_story: 'Story',
        nav_story: 'Story',
        nav_delivery: 'Delivery',
        nav_deals: 'Deals',
        

        hero_title: 'Authentic Italian Pizza, Made Fresh Daily',
        hero_subtitle: 'Experience the true taste of Italy with our premium pizzas',
        hero_order: 'Order Now',
        pizza_call_text: 'Want to order?',
        pizza_call_btn: 'Call to order',
        pizza_add_order: 'Add',
        pizza_added: 'Added',
        order_title: 'Your order',
        order_empty: 'Nothing here yet. Pick a pizza and size, then tap “Add”.',
        order_total: 'Total',
        order_call_btn: 'Call to order',
        sets_title: 'Sets & Combos',
        sets_subtitle: 'Better value than ordering separately',
        drinks_title: 'Drinks',
        drinks_subtitle: 'Refreshing drinks for your pizza',
        quicknav_pizza: 'Pizza',
        quicknav_sets: 'Sets',
        quicknav_drinks: 'Drinks',
        hero_menu: 'View Menu',
        

        signature_title: 'Our Signature Pizzas',
        signature_subtitle: 'Handpicked favorites that keep our customers coming back',
        menu_title: 'Full Menu',
        menu_subtitle: 'Explore our complete selection of handcrafted pizzas',
        

        filter_size: 'Size',
        filter_dietary: 'Dietary',
        filter_price: 'Price Range',
        filter_veg: '🌱 Vegetarian',
        filter_spicy: '🌶️ Spicy',
        filter_upto: 'Up to',
        currency: 'UZS',
        

        cart_title: 'Your Order',
        cart_empty: 'Your cart is empty',
        cart_subtotal: 'Subtotal:',
        cart_delivery: 'Delivery:',
        cart_free: 'Free',
        cart_total: 'Total:',
        cart_checkout: 'Checkout',
        cart_remove: 'Remove',
        

        story_title: 'Our Story: Passion Meets Tradition',
        story_p1: 'At American Pizza, we believe that great pizza starts with great dough. Every morning, our master bakers hand-knead fresh dough using a time-honored recipe.',
        story_p2: 'We source only the finest ingredients: San Marzano tomatoes from Italy, premium mozzarella, and fresh vegetables. Our commitment to quality means never compromising on taste.',
        story_p3: 'From our traditional brick oven to your table, every pizza is crafted with love and respect for tradition. This is more than food—it\'s an experience.',
        story_f1: 'Fresh Daily Dough',
        story_f2: 'Authentic Italian Recipe',
        story_f3: 'Brick Oven Baked',
        

        delivery_title: 'Fast Delivery to Your Door',
        delivery_subtitle: 'We deliver hot, fresh pizza across Tashkent',
        delivery_loc_title: 'Tashkent City Center',
        delivery_time_title: 'Delivery Time',
        delivery_time_val: '30-45 minutes',
        delivery_min_title: 'Minimum Order',
        delivery_fee_title: 'Delivery Fee',
        delivery_free_cond: 'Free over 100,000 UZS',
        delivery_fee_val: 'Otherwise 10,000 UZS',
        delivery_contact: 'Contact Us',
        delivery_partner_desc: 'Official Delivery Partner',
        delivery_order_uzum: 'Order via Uzum',


        pizza_from: 'from',
        pizza_add_cart: 'Order',
        badge_bestseller: '⭐ Bestseller',
        badge_spicy: '🌶️ Spicy',
        badge_vegetarian: '🌱 Vegetarian',
        modal_customize: 'Customize Your',
        size_cm: 'cm',
        crust_thin: 'thin crust',
        crust_thick: 'thick crust',
        crust_stuffed: 'stuffed crust',
        

        deal_calzone_title: 'Calzone Set',
        deal_calzone_desc: 'Calzone - 2 pcs, Fries - 2 servings, Fanta 0.5 - 2 pcs, Ketchup - 2 pcs',
        deal_combo2_title: 'Combo for Two',
        deal_combo2_desc: 'Americano 35cm - 1 pc, Coca-Cola 1L - 1 pc, Sauce - 2 pcs, Country Style Potatoes - 2 servings',
        deal_mega_title: 'Mega Combo',
        deal_mega_desc: 'Texas, Pennsylvania, Pepperoni Pizzas',
        deal_super_title: 'Super Box',
        deal_super_desc: 'Caesar 30cm - 1 pc, Fries - 2 servings, Fanta 0.5 - 2 pcs, Ketchup - 2 pcs',
        deal_megaxit_title: 'Mega Hit',
        deal_megaxit_desc: 'Hawaii Pizza - 1 pc, Burger - 2 pcs, Fries - 2 pcs, Coca-Cola 0.5 - 2 pcs, Ketchup',
        deal_drinks_title: 'Drinks',
        deal_drinks_desc: 'Cola / Fanta / Sprite 1.5/1 L',
        payment_title: 'Choose Payment Method',
        payment_cash: 'Cash',
        payment_success: 'Thank you for your order! We will contact you for confirmation.',
        payment_processing: 'Redirecting to payment...',
        delivery_choose_title: 'Choose Delivery Partner',
        delivery_call_us: 'or call us directly: <br><strong>+998 (33) 105-10-10</strong>',

        checkout_name: 'Name',
        checkout_name_placeholder: 'Your name',
        checkout_phone: 'Phone',
        checkout_address: 'Delivery address',
        checkout_address_placeholder: 'Street, house, apartment',
        checkout_comment: 'Comment',
        checkout_comment_placeholder: 'Intercom, floor, etc. (optional)',
        checkout_submitting: 'Sending order...',
        checkout_error_required: 'Please fill in name, phone and address.',
        checkout_error_network: 'Could not send the order. Check your connection and try again.',
        checkout_order_number: 'Order number'
    },
    uz: {

        nav_home: 'Bosh sahifa',
        nav_menu: 'Menyu',
        nav_story: 'Biz haqimizda',
        nav_story: 'Biz haqimizda',
        nav_delivery: 'Yetkazib berish',
        nav_deals: 'Aksiyalar',
        

        hero_title: 'Har kuni yangi tayyorlangan asl italyan pitsasi',
        hero_subtitle: 'Premium pitsalarimiz bilan Italiyaning haqiqiy ta\'mini his qiling',
        hero_order: 'Buyurtma berish',
        hero_menu: 'Menyuni ko\'rish',
        pizza_call_text: 'Buyurtma bermoqchimisiz?',
        pizza_call_btn: 'Qo\'ng\'iroq qilib buyurtma bering',
        pizza_add_order: 'Buyurtmaga',
        pizza_added: 'Qo\'shildi',
        order_title: 'Sizning buyurtmangiz',
        order_empty: 'Hozircha bo\'sh. Pitsa va o\'lchamni tanlang, keyin "Buyurtmaga" tugmasini bosing.',
        order_total: 'Jami',
        order_call_btn: 'Qo\'ng\'iroq qilib buyurtma bering',
        sets_title: 'Setlar va kombo',
        sets_subtitle: 'Alohida buyurtma qilishdan foydaliroq',
        drinks_title: 'Ichimliklar',
        drinks_subtitle: 'Pitsangiz uchun salqin ichimliklar',
        quicknav_pizza: 'Pitsa',
        quicknav_sets: 'Setlar',
        quicknav_drinks: 'Ichimliklar',
        

        signature_title: 'Bizning maxsus pitsalarimiz',
        signature_subtitle: 'Mijozlarimiz sevib iste\'mol qiladigan tanlangan pitsalar',
        menu_title: 'To\'liq menyu',
        menu_subtitle: 'Qo\'lda tayyorlangan barcha pitsalarimiz bilan tanishing',
        

        filter_size: 'O\'lcham',
        filter_dietary: 'Xususiyatlar',
        filter_price: 'Narx',
        filter_veg: '🌱 Vegetarian',
        filter_spicy: '🌶️ Achchiq',
        filter_upto: 'Gacha',
        currency: 'so\'m',
        

        cart_title: 'Sizning buyurtmangiz',
        cart_empty: 'Savatingiz bo\'sh',
        cart_subtotal: 'Oraliq jami:',
        cart_delivery: 'Yetkazib berish:',
        cart_free: 'Bepul',
        cart_total: 'Jami:',
        cart_checkout: 'Buyurtma berish',
        cart_remove: 'O\'chirish',
        

        story_title: 'Bizning tariximiz: Ehtiros va An\'analar',
        story_p1: 'American Pizza-da biz ajoyib pitsa ajoyib xamirdan boshlanishiga ishonamiz. Har kuni ertalab bizning mohir novvovlarimiz qadimiy retsept bo\'yicha yangi xamir qorishadi.',
        story_p2: 'Biz faqat eng sara ingredientlardan foydalanamiz: Italiyadan San-Marzano pomidorlari, premium motsarella va yangi sabzavotlar. Sifatga bo\'lgan sadoqatimiz ta\'mda murosasizlikni anglatadi.',
        story_p3: 'An\'anaviy pechimizdan tortib dasturxongacha, har bir pitsa mehr va an\'analarga hurmat bilan tayyorlanadi. Bu shunchaki ovqat emas - bu tajriba.',
        story_f1: 'Har kuni yangi xamir',
        story_f2: 'Asl italyancha retsept',
        story_f3: 'Tosh pechda pishirilgan',
        

        delivery_title: 'Eshigingizgacha tez yetkazib berish',
        delivery_subtitle: 'Toshkent bo\'ylab issiq va yangi pitsa yetkazib beramiz',
        delivery_loc_title: 'Toshkent shahar markazi',
        delivery_time_title: 'Yetkazib berish vaqti',
        delivery_time_val: '30-45 daqiqa',
        delivery_min_title: 'Minimal buyurtma',
        delivery_fee_title: 'Yetkazib berish narxi',
        delivery_free_cond: '100,000 so\'mdan yuqori - Bepul',
        delivery_fee_val: 'Aks holda 10,000 so\'m',
        delivery_contact: 'Biz bilan bog\'lanish',
        delivery_partner_desc: 'Rasmiy yetkazib berish hamkori',
        delivery_order_uzum: 'Uzum orqali buyurtma',


        pizza_from: 'dan',
        pizza_add_cart: 'Buyurtma',
        badge_bestseller: '⭐ Ommabop',
        badge_spicy: '🌶️ Achchiq',
        badge_vegetarian: '🌱 Vegetarian',
        modal_customize: 'Sozlang',
        size_cm: 'sm',
        crust_thin: 'yupqa xamir',
        crust_thick: 'qalin xamir',
        crust_stuffed: 'to\'ldirilgan xamir',
        

        deal_calzone_title: 'Kalzone To\'plami',
        deal_calzone_desc: 'Kalzone - 2 dona, Fri - 2 porsiya, Fanta 0.5 - 2 dona, Ketchup - 2 dona',
        deal_combo2_title: 'Ikki Kishilik Kombo',
        deal_combo2_desc: 'Amerikano 35sm - 1 dona, Coca-Cola 1L - 1 dona, Sous - 2 dona, Kartoshka do\'lkalari - 2 porsiya',
        deal_mega_title: 'Mega Kombo',
        deal_mega_desc: 'Texas, Pennsylvania, Pepperoni pitsalari',
        deal_super_title: 'Super Box',
        deal_super_desc: 'Sezar 30sm - 1 dona, Fri - 2 porsiya, Fanta 0.5 - 2 dona, Ketchup - 2 dona',
        deal_megaxit_title: 'Mega Xit',
        deal_megaxit_desc: 'Gavayi pitsasi - 1 dona, Burger - 2 dona, Fri - 2 dona, Coca-Cola 0.5 - 2 dona, Ketchup',
        deal_drinks_title: 'Ichimliklar',
        deal_drinks_desc: 'Cola / Fanta / Sprite 1.5/1 L',
        payment_title: 'To\'lov turini tanlang',
        payment_cash: 'Naqd pul',
        payment_success: 'Buyurtmangiz uchun rahmat! Tasdiqlash uchun siz bilan bog\'lanamiz.',
        payment_processing: 'To\'lovga o\'tilmoqda...',
        delivery_choose_title: 'Yetkazib berish hamkorini tanlang',
        delivery_call_us: 'yoki to\'g\'ridan-to\'g\'ri qo\'ng\'iroq qiling: <br><strong>+998 (33) 105-10-10</strong>',

        checkout_name: 'Ism',
        checkout_name_placeholder: 'Ismingiz',
        checkout_phone: 'Telefon',
        checkout_address: 'Yetkazib berish manzili',
        checkout_address_placeholder: 'Ko\'cha, uy, xonadon',
        checkout_comment: 'Izoh',
        checkout_comment_placeholder: 'Domofon, qavat va h.k. (ixtiyoriy)',
        checkout_submitting: 'Buyurtma yuborilmoqda...',
        checkout_error_required: 'Ism, telefon va manzilni to\'ldiring.',
        checkout_error_network: 'Buyurtmani yuborib bo\'lmadi. Internetni tekshirib qayta urinib ko\'ring.',
        checkout_order_number: 'Buyurtma raqami'
    }
};


let currentLang = localStorage.getItem('preferredLanguage') || 'ru';
if (!translations[currentLang]) currentLang = 'ru';


const pizzaData = [
    {
        id: 'american-steak',
        name: 'American Steak',
        description: {
            ru: 'Лук шалот, грибы, соус фирменный, сыр моцарелла, помидоры свежие, говядина копчёная, маслины, перец сладкий',
            en: 'Shallots, mushrooms, signature sauce, mozzarella, fresh tomatoes, smoked beef, olives, sweet pepper',
            uz: 'Shallot piyozi, qo\'ziqorinlar, maxsus sous, motsarella, yangi pomidorlar, dudlangan mol go\'shti, zaytun, shirin qalampir'
        },
        prices: { 30: 115000, 35: 135000, 40: 155000 },
        badges: ['bestseller'],
        image: 'images/american_steak.jpg',
        spicy: false,
        vegetarian: false
    },
    {
        id: 'philadelphia',
        name: 'Philadelphia',
        description: {
            ru: 'Соус фирменный, сыр моцарелла, помидоры свежие, говядина копчёная, колбаса копчёная, маслины, перец сладкий',
            en: 'Signature sauce, mozzarella, fresh tomatoes, smoked beef, smoked sausage, olives, sweet pepper',
            uz: 'Maxsus sous, motsarella, yangi pomidorlar, dudlangan mol go\'shti, dudlangan kolbasa, zaytun, shirin qalampir'
        },
        prices: { 30: 115000, 35: 130000, 40: 140000 },
        badges: ['bestseller'],
        image: 'images/philadelphia.jpg',
        spicy: false,
        vegetarian: false
    },
    {
        id: 'las-vegas',
        name: 'Las Vegas',
        description: {
            ru: 'Сыр моцарелла, соус фирменный, колбаса, индейка, говядина, охотничьи колбаски, лук, грибы, маслины, перец сладкий',
            en: 'Mozzarella, signature sauce, sausage, turkey, beef, hunting sausages, onion, mushrooms, olives, sweet pepper',
            uz: 'Motsarella, maxsus sous, kolbasa, kurka, mol go\'shti, ovchi kolbasalari, piyoz, qo\'ziqorinlar, zaytun, shirin qalampir'
        },
        prices: { 30: 100000, 35: 120000, 40: 140000 },
        badges: [],
        image: 'images/las_vegas.jpg',
        spicy: false,
        vegetarian: false
    },
    {
        id: 'new-york',
        name: 'New York',
        description: {
            ru: 'Соус фирменный, сыр моцарелла, лук шалот, грибы, курица, индейка, говядина, огурцы маринованные, помидоры свежие',
            en: 'Signature sauce, mozzarella, shallots, mushrooms, chicken, turkey, beef, pickled cucumbers, fresh tomatoes',
            uz: 'Maxsus sous, motsarella, shallot piyozi, qo\'ziqorinlar, tovuq, kurka, mol go\'shti, tuzlangan bodring, yangi pomidorlar'
        },
        prices: { 30: 90000, 35: 110000, 40: 130000 },
        badges: ['bestseller'],
        image: 'images/new_york.jpg',
        spicy: false,
        vegetarian: false
    },
    {
        id: 'chicago',
        name: 'Chicago',
        description: {
            ru: 'Сыр моцарелла, соус фирменный, курица, индейка, говядина, охотничьи колбаски',
            en: 'Mozzarella, signature sauce, chicken, turkey, beef, hunting sausages',
            uz: 'Motsarella, maxsus sous, tovuq, kurka, mol go\'shti, ovchi kolbasalari'
        },
        prices: { 30: 90000, 35: 110000, 40: 130000 },
        badges: [],
        image: 'images/chicago.jpg',
        spicy: false,
        vegetarian: false
    },
    {
        id: 'margaritta',
        name: 'Margaritta',
        description: {
            ru: 'Сыр моцарелла, соус фирменный, помидоры свежие',
            en: 'Mozzarella, signature sauce, fresh tomatoes',
            uz: 'Motsarella, maxsus sous, yangi pomidorlar'
        },
        prices: { 30: 95000, 35: 105000, 40: 115000 },
        badges: ['vegetarian'],
        image: 'images/margaritta.jpg',
        spicy: false,
        vegetarian: true
    },
    {
        id: 'smurfs',
        name: 'Smurfs',
        description: {
            ru: 'Соус фирменный, колбаса, сыр моцарелла, картофель фри',
            en: 'Signature sauce, sausage, mozzarella, french fries',
            uz: 'Maxsus sous, kolbasa, motsarella, kartoshka fri'
        },
        prices: { 30: 60000, 35: 90000, 40: 110000 },
        badges: [],
        image: 'images/smurfs.jpg',
        spicy: false,
        vegetarian: false
    },
    {
        id: 'ceasar',
        name: 'Ceasar',
        description: {
            ru: 'Сливочный соус, курица, сыр моцарелла, айсберг, черри, соус чесночный, сухарики, перепелиное яйцо, сыр пармезан',
            en: 'Cream sauce, chicken, mozzarella, iceberg lettuce, cherry tomatoes, garlic sauce, croutons, quail egg, parmesan',
            uz: 'Qaymoqli sous, tovuq, motsarella, aysberg, cherri, sarimsoq sousi, suxarilar, bedana tuxumi, parmezan'
        },
        prices: { 30: 100000, 35: 120000, 40: 140000 },
        badges: [],
        image: 'images/ceasar.jpg',
        spicy: false,
        vegetarian: false
    },
    {
        id: 'florida',
        name: 'Florida',
        description: {
            ru: 'Соус фирменный, сыр моцарелла, лосось, маслины, лук шалот, сметана',
            en: 'Signature sauce, mozzarella, salmon, olives, shallots, sour cream',
            uz: 'Maxsus sous, motsarella, losos, zaytun, shallot piyozi, smetana'
        },
        prices: { 30: 115000, 35: 135000, 40: 155000 },
        badges: [],
        image: 'images/florida.jpg',
        spicy: false,
        vegetarian: false
    },
    {
        id: 'texas',
        name: 'Texas',
        description: {
            ru: 'Сыр моцарелла, лук шалот, острый перец халапеньо, охотничьи колбаски, соус фирменный, перец сладкий, помидоры свежие',
            en: 'Mozzarella, shallots, jalapeno peppers, hunting sausages, signature sauce, sweet pepper, fresh tomatoes',
            uz: 'Motsarella, shallot piyozi, xalapenyo, ovchi kolbasalari, maxsus sous, shirin qalampir, yangi pomidorlar'
        },
        prices: { 30: 90000, 35: 100000, 40: 110000 },
        badges: ['spicy'],
        image: 'images/texas.jpg',
        spicy: true,
        vegetarian: false
    },
    {
        id: 'pepperoni',
        name: 'Pepperoni',
        description: {
            ru: 'Сыр моцарелла, соус фирменный, колбаса пепперони',
            en: 'Mozzarella, signature sauce, pepperoni sausage',
            uz: 'Motsarella, maxsus sous, pepperoni kolbasasi'
        },
        prices: { 30: 90000, 35: 110000, 40: 130000 },
        badges: ['bestseller'],
        image: 'images/pepperoni.jpg',
        spicy: false,
        vegetarian: false
    },
    {
        id: 'hawaii',
        name: 'Hawaii',
        description: {
            ru: 'Сыр моцарелла, соус сливочный, курица, ананас',
            en: 'Mozzarella, cream sauce, chicken, pineapple',
            uz: 'Motsarella, qaymoqli sous, tovuq, ananas'
        },
        prices: { 30: 85000, 35: 95000, 40: 105000 },
        badges: [],
        image: 'images/hawaii.jpg',
        spicy: false,
        vegetarian: false
    },
    {
        id: 'pennsylvania',
        name: 'Pennsylvania',
        description: {
            ru: 'Фирменный соус, грибы, сыр моцарелла, помидоры свежие',
            en: 'Signature sauce, mushrooms, mozzarella, fresh tomatoes',
            uz: 'Maxsus sous, qo\'ziqorinlar, motsarella, yangi pomidorlar'
        },
        prices: { 30: 95000, 35: 105000, 40: 115000 },
        badges: ['vegetarian'],
        image: 'images/pennsylvania.jpg',
        spicy: false,
        vegetarian: true
    },
    {
        id: 'cheesy',
        name: 'Cheesy',
        description: {
            ru: 'Сыр моцарелла, соус сливочный, сыр гауда, сыр пармезан, сыр дор блю',
            en: 'Mozzarella, cream sauce, gouda, parmesan, dor blu cheese',
            uz: 'Motsarella, qaymoqli sous, gauda, parmezan, dor blu pishlog\'i'
        },
        prices: { 30: 85000, 35: 95000, 40: 105000 },
        badges: ['vegetarian'],
        image: 'images/cheesy.jpg',
        spicy: false,
        vegetarian: true
    },
    {
        id: 'chicken',
        name: 'Chicken',
        description: {
            ru: 'Соус фирменный, грибы, курица гриль, сыр моцарелла, помидоры свежие, соус чесночный',
            en: 'Signature sauce, mushrooms, grilled chicken, mozzarella, fresh tomatoes, garlic sauce',
            uz: 'Maxsus sous, qo\'ziqorinlar, panjara tovuq, motsarella, yangi pomidorlar, sarimsoq sousi'
        },
        prices: { 30: 95000, 35: 105000, 40: 115000 },
        badges: [],
        image: 'images/chicken.png',
        spicy: false,
        vegetarian: false
    }
];


let currentPizza = null;
let currentCarouselIndex = 0;

/* ==========================================
   FLOATING ORDER LIST (call to order)
   ========================================== */

let orderItems = [];

function addToOrder(item) {
    const existing = orderItems.find(i => i.key === item.key);
    if (existing) {
        existing.qty += 1;
    } else {
        orderItems.push({ ...item, qty: 1 });
    }
    renderOrderPanel();
}

function changeOrderQty(key, delta) {
    const item = orderItems.find(i => i.key === key);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) {
        orderItems = orderItems.filter(i => i.key !== key);
    }
    renderOrderPanel();
}

function removeOrderItem(key) {
    orderItems = orderItems.filter(i => i.key !== key);
    renderOrderPanel();
}

function renderOrderPanel() {
    const listEl = document.getElementById('orderPanelList');
    const totalEl = document.getElementById('orderPanelTotal');
    const countEl = document.getElementById('floatingCartCount');
    const floatingCart = document.getElementById('floatingCart');
    if (!listEl) return;

    const totalQty = orderItems.reduce((sum, i) => sum + i.qty, 0);
    const totalPrice = orderItems.reduce((sum, i) => sum + i.qty * i.price, 0);

    countEl.textContent = totalQty;
    floatingCart.classList.toggle('has-items', totalQty > 0);
    totalEl.textContent = formatPrice(totalPrice);

    if (orderItems.length === 0) {
        listEl.innerHTML = `<p class="order-panel-empty">${t('order_empty')}</p>`;
        return;
    }

    listEl.innerHTML = orderItems.map(item => `
        <div class="order-item">
            <div class="order-item-info">
                <span class="order-item-name">${item.name}</span>
                <span class="order-item-size">${item.size ? item.size + ' см · ' : ''}${formatPrice(item.price)}</span>
            </div>
            <div class="order-item-controls">
                <button type="button" class="qty-btn" data-qty-key="${item.key}" data-delta="-1">−</button>
                <span class="qty-value">${item.qty}</span>
                <button type="button" class="qty-btn" data-qty-key="${item.key}" data-delta="1">+</button>
                <button type="button" class="order-item-remove" data-remove-key="${item.key}">×</button>
            </div>
        </div>
    `).join('');

    listEl.querySelectorAll('.qty-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            changeOrderQty(btn.dataset.qtyKey, Number(btn.dataset.delta));
        });
    });
    listEl.querySelectorAll('.order-item-remove').forEach(btn => {
        btn.addEventListener('click', () => {
            removeOrderItem(btn.dataset.removeKey);
        });
    });
}

function toggleOrderPanel(forceOpen) {
    const panel = document.getElementById('orderPanel');
    const overlay = document.getElementById('orderPanelOverlay');
    const isOpen = typeof forceOpen === 'boolean' ? forceOpen : !panel.classList.contains('open');
    panel.classList.toggle('open', isOpen);
    overlay.classList.toggle('open', isOpen);
    document.body.classList.toggle('modal-open', isOpen);
}

function initializeOrderPanel() {
    document.getElementById('floatingCartBtn')?.addEventListener('click', () => toggleOrderPanel());
    document.getElementById('orderPanelClose')?.addEventListener('click', () => toggleOrderPanel(false));
    document.getElementById('orderPanelOverlay')?.addEventListener('click', () => toggleOrderPanel(false));
    renderOrderPanel();
}



/* ==========================================
   CHECKOUT (submits the order to the FastAPI backend)
   ========================================== */

function showCheckoutMessage(text, kind) {
    const el = document.getElementById('checkoutMessage');
    if (!el) return;
    el.textContent = text;
    el.hidden = false;
    el.classList.remove('checkout-message-error', 'checkout-message-success');
    el.classList.add(kind === 'error' ? 'checkout-message-error' : 'checkout-message-success');
}

function clearCheckoutMessage() {
    const el = document.getElementById('checkoutMessage');
    if (!el) return;
    el.hidden = true;
    el.textContent = '';
    el.classList.remove('checkout-message-error', 'checkout-message-success');
}

function setCheckoutSubmitting(isSubmitting) {
    const btn = document.getElementById('checkoutSubmitBtn');
    if (!btn) return;
    btn.disabled = isSubmitting;
    btn.classList.toggle('is-loading', isSubmitting);
    const label = btn.querySelector('span');
    if (label) {
        label.textContent = isSubmitting ? t('checkout_submitting') : t('cart_checkout');
    }
}

async function submitOrder(event) {
    event.preventDefault();
    clearCheckoutMessage();

    if (orderItems.length === 0) {
        showCheckoutMessage(t('order_empty'), 'error');
        return;
    }

    const nameInput = document.getElementById('checkoutName');
    const phoneInput = document.getElementById('checkoutPhone');
    const addressInput = document.getElementById('checkoutAddress');
    const commentInput = document.getElementById('checkoutComment');
    const paymentInput = document.querySelector('input[name="paymentMethod"]:checked');

    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();
    const address = addressInput.value.trim();
    const comment = commentInput.value.trim();
    const paymentMethod = paymentInput ? paymentInput.value : 'cash';

    if (!name || !phone || !address) {
        showCheckoutMessage(t('checkout_error_required'), 'error');
        return;
    }

    const totalPrice = orderItems.reduce((sum, i) => sum + i.qty * i.price, 0);
    const payload = {
        orderDetails: {
            customer: {
                name,
                phone,
                address,
                comment: comment || null,
                paymentMethod
            },
            items: orderItems.map(item => ({
                id: item.key,
                name: item.size ? `${item.name} (${item.size})` : item.name,
                count: item.qty,
                price: item.price
            })),
            totalPrice
        }
    };

    setCheckoutSubmitting(true);

    try {
        const response = await fetch(`${API_BASE_URL}/api/orders`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error(`Server responded with ${response.status}`);
        }

        const data = await response.json();

        if (paymentMethod !== 'cash' && data.paymentUrl) {
            showCheckoutMessage(t('payment_processing'), 'success');
            window.location.href = data.paymentUrl;
            return;
        }

        // Cash order (or no payment link returned): show success, reset the cart.
        orderItems = [];
        renderOrderPanel();
        document.getElementById('checkoutForm')?.reset();
        showCheckoutMessage(`${t('payment_success')} ${t('checkout_order_number')}: #${data.orderId}`, 'success');
    } catch (err) {
        showCheckoutMessage(t('checkout_error_network'), 'error');
    } finally {
        setCheckoutSubmitting(false);
    }
}

function initializeCheckoutForm() {
    document.getElementById('checkoutForm')?.addEventListener('submit', submitOrder);
}



function initializeDealOrderButtons() {
    document.querySelectorAll('.deal-card[data-deal-id]').forEach(card => {
        const btn = card.querySelector('[data-add-deal]');
        const titleEl = card.querySelector('.deal-title');
        if (!btn || !titleEl) return;

        btn.addEventListener('click', () => {
            addToOrder({
                key: `deal-${card.dataset.dealId}`,
                name: titleEl.textContent.trim(),
                size: '',
                price: Number(card.dataset.dealPrice)
            });

            const label = btn.querySelector('span');
            const originalText = label.textContent;
            label.textContent = t('pizza_added');
            btn.classList.add('added');
            window.setTimeout(() => {
                label.textContent = originalText;
                btn.classList.remove('added');
            }, 1200);
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initializeLanguage();
    initializeMenu();
    initializeScrollEffects();
    initializeOrderPanel();
    initializeCheckoutForm();
    initializeDealOrderButtons();
});




function t(key) {
    return translations[currentLang]?.[key] || translations.en?.[key] || key;
}

function switchLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('preferredLanguage', lang);
    

    document.querySelectorAll('.lang-option').forEach(opt => {
        opt.classList.toggle('active', opt.dataset.lang === lang);
    });
    

    const langText = document.querySelector('.lang-text');
    const langNames = {
        ru: 'Язык',
        en: 'Lang',
        uz: 'Til'
    };
    if (langText) langText.textContent = langNames[lang];
    

    const dropdown = document.querySelector('.language-dropdown');
    dropdown?.classList.remove('active');
    

    updateAllTranslations();
}

function updateAllTranslations() {
    updateNavigationTranslations();
    updateHeroTranslations();
    updateStaticTranslations();
    renderMenuItems(pizzaData);
    updateMobileLanguageUI(currentLang);
    renderOrderPanel();
}

function updateStaticTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const value = t(key);
        if (value !== key) {
            element.textContent = value;
        }
    });

    document.querySelectorAll('[data-i18n-html]').forEach(element => {
        const key = element.getAttribute('data-i18n-html');
        const value = t(key);
        if (value !== key) {
            element.innerHTML = value;
        }
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
        const key = element.getAttribute('data-i18n-placeholder');
        const value = t(key);
        if (value !== key) {
            element.setAttribute('placeholder', value);
        }
    });

    document.documentElement.lang = currentLang;
}

function updateNavigationTranslations() {
    const navLinks = document.querySelectorAll('.nav-link');
    if (navLinks.length < 5) return;
    navLinks[0].textContent = t('nav_home');
    navLinks[1].textContent = t('nav_menu');
    navLinks[2].textContent = t('nav_story');
    navLinks[3].textContent = t('nav_delivery');
    navLinks[4].textContent = t('nav_deals');
}

function updateHeroTranslations() {
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    const heroBtns = document.querySelectorAll('.hero-buttons .btn-primary, .hero-buttons .btn-secondary');
    
    if (heroTitle) heroTitle.textContent = t('hero_title');
    if (heroSubtitle) heroSubtitle.textContent = t('hero_subtitle');
    if (heroBtns[0]) heroBtns[0].textContent = t('hero_order');
    if (heroBtns[1]) heroBtns[1].textContent = t('hero_menu');
}

function initializeLanguage() {

    document.querySelectorAll('.lang-option').forEach(opt => {
        opt.classList.toggle('active', opt.dataset.lang === currentLang);
        opt.addEventListener('click', () => switchLanguage(opt.dataset.lang));
    });
    

    const langText = document.querySelector('.lang-text');
    const langNames = {
        ru: 'Язык',
        en: 'Lang',
        uz: 'Til'
    };
    if (langText) langText.textContent = langNames[currentLang];
    

    const langToggle = document.getElementById('langToggle');
    const dropdown = document.querySelector('.language-dropdown');
    
    langToggle?.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = dropdown?.classList.toggle('active');
        langToggle.setAttribute('aria-expanded', String(Boolean(isOpen)));
    });
    

    document.addEventListener('click', (e) => {
        if (dropdown && !dropdown.contains(e.target)) {
            dropdown.classList.remove('active');
            langToggle?.setAttribute('aria-expanded', 'false');
        }
    });
    

    updateAllTranslations();
}



function initializeMenu() {
    const menuGrid = document.getElementById('menuGrid');
    if (!menuGrid) return;

    renderMenuItems(pizzaData);
}

function renderMenuItems(items) {
    const menuGrid = document.getElementById('menuGrid');
    if (!menuGrid) return;
    menuGrid.innerHTML = '';

    items.forEach(pizza => {
        const card = createPizzaCard(pizza);
        menuGrid.appendChild(card);
    });
}

function createPizzaCard(pizza) {
    const card = document.createElement('div');
    card.className = 'pizza-card';
    card.dataset.pizza = pizza.id;

    const imageHTML = pizza.image 
        ? `<img src="${pizza.image}" alt="${pizza.name}">`
        : `<div class="pizza-placeholder" style="background: ${pizza.gradient};">
             <span class="placeholder-emoji">${pizza.emoji}</span>
           </div>`;

    const badgesHTML = pizza.badges.map(badge => {
        const badgeText = t(`badge_${badge}`);
        return `<span class="badge badge-${badge}">${badgeText}</span>`;
    }).join('');


    const description = typeof pizza.description === 'object' 
        ? (pizza.description[currentLang] || pizza.description.en)
        : pizza.description;

    const sizeKeys = Object.keys(pizza.prices);
    const sizesHTML = sizeKeys.map((size, i) => `
        <button type="button" class="size-btn${i === 0 ? ' active' : ''}" data-size="${size}">${size} см</button>
    `).join('');

    card.innerHTML = `
        <div class="pizza-image">
            ${imageHTML}
            ${badgesHTML ? `<div class="pizza-badges">${badgesHTML}</div>` : ''}
        </div>
        <div class="pizza-info">
            <h3 class="pizza-name">${pizza.name}</h3>
            <p class="pizza-description">${description}</p>
            <div class="pizza-footer">
                <div class="pizza-sizes">${sizesHTML}</div>
                <div class="pizza-order-row">
                    <span class="pizza-price" data-price-for="${pizza.id}">${formatPrice(pizza.prices[sizeKeys[0]])}</span>
                    <button type="button" class="btn-add-order" data-add-for="${pizza.id}">+ ${t('pizza_add_order')}</button>
                </div>
            </div>
        </div>
    `;

    const priceEl = card.querySelector(`[data-price-for="${pizza.id}"]`);
    const addBtn = card.querySelector(`[data-add-for="${pizza.id}"]`);
    let selectedSize = sizeKeys[0];

    card.querySelectorAll('.size-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            card.querySelectorAll('.size-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedSize = btn.dataset.size;
            priceEl.textContent = formatPrice(pizza.prices[selectedSize]);
        });
    });

    addBtn.addEventListener('click', () => {
        addToOrder({
            key: `${pizza.id}-${selectedSize}`,
            name: pizza.name,
            size: selectedSize,
            price: pizza.prices[selectedSize]
        });

        addBtn.textContent = `✓ ${t('pizza_added')}`;
        addBtn.classList.add('added');
        window.setTimeout(() => {
            addBtn.textContent = `+ ${t('pizza_add_order')}`;
            addBtn.classList.remove('added');
        }, 1200);
    });

    return card;
}











function initializeCarousel() {
    const track = document.getElementById('reviewsTrack');
    if (!track) return;

    const cards = track.children.length;
    const dotsContainer = document.getElementById('carouselDots');

    for (let i = 0; i < cards - 2; i++) {
        const dot = document.createElement('div');
        dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
        dot.onclick = () => goToSlide(i);
        dotsContainer.appendChild(dot);
    }

    setInterval(() => {
        moveCarousel(1);
    }, 5000);
}

function moveCarousel(direction) {
    const track = document.getElementById('reviewsTrack');
    const cards = track.children;
    const maxIndex = cards.length - 3;

    currentCarouselIndex += direction;

    if (currentCarouselIndex < 0) {
        currentCarouselIndex = maxIndex;
    } else if (currentCarouselIndex > maxIndex) {
        currentCarouselIndex = 0;
    }

    const offset = -currentCarouselIndex * (cards[0].offsetWidth + 16);
    track.style.transform = `translateX(${offset}px)`;

    updateCarouselDots();
}

function goToSlide(index) {
    const track = document.getElementById('reviewsTrack');
    const cards = track.children;
    
    currentCarouselIndex = index;
    const offset = -currentCarouselIndex * (cards[0].offsetWidth + 16);
    track.style.transform = `translateX(${offset}px)`;

    updateCarouselDots();
}

function updateCarouselDots() {
    const dots = document.querySelectorAll('.carousel-dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentCarouselIndex);
    });
}



function initializeScrollEffects() {
    const header = document.getElementById('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    });

    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const quickNavLinks = document.querySelectorAll('.quick-nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });

        quickNavLinks.forEach(link => {
            link.classList.toggle('active', link.dataset.target === current);
        });
    });
}

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        const headerHeight = 70;
        const targetPosition = section.offsetTop - headerHeight;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
}


function formatPrice(price) {
    return Number(price).toLocaleString('ru-RU') + ' ' + t('currency');
}


/* ==========================================
   MOBILE SIDE MENU
   ========================================== */

const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileSideMenu = document.getElementById('mobileSideMenu');
const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
const mobileMenuClose = document.getElementById('mobileMenuClose');

function openMobileMenu() {
    if (!mobileSideMenu) return;

    mobileSideMenu.classList.add('active');
    mobileMenuOverlay?.classList.add('active');

    document.body.classList.add('mobile-menu-open');

    if (mobileMenuBtn) {
        mobileMenuBtn.setAttribute('aria-expanded', 'true');
        mobileMenuBtn.classList.add('active');
    }
}

function closeMobileMenu() {
    if (!mobileSideMenu) return;

    mobileSideMenu.classList.remove('active');
    mobileMenuOverlay?.classList.remove('active');

    document.body.classList.remove('mobile-menu-open');

    if (mobileMenuBtn) {
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
        mobileMenuBtn.classList.remove('active');
    }
}

function toggleMobileMenu() {
    if (mobileSideMenu?.classList.contains('active')) {
        closeMobileMenu();
    } else {
        openMobileMenu();
    }
}


/* Hamburger */

mobileMenuBtn?.addEventListener('click', toggleMobileMenu);


/* X button */

mobileMenuClose?.addEventListener('click', closeMobileMenu);


/* Dark overlay */

mobileMenuOverlay?.addEventListener('click', closeMobileMenu);


/* Navigation links */

document.querySelectorAll('.mobile-side-link').forEach(link => {
    link.addEventListener('click', () => {
        closeMobileMenu();
    });
});


/* Escape */

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeMobileMenu();
    }
});


/* ==========================================
   MOBILE LANGUAGE SWITCHER
   ========================================== */

const mobileLanguageButtons = document.querySelectorAll(
    '#mobileLanguageSelector [data-lang]'
);

function updateMobileLanguageUI(lang) {
    mobileLanguageButtons.forEach(button => {
        button.classList.toggle(
            'active',
            button.dataset.lang === lang
        );
        button.setAttribute('aria-pressed', String(button.dataset.lang === lang));
    });
}

mobileLanguageButtons.forEach(button => {
    button.addEventListener('click', () => {
        const lang = button.dataset.lang;

        if (!lang) return;

        // Use the SAME language system as desktop
        switchLanguage(lang);

        // Update active state in mobile drawer
        updateMobileLanguageUI(lang);
    });
});