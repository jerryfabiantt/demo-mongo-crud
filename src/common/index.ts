import { ApiConfigService } from './config/api-config-service';
import { CrudService } from './services';

export * as utils from './utils';
export * from './interfaces';
export * as validations from './validations';
export * as entities from './entities';
export * as services from './services';

export const globalServices = [ApiConfigService, CrudService];
