export const loggerMiddleware = async (ctx, next) => {
  console.log(
    `[${new Date().toISOString()}] New update from ${ctx.from?.username || ctx.from?.id}`,
  );
  await next();
};
