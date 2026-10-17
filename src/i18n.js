export const translations = {
  ru: {
    nav: { home: 'Главная', about: 'Обо мне', skills: 'Навыки', projects: 'Проекты', reviews: 'Отзывы' },
    hero: {
      greeting: 'Привет, я',
      name: 'Mustafo Murtazaev',
      role: 'Full Stack-разработчик',
      subtitle: 'Учусь на Full Stack-разработчика и делаю интерфейсы, которые одинаково хорошо выглядят и работают.',
      cta: 'Связаться',
    },
    home: {
      featured: 'Избранные проекты',
      viewAll: 'Все проекты →',
      stats: [
        { value: '2', label: 'Проекта в работе' },
        { value: '10+', label: 'Технологий' },
        { value: '3', label: 'Языка' },
      ],
    },
    info: {
      title: 'Обо мне',
      items: [
        { title: 'Образование', text: 'Najot Talim, курс Full Stack Development' },
        { title: 'Языки', tags: ['UZ — родной', 'RU — почти родной', 'EN — B2'] },
        { title: 'Опыт', text: 'Учебные и личные проекты на React и Node.js.' },
        { title: 'Интересы', tags: ['Футбол', 'Баскетбол', 'Настольный теннис'] },
      ],
    },
    skills: {
      title: 'Навыки',
      hint: 'Каждый навык — планета. Наведи на неё, чтобы остановить и рассмотреть.',
    },
    projects: {
      title: 'Проекты',
      card: 'Скоро',
      list: [
        { name: 'TaskFlow', desc: 'Приложение для управления задачами.', stack: 'React', url: 'https://taskflowtools.netlify.app' },
        { name: 'Gastro Shef', desc: 'Сайт кулинарного проекта.', stack: 'React', url: 'https://gastro-shef.netlify.app' },
      ],
    },
    reviews: {
      title: 'Отзывы',
      hint: 'Рекрутер или наниматель? Оставь отзыв, он появится ниже.',
      empty: 'Пока отзывов нет. Будь первым.',
      form: {
        name: 'Имя',
        company: 'Компания',
        message: 'Сообщение',
        rating: 'Оценка',
        submit: 'Отправить',
        ok: 'Спасибо, отзыв добавлен!',
        err: 'Заполни имя и сообщение',
      },
    },
    contact: {
      title: 'Давайте работать вместе',
      text: 'Пишите, отвечу в течение дня.',
      mail: 'Написать на почту',
    },
    notFound: { title: 'Страница не найдена', back: 'На главную' },
    softSkills: {
      title: 'Soft skills',
      items: [
        { name: 'Problem-solving', desc: 'Разбираю задачу по частям и ищу причину, а не симптом.' },
        { name: 'Adaptive', desc: 'Быстро осваиваю новые инструменты и меняю подход, если нужно.' },
        { name: 'Communicative', desc: 'Понятно объясняю решения команде и заказчику.' },
        { name: 'Hard-work', desc: 'Довожу задачи до конца, даже когда это непросто.' },
      ],
    },
    process: {
      title: 'Как я работаю',
      steps: [
        { name: 'Понимаю задачу', desc: 'Уточняю цель, смотрю на ограничения и составляю план.' },
        { name: 'Строю прототип', desc: 'Быстро собираю рабочую версию, чтобы увидеть проблемы заранее.' },
        { name: 'Тестирую и дорабатываю', desc: 'Проверяю на разных экранах и устройствах, затем полирую.' },
      ],
    },
    terminal: {
      title: 'Терминал',
      intro: 'Привет! Это мой терминал. Напиши help, чтобы увидеть команды.',
      placeholder: 'help — список команд',
      unknown: 'Команда не найдена. Попробуй help.',
      commands: {
        help: 'Команды: whoami, skills, projects, contact, clear',
        whoami: 'Mustafo Murtazaev — Full Stack-разработчик. Учусь в Najot Talim.',
        skills: 'HTML, CSS, JavaScript, React, TypeScript, Node.js, Express, NestJS, MongoDB, PostgreSQL, Tailwind',
        projects: 'TaskFlow — taskflowtools.netlify.app\nGastro Shef — gastro-shef.netlify.app',
        contact: 'mustafomurtazaev7@gmail.com',
        'sudo hire': 'Доступ разрешён. Пиши на mustafomurtazaev7@gmail.com или в Telegram: t.me/mustafoprog',
      },
    },
    timeline: {
      title: 'Путь',
      items: [
        { label: 'Сейчас', text: 'Full Stack-курс в Najot Talim. Учебные проекты TaskFlow и Gastro Shef.' },
        { label: 'Ближайшее', text: 'Telegram copy и Netflix copy. Каждый проект с реальными функциями и деплоем.' },
        { label: 'Цель', text: 'Работа Full Stack-разработчиком, где можно строить продукты от идеи до релиза.' },
      ],
    },
    easter: 'Ты нашёл пасхалку! 🎉',
    chat: {
      open: 'Спроси обо мне',
      title: 'Ассистент',
      intro: 'Задай вопрос обо мне: стек, проекты, контакты.',
      placeholder: 'Напиши вопрос...',
      send: 'Отправить',
      thinking: 'Думаю...',
      error: 'Ассистент сейчас недоступен. Напиши на почту mustafomurtazaev7@gmail.com',
      suggestions: ['Какой у тебя стек?', 'Что за проекты?', 'Как с тобой связаться?'],
    },
    footer: { rights: 'Все права защищены' },
  },

  uz: {
    nav: { home: 'Asosiy', about: 'Men haqimda', skills: "Ko'nikmalar", projects: 'Loyihalar', reviews: 'Sharhlar' },
    hero: {
      greeting: 'Salom, men',
      name: 'Mustafo Murtazaev',
      role: 'Full Stack dasturchi',
      subtitle: "Full Stack dasturchi bo'lib o'qiyman va chiroyli hamda tez ishlaydigan interfeyslar yarataman.",
      cta: "Bog'lanish",
    },
    home: {
      featured: 'Tanlangan loyihalar',
      viewAll: 'Barcha loyihalar →',
      stats: [
        { value: '2', label: 'Ishdagi loyiha' },
        { value: '10+', label: 'Texnologiya' },
        { value: '3', label: 'Til' },
      ],
    },
    info: {
      title: 'Men haqimda',
      items: [
        { title: "Ta'lim", text: "Najot Ta'lim, Full Stack Development kursi" },
        { title: 'Tillar', tags: ['UZ — ona tili', 'RU — deyarli ona tili', 'EN — B2'] },
        { title: 'Tajriba', text: "React va Node.js bo'yicha o'quv va shaxsiy loyihalar." },
        { title: 'Qiziqishlar', tags: ['Futbol', 'Basketbol', 'Stol tennisi'] },
      ],
    },
    skills: {
      title: "Ko'nikmalar",
      hint: "Har bir ko'nikma — sayyora. Ustiga olib boring, to'xtatib ko'ring.",
    },
    projects: {
      title: 'Loyihalar',
      card: 'Tez orada',
      list: [
        { name: 'TaskFlow', desc: 'Vazifalarni boshqarish ilovasi.', stack: 'React', url: 'https://taskflowtools.netlify.app' },
        { name: 'Gastro Shef', desc: 'Oshxona loyihasi sayti.', stack: 'React', url: 'https://gastro-shef.netlify.app' },
      ],
    },
    reviews: {
      title: 'Sharhlar',
      hint: 'Rekruter yoki ish beruvchimisiz? Sharh qoldiring, u pastda chiqadi.',
      empty: "Hozircha sharhlar yo'q. Birinchi bo'ling.",
      form: {
        name: 'Ism',
        company: 'Kompaniya',
        message: 'Xabar',
        rating: 'Baho',
        submit: 'Yuborish',
        ok: "Rahmat, sharh qo'shildi!",
        err: 'Ism va xabarni to\'ldiring',
      },
    },
    contact: {
      title: 'Birgalikda ishlaymizmi?',
      text: 'Yozing, kun davomida javob beraman.',
      mail: 'Pochtaga yozish',
    },
    notFound: { title: 'Sahifa topilmadi', back: 'Asosiy sahifaga' },
    softSkills: {
      title: 'Soft skills',
      items: [
        { name: 'Problem-solving', desc: "Muammoni bo'laklarga bo'laman va sababini izlayman, belgisini emas." },
        { name: 'Adaptive', desc: "Yangi vositalarni tez o'zlashtiraman va kerak bo'lsa yondashuvni o'zgartiraman." },
        { name: 'Communicative', desc: "Yechimlarni jamoaga va buyurtmachiga tushunarli tushuntiraman." },
        { name: 'Hard-work', desc: "Qiyin bo'lsa ham vazifalarni oxirigacha yetkazaman." },
      ],
    },
    process: {
      title: 'Men qanday ishlayman',
      steps: [
        { name: 'Vazifani tushunaman', desc: "Maqsadni aniqlayman, cheklovlarni ko'rib, reja tuzaman." },
        { name: 'Prototip yasayman', desc: "Tezda ishlaydigan versiyani yig'aman, muammolarni oldindan ko'raman." },
        { name: 'Sinayman va yakunlayman', desc: "Turli ekran va qurilmalarda tekshirib, silliqlayman." },
      ],
    },
    terminal: {
      title: 'Terminal',
      intro: "Salom! Bu mening terminalim. Buyruqlarni ko'rish uchun help yozing.",
      placeholder: "help — buyruqlar ro'yxati",
      unknown: "Buyruq topilmadi. help ni sinab ko'ring.",
      commands: {
        help: 'Buyruqlar: whoami, skills, projects, contact, clear',
        whoami: "Mustafo Murtazaev — Full Stack dasturchi. Najot Ta'limda o'qiyman.",
        skills: 'HTML, CSS, JavaScript, React, TypeScript, Node.js, Express, NestJS, MongoDB, PostgreSQL, Tailwind',
        projects: 'TaskFlow — taskflowtools.netlify.app\nGastro Shef — gastro-shef.netlify.app',
        contact: 'mustafomurtazaev7@gmail.com',
        'sudo hire': "Ajoyib tanlov! Mustafomurtazaev7@gmail.com ga yozing yoki Telegram: t.me/mustafoprog",
      },
    },
    timeline: {
      title: "Yo'l",
      items: [
        { label: 'Hozir', text: "Najot Ta'limda Full Stack kursi. TaskFlow va Gastro Shef o'quv loyihalari." },
        { label: 'Yaqinda', text: "Telegram copy va Netflix copy. Har bir loyiha haqiqiy funksiyalar va deploy bilan." },
        { label: 'Maqsad', text: "G'oyadan relizgacha mahsulot quradigan Full Stack dasturchi sifatida ish." },
      ],
    },
    easter: "Pasxalka topdingiz! 🎉",
    chat: {
      open: "Men haqimda so'rang",
      title: 'Yordamchi',
      intro: "Men haqimda savol bering: texnologiyalar, loyihalar, aloqa.",
      placeholder: 'Savolingizni yozing...',
      send: 'Yuborish',
      thinking: 'Javob tayyorlanmoqda...',
      error: "Yordamchi hozir ishlamayapti. mustafomurtazaev7@gmail.com ga yozing",
      suggestions: ["Qaysi texnologiyalarni bilasiz?", 'Qanday loyihalar bor?', "Qanday bog'lanish mumkin?"],
    },
    footer: { rights: 'Barcha huquqlar himoyalangan' },
  },

  en: {
    nav: { home: 'Home', about: 'About me', skills: 'Skills', projects: 'Projects', reviews: 'Reviews' },
    hero: {
      greeting: "Hi, I'm",
      name: 'Mustafo Murtazaev',
      role: 'Full Stack Developer',
      subtitle: 'I am learning Full Stack development and building interfaces that look and work equally well.',
      cta: 'Get in touch',
    },
    home: {
      featured: 'Featured projects',
      viewAll: 'All projects →',
      stats: [
        { value: '2', label: 'Projects in progress' },
        { value: '10+', label: 'Technologies' },
        { value: '3', label: 'Languages' },
      ],
    },
    info: {
      title: 'About me',
      items: [
        { title: 'Education', text: 'Najot Talim, Full Stack Development course' },
        { title: 'Languages', tags: ['UZ — Native', 'RU — Almost native', 'EN — B2'] },
        { title: 'Experience', text: 'Learning projects and personal work with React and Node.js.' },
        { title: 'Interests', tags: ['Football', 'Basketball', 'Ping pong'] },
      ],
    },
    skills: {
      title: 'Skills',
      hint: 'Every skill is a planet. Hover over one to stop it and take a closer look.',
    },
    projects: {
      title: 'Projects',
      card: 'Coming soon',
      list: [
        { name: 'TaskFlow', desc: 'Task management app.', stack: 'React', url: 'https://taskflowtools.netlify.app' },
        { name: 'Gastro Shef', desc: 'Culinary project website.', stack: 'React', url: 'https://gastro-shef.netlify.app' },
      ],
    },
    reviews: {
      title: 'Reviews',
      hint: 'Recruiter or hiring manager? Leave a review and it will appear below.',
      empty: 'No reviews yet. Be the first.',
      form: {
        name: 'Name',
        company: 'Company',
        message: 'Message',
        rating: 'Rating',
        submit: 'Send',
        ok: 'Thanks, your review was added!',
        err: 'Please fill in your name and message',
      },
    },
    contact: {
      title: "Let's work together",
      text: 'Write to me, I reply within a day.',
      mail: 'Send an email',
    },
    notFound: { title: 'Page not found', back: 'Back to home' },
    softSkills: {
      title: 'Soft skills',
      items: [
        { name: 'Problem-solving', desc: 'I break problems into parts and look for the cause, not the symptom.' },
        { name: 'Adaptive', desc: 'I pick up new tools quickly and change my approach when needed.' },
        { name: 'Communicative', desc: 'I explain decisions clearly to the team and to clients.' },
        { name: 'Hard-work', desc: 'I finish what I start, even when it gets hard.' },
      ],
    },
    process: {
      title: 'How I work',
      steps: [
        { name: 'Understand the task', desc: 'I clarify the goal, check the constraints and make a plan.' },
        { name: 'Build a prototype', desc: 'I build a working version quickly to catch problems early.' },
        { name: 'Test and refine', desc: 'I test on different screens and devices, then polish.' },
      ],
    },
    terminal: {
      title: 'Terminal',
      intro: 'Hi! This is my terminal. Type help to see the commands.',
      placeholder: 'help — list of commands',
      unknown: 'Command not found. Try help.',
      commands: {
        help: 'Commands: whoami, skills, projects, contact, clear',
        whoami: 'Mustafo Murtazaev — Full Stack Developer. Studying at Najot Talim.',
        skills: 'HTML, CSS, JavaScript, React, TypeScript, Node.js, Express, NestJS, MongoDB, PostgreSQL, Tailwind',
        projects: 'TaskFlow — taskflowtools.netlify.app\nGastro Shef — gastro-shef.netlify.app',
        contact: 'mustafomurtazaev7@gmail.com',
        'sudo hire': 'Access granted. Write to mustafomurtazaev7@gmail.com or on Telegram: t.me/mustafoprog',
      },
    },
    timeline: {
      title: 'Path',
      items: [
        { label: 'Now', text: 'Full Stack course at Najot Talim. Learning projects: TaskFlow and Gastro Shef.' },
        { label: 'Next', text: 'Telegram copy and Netflix copy. Each project with real features and deployment.' },
        { label: 'Goal', text: 'A Full Stack role where I can build products from idea to release.' },
      ],
    },
    easter: 'You found an easter egg! 🎉',
    chat: {
      open: 'Ask about me',
      title: 'Assistant',
      intro: 'Ask me anything about my stack, projects or contacts.',
      placeholder: 'Type your question...',
      send: 'Send',
      thinking: 'Thinking...',
      error: 'The assistant is unavailable right now. Write to mustafomurtazaev7@gmail.com',
      suggestions: ['What is your stack?', 'What projects do you have?', 'How can I contact you?'],
    },
    footer: { rights: 'All rights reserved' },
  },
};
