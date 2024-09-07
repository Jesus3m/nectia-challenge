import dotenv from "dotenv";

dotenv.config();

export const config = {
  DATABASE: {
    URL: process.env.DATABASE_URL,
  },
};
