export const messageHandler = (bot, msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, `Siz yozdingiz: ${msg.text}`);
};
