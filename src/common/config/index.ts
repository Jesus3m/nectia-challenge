import dotenv from "dotenv";

dotenv.config();

export const config = {
  DATABASE: {
    URL: process.env.DATABASE_URL,
  },
  JWT: {
    SECRET: process.env.JWT_SECRET,
    EXPIRES_IN: process.env.JWT_EXPIRES_IN,
  },
};
