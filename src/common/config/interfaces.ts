export interface JwtConfig {
  secret: string;
}

export interface MiddlewareConfig {
  allowedDomains?: string;
}

export interface HealthConfig {
  memoryThresholdPercentage: number;
  diskThreshold;
  Percentage: number;
}

export interface MongoDbConfig {
  url: string;
}

export type Environment = 'development' | 'test' | 'production';

export interface ApiConfig {
  appName: string;
  mongodb: MongoDbConfig;
  debug?: boolean;
  env: Environment;
  jwt: JwtConfig;
  middleware: MiddlewareConfig;
}
