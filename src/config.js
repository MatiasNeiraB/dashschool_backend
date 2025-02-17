import { config } from "dotenv";

// Ejecuto config para que pueda meterme en el .env
config();

export default {
  mongoUri: process.env.MONGODB_URI,
  serverPort: process.env.SERVER_PORT || 4000,
  SECRET: "rollingc0de",
  EXPIRE: "24h",
};
