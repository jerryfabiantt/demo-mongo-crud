import { AuthRequest, Dict } from '../interfaces';
import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { ApiConfigService } from '../config/api-config-service';
import { failSilently } from '../utils';
import { decode } from 'jsonwebtoken';
import { ExtractJwt } from 'passport-jwt';
import { Types } from 'mongoose';

@Injectable()
export class ExpressRequestLoggerMiddleware implements NestMiddleware {
  constructor(private apiConfigService: ApiConfigService) {}

  private logger = new Logger('HTTP');
  private readonly excludedEndpoints = [];
  private readonly ignoreBodyOn = ['/auth/login'];
  private readonly ignoreResponseBodyOn = ['/auth/login'];
  async use(
    request: Request & AuthRequest & { requestLogId?: string },
    response: Response,
    next: NextFunction,
  ) {
    failSilently(async () => {
      const { method, url, originalUrl, path: endPoint } = request;

      const ip =
        request.get('x-forwarded-for') ||
        request.socket?.remoteAddress ||
        request.ip ||
        request.connection?.remoteAddress;
      const start = Date.now();
      const referer = request.get('referer') || '';

      const requestData = this.ignoreBodyOn.includes(originalUrl)
        ? { masked: true }
        : { ...request.body };
      const requestQuery = { ...request.query };
      const requestParams = { ...request.params };
      const userAgent = request.get('user-agent') || '';

      const logId = uuidv4();

      if (
        !this.excludedEndpoints.includes(endPoint) &&
        !new RegExp('v1/.*/health').test(endPoint) &&
        !new RegExp('v1/health').test(endPoint)
      ) {
        const token = ExtractJwt.fromAuthHeaderAsBearerToken()(request);

        const user = decode(token);

        response.on('finish', () =>
          failSilently(async () => {
            const contentLength = response.get('content-length');
            const code = response.headersSent
              ? String(response.statusCode)
              : String(-1);
            const duration = Date.now() - start;
            const { currentUser, permission } = request;
            let responseBody: Dict | undefined = undefined;

            this.logger.log(
              `${method} ${originalUrl} ${code} ${contentLength} - ${userAgent} ${ip}`,
            );

            const contentType = (
              response.getHeader('Content-Type') ||
              'application/json; charset=utf-8'
            )
              .toString()
              ?.split(';')?.[0];

            if (this.ignoreResponseBodyOn.includes(originalUrl)) {
              responseBody = { masked: true };
            } else if (
              response.headersSent &&
              (contentType === 'application/json' ||
                contentType === 'text/plain')
            ) {
              responseBody = (response as any).__request_logger_body_response;
            }

            const updateLogValues: any = {
              logId,
              requestDuration: duration,
              responsStatusCode: code,
              permission,
            };
            if (currentUser) {
              updateLogValues.currentUser = currentUser;
              updateLogValues.userId = currentUser.id;
            }
          }),
        );
      }

      request.requestLogId = logId;
    });

    next();
  }
}
