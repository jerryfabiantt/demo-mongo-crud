import { ApiConfig } from '../interfaces';
export const loadMongoDbConfig = (): Pick<ApiConfig, 'mongodb'> => {
  return {
    mongodb: {
      url: process.env.MONGODB_URL,
    },
  };
};
