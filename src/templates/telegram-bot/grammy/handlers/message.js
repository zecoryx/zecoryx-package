import * as botService from "../core/services/bot.service.js";

export const messageHandler = async (ctx) => {
  const echo = botService.formatEchoMessage(ctx.message.text);
  await ctx.reply(echo);
};
