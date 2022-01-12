import { ApiConfig } from '../interfaces';
export const loadJwtConfig = (): Pick<ApiConfig, 'jwt'> => {
  return {
    jwt: { secret: process.env.JWT_SECRET },
  };
};
