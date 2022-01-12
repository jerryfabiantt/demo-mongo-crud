import { ApiConfig } from '../interfaces';
export const loadMiddlewareConfig = (): Pick<ApiConfig, 'middleware'> => {
  return {
    middleware: {
      allowedDomains: process.env.ALLOWED_DOMAINS,
    },
  };
};
