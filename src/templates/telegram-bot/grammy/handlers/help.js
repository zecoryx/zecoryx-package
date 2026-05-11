export const helpCommand = async (ctx) => {
  await ctx.reply(
    "Yordam kerakmi? Quyidagi buyruqlarni ko'rib chiqing:\n/start - Botni ishga tushirish\n/help - Yordam",
  );
};
