import dotenv from "dotenv";

dotenv.config();

export const config = {
  botToken: process.env.BOT_TOKEN,
  nodeEnv: process.env.NODE_ENV || "development",
};
