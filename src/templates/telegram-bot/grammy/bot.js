import { Bot } from "grammy";
import dotenv from "dotenv";
import { startCommand } from "./handlers/start.js";
import { helpCommand } from "./handlers/help.js";
import { messageHandler } from "./handlers/message.js";
import { loggerMiddleware } from "./middlewares/logger.js";

dotenv.config();

const bot = new Bot(process.env.BOT_TOKEN);

// Middlewares
bot.use(loggerMiddleware);

// Commands
bot.command("start", startCommand);
bot.command("help", helpCommand);

// Handlers
bot.on("message", messageHandler);

// Start bot
bot.start();
console.log("🚀 grammY Bot (Clean Architecture) is running...");
