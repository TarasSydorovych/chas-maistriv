
const channelId = '-1001865626987';

const express = require('express');
const bodyParser = require('body-parser');
const TelegramBot = require('node-telegram-bot-api');

const app = express();
const port = 4000;

// Налаштування парсера JSON
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});
// Ваш токен бота Telegram
const botToken = '6266005117:AAHxzv2HFvvbNQ1CkPCumJg7tvPGDdNPusY';
const bot = new TelegramBot(botToken, { polling: true });
app.use(express.json());
app.get('/api/getTelegramAuthURL', (req, res) => {
  // Ваш код для отримання URL автентифікації Telegram
  const authURL = 'https://telegram.org/dl';

  res.json({ authURL });
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер запущений на порті ${port}`);
});