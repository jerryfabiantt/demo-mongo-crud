import { config as dotenvConfig } from 'dotenv';

interface MongoDbConfig {
  generalDbUrl: string;
}

export interface CommandConfig {
  port: string | number;
  serverTimezone: string;
  mongodb: MongoDbConfig;
  debug?: boolean;
}

dotenvConfig();

const config: CommandConfig = {
  port: process.env.PORT || 8000,
  serverTimezone: process.env.SERVER_TIMEZONE || 'Asia/Dubai',
  mongodb: {
    generalDbUrl: process.env.MONGODB_URL,
  },
  debug: true,
};

export default config;
