import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import { ApiConfigService } from '../config/api-config-service';
import { json, urlencoded } from 'body-parser';

export const loadMiddlewares = (
  server: any,
  configService: ApiConfigService,
  options?: { fastifyServer?: boolean },
) => {
  const whiteListedDomains =
    configService.middleware?.allowedDomains?.split(',');
  if (configService.debug) {
    console.log('whitelisted domains: %O', whiteListedDomains);
  }
  // set only allowed domains to access the application
  const corsOptions = {
    exposedHeaders: [],
    credentials: true,
    origin: whiteListedDomains,
  };
  server.use(cors(corsOptions));
  // // enable preflight across all routes
  server.options?.('*', cors(corsOptions));

  // help secure Express apps with various HTTP headers
  server.use(helmet());

  // compress
  server.use(compression());

  // logs req. to console
  server.use(morgan('dev'));

  if (!options?.fastifyServer) {
    // parse json data
    server.use(json({ limit: '500mb' }));
    // parse application/x-www-form-urlencoded
    server.use(urlencoded({ limit: '500mb', extended: true }));
  }
};
