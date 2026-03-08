import { Bot } from "grammy";
import dotenv from "dotenv";
import { startCommand } from "./commands/start.js";
import { helpCommand } from "./commands/help.js";
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
