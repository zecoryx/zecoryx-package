import TelegramBot from "node-telegram-bot-api";
import dotenv from "dotenv";
import { startCommand } from "./commands/start.js";
import { messageHandler } from "./handlers/message.js";

dotenv.config();

const token = process.env.BOT_TOKEN;
const bot = new TelegramBot(token, { polling: true });

// Listen for start command
bot.onText(/\/start/, (msg) => startCommand(bot, msg));

// Listen for any text messages
bot.on("message", (msg) => {
  if (msg.text && !msg.text.startsWith("/")) {
    messageHandler(bot, msg);
  }
});

console.log("🚀 NTBA Bot (Simple Architecture) is running...");
