import { Telegraf } from "telegraf";
import dotenv from "dotenv";
import { startCommand } from "./commands/start.js";
import { messageHandler } from "./handlers/message.js";
import { loggerMiddleware } from "./middlewares/logger.js";

dotenv.config();

const bot = new Telegraf(process.env.BOT_TOKEN);

// Middlewares
bot.use(loggerMiddleware);

// Actions
bot.start(startCommand);
bot.on("text", messageHandler);

bot.launch().then(() => {
  console.log("🚀 Telegraf Bot (Clean Architecture) is running...");
});

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
