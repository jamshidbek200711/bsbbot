const TelegramBot = require('node-telegram-bot-api');
const token = '7802625373:AAFKEoLo-a4ODuKDlNni0p_38dqTpgwgR5M'; // O'zingizning tokeningizni yozing
const bot = new TelegramBot(token, { polling: true });

// Boshlang'ich inline tugmalar
const subjects = [
  [{ text: 'Adabiyot', callback_data: 'adabiyot' }, { text: 'Algebra', callback_data: 'algebra' }],
  [{ text: 'Astronomiya', callback_data: 'astronomiya' }, { text: 'Biologiya', callback_data: 'biologiya' }],
  [{ text: 'ChQBT', callback_data: 'chqbt' }, { text: 'Davlat va huquq asoslari', callback_data: 'davlat_huquq' }],
  [{ text: 'Fizika', callback_data: 'fizika' }, { text: 'Fransuz tili', callback_data: 'fransuz' }],
  [{ text: 'Geometriya', callback_data: 'geometriya' }, { text: 'Informatika', callback_data: 'informatika' }],
  [{ text: 'Ingliz tili', callback_data: 'ingliz' }, { text: 'Jahon tarixi', callback_data: 'jahon_tarixi' }],
  [{ text: 'Jismoniy tarbiya', callback_data: 'jismoniy' }, { text: 'Kimyo', callback_data: 'kimyo' }],
  [{ text: 'Nemis tili', callback_data: 'nemis' }, { text: 'Ona tili', callback_data: 'ona_tili' }],
  [{ text: 'O\'zbekiston tarixi', callback_data: 'uzbekiston_tarixi' }, { text: 'Rus tili', callback_data: 'rus' }],
  [{ text: 'Tadbirkorlik asoslari', callback_data: 'tadbirkorlik' }, { text: 'Tarbiya', callback_data: 'tarbiya' }]
];

// Har bir fan uchun linklar
const links = {
  adabiyot: 'https://sor-soch.com/bsb.php?cat=118',
  algebra: 'https://sor-soch.com/bsb.php?cat=107',
  astronomiya: 'https://sor-soch.com/bsb.php?cat=274',
  biologiya: 'https://sor-soch.com/bsb.php?cat=109',
  chqbt: 'https://sor-soch.com/bsb.php?cat=115',
  davlat_huquq: 'https://sor-soch.com/bsb.php?cat=116',
  fizika: 'https://sor-soch.com/bsb.php?cat=222',
  fransuz: 'https://sor-soch.com/bsb.php?cat=249',
  geometriya: 'https://sor-soch.com/bsb.php?cat=112',
  informatika: 'https://sor-soch.com/bsb.php?cat=113',
  ingliz: 'https://sor-soch.com/bsb.php?cat=108',
  jahon_tarixi: 'https://sor-soch.com/bsb.php?cat=111',
  jismoniy: 'https://sor-soch.com/bsb.php?cat=119',
  kimyo: 'https://sor-soch.com/bsb.php?cat=120',
  nemis: 'https://sor-soch.com/bsb.php?cat=263',
  ona_tili: 'https://sor-soch.com/bsb.php?cat=267',
  uzbekiston_tarixi: 'https://sor-soch.com/bsb.php?cat=114',
  rus: 'https://sor-soch.com/bsb.php?cat=268',
  tadbirkorlik: 'https://sor-soch.com/bsb.php?cat=117',
  tarbiya: 'https://sor-soch.com/bsb.php?cat=110'
};

// /start komandasi bo'yicha bot inline tugmalarni jo'natadi
function sendSubjectOptions(chatId) {
  bot.sendMessage(chatId, 'Fanni tanlang:', {
    reply_markup: {
      inline_keyboard: subjects
    }
  });
}

// Botga foydalanuvchi xabar yuborganida trigger bo'ladi
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  
  // Agar foydalanuvchi /start deb yozsa, faqat u holda fanni tanlash tugmachalarini ko'rsatamiz
  if (msg.text === '/start') {
    sendSubjectOptions(chatId);
  } else {
    bot.sendMessage(chatId, 'Iltimos, fanni tanlash uchun /start deb yozing.');
  }
});

// Callback query uchun listener
bot.on('callback_query', (query) => {
  const chatId = query.message.chat.id;

  // Tugmalarni tozalash
  bot.editMessageReplyMarkup({ inline_keyboard: [] }, { chat_id: chatId, message_id: query.message.message_id });

  // Fanni tanlaganda tegishli link yuboriladi
  if (links[query.data]) {
    bot.sendMessage(chatId, `${links[query.data]}`);
  }
});

// Botni ishga tushirish
console.log("Bot ishga tushdi!");
