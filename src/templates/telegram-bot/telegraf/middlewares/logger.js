export const loggerMiddleware = async (ctx, next) => {
  console.log(
    `[${new Date().toISOString()}] Update from ${ctx.from.username || ctx.from.id}`,
  );
  return next();
};
