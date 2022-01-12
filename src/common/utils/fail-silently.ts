import { Logger } from '@nestjs/common';

const logger = new Logger('Silent Errors');
export const failSilently = (job: () => Promise<any>) => {
  try {
    if (typeof job === 'function') {
      return job();
    }
  } catch (e) {
    // fail silently
    logger.error(e);
  }
};
