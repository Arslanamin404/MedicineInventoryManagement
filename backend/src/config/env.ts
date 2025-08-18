import dotenv from "dotenv"
dotenv.config()

export const config = {
    PORT: Number(process.env.PORT),
    BASE_URL: process.env.BASE_URL,
    DATABASE_URL: process.env.DATABASE_URL,
    CLIENT_URL: process.env.CLIENT_URL
}