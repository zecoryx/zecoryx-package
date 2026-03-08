import * as botService from "../core/services/bot.service.js";

export const startCommand = async (ctx) => {
  const message = botService.getWelcomeMessage(ctx.from);
  await ctx.reply(message);
};
