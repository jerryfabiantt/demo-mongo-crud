import { plainToClass } from 'class-transformer';
import { IsDefined, IsOptional, IsString, validateSync } from 'class-validator';

class EnvironmentVariables {
  @IsDefined()
  @IsString()
  APP_NAME: string;

  @IsDefined()
  @IsString()
  MONGODB_URL: string;

  @IsDefined()
  @IsString()
  JWT_SECRET: string;

  @IsOptional()
  @IsString()
  USER_TOKEN_EXPIRY: string;

  @IsOptional()
  @IsString()
  ADMIN_TOKEN_EXPIRY: string;

  @IsOptional()
  @IsString()
  USER_ROLES: string;

  @IsOptional()
  @IsString()
  ADMIN_ROLES: string;

  @IsOptional()
  @IsString()
  MODULES: string;

  @IsOptional()
  @IsString()
  ACTIONS: string;

  @IsOptional()
  @IsString()
  TWILIO_SID: string;

  @IsOptional()
  @IsString()
  TWILIO_AUTHTOKEN: string;

  @IsOptional()
  @IsString()
  TWILIO_PHONE_NUMBER: string;

  @IsOptional()
  @IsString()
  SENDGRID_KEY: string;

  @IsOptional()
  @IsString()
  FROM_EMAIL: string;

  @IsOptional()
  @IsString()
  SENTRY_DSN: string;

  @IsOptional()
  @IsString()
  SENTRY_ENV: string;

  @IsOptional()
  @IsString()
  ALLOWED_DOMAINS: string;

  @IsOptional()
  @IsString()
  REDIS_HOST: string;

  @IsOptional()
  @IsString()
  REDIS_PORT: string;

  @IsOptional()
  @IsString()
  REDIS_PASSWORD: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
