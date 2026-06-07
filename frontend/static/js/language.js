// 1. Markaziy lug'at (Kalitlarni HTMLdagilar bilan mosladim)
const i18nData = {
    "uz": {
        "telegram": "Telegram",
        "Opensource": "OpenSource",
        "login": "Kirish",
        "register": "Ro'yxatdan o'tish",
        "qollanmalar": "Sun'iy intellekt modellar uchun qo'llanmalar",
        "aloqa": "Mijozlar bilan aloqa qilish uchun zamonaviy yechimlar",
        "description": "CRYPTON-AI, sizga Hacking, OSINT, Malware tahlil va boshqa sohalarda yordam beradi.",
        "donate": "AI rivoji uchun donat tugma.",
        "meet_customers": "Mijozlarimiz bilan tanishing",
        "questions": "Tez-tez beriladigan savollar",
        "models": "Modellar haqida ma'lumot",
        "ok": "Tushunarli",
        "cancel": "Bekor qilish"
    },
    "en": {
        "telegram": "Telegram",
        "Opensource": "OpenSource",
        "login": "Login",
        "register": "Register",
        "qollanmalar": "Guides for AI models",
        "aloqa": "Modern solutions for customer contact",
        "description": "CRYPTON-AI is a powerful platform for Hacking, OSINT, and Malware analysis.",
        "donate": "Donate for AI development.",
        "meet_customers": "Meet Our Customers",
        "questions": "FAQ",
        "models": "Information about models",
        "ok": "OK",
        "cancel": "Cancel"
    },
    "ru": {
        "telegram": "Телеграм",
        "Opensource": "OpenSource",
        "login": "Вход",
        "register": "Регистрация",
        "qollanmalar": "Руководства по ИИ",
        "aloqa": "Решения для связи",
        "description": "CRYPTON-AI — платформа для хакинга, OSINT и анализа вредоносного ПО.",
        "donate": "Донат для развития ИИ.",
        "meet_customers": "Наши клиенты",
        "questions": "Часто задаваемые вопросы",
        "models": "Информация о моделях",
        "ok": "Понятно",
        "cancel": "Отмена"
    }
};

// 2. Matnlarni yangilash funksiyasi
function updateTexts(langCode) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (i18nData[langCode] && i18nData[langCode][key]) {
            el.innerHTML = i18nData[langCode][key];
        }
    });
}

// 3. Tilni o'zgartirish funksiyasi (Tugmalar uchun)
function changeLang(langCode, flag) {
    updateTexts(langCode);
    
    // UI elementlarini yangilash
    if(document.getElementById('currentFlag')) document.getElementById('currentFlag').innerText = flag;
    if(document.getElementById('currentText')) document.getElementById('currentText').innerText = langCode.toUpperCase();

    // Brauzer xotirasiga saqlash
    localStorage.setItem('selectedLang', langCode);
    localStorage.setItem('selectedFlag', flag);
    
    // Menyuni yopish
    const langMenu = document.getElementById('langMenu');
    if (langMenu) langMenu.classList.remove('show');
}

// 4. Sahifa yuklanganda ishga tushadigan qism
document.addEventListener('DOMContentLoaded', () => {
    const langBtn = document.getElementById('langBtn');
    const langMenu = document.getElementById('langMenu');

    // --- 1. Tilni yuklash ---
    const savedLang = localStorage.getItem('selectedLang') || 'uz';
    const savedFlag = localStorage.getItem('selectedFlag') || '🇺🇿';
    
    // Dastlabki matnlarni chiqarish
    updateTexts(savedLang);
    if(document.getElementById('currentFlag')) document.getElementById('currentFlag').innerText = savedFlag;
    if(document.getElementById('currentText')) document.getElementById('currentText').innerText = savedLang.toUpperCase();

    // --- 2. Menyu ochish/yopish ---
langBtn.onclick = function(e) {
    e.preventDefault();
    e.stopPropagation();
    
    // Menyu holatini o'zgartirish
    langMenu.classList.toggle('show');
    
    // DEBUG: Konsolda tekshirish (F12 ni bosib qara)
    if (langMenu.classList.contains('show')) {
        console.log("MENYU HOZIR KO'RINISHI KERAK!");
        console.log("Menyu stili:", getComputedStyle(langMenu).display);
    }
};

    // --- 3. Tashqariga bosilganda yopish ---
    window.onclick = function(event) {
        if (langMenu && langMenu.classList.contains('show')) {
            if (!langBtn.contains(event.target) && !langMenu.contains(event.target)) {
                langMenu.classList.remove('show');
            }
        }
    };
});