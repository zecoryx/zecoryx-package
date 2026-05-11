export const getWelcomeMessage = (user) => {
  const name = user.first_name || "foydalanuvchi";
  return `Assalomu alaykum, ${name}! Zecoryx CLI (grammY + Clean Architecture) orqali yaratilgan botga xush kelibsiz.`;
};

export const formatEchoMessage = (text) => {
  return `Siz yozdingiz: ${text}`;
};
