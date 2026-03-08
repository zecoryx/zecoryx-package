export const startCommand = (bot, msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(
    chatId,
    "Assalomu alaykum! NTBA orqali yaratilgan botga xush kelibsiz.",
  );
};
