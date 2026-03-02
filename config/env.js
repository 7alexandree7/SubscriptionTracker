import { config } from "dotenv"

config({ path: `.env.${process.env.NODE_ENV || "development"}.local` })

export const {
    PORT,
    NODE_ENV,
    DB_URL,
    JWT_SECRET,
    JWT_EXPIRES_IN,
    ARCJECT_KEY,
    ARCJECT_ENV
} = process.env


