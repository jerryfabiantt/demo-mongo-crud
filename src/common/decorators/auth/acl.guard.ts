import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
  BadRequestException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ApiConfigService } from '@common/config/api-config-service';
import { AuthorizationConfig } from './authorization-config';
import {
  ACL_ALLOW_ANONYMOUS,
  ACL_CHECK_PERMISSIONS_META_DATA_KEY,
  ACL_META_DATA_KEY,
} from './metadata-keys';
import * as jwt from 'jsonwebtoken';

import { ExtractJwt } from 'passport-jwt';
import { Types } from 'mongoose';

@Injectable()
export class AclGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private apiConfigService: ApiConfigService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const allowAnonymous = this.reflector.get<boolean | undefined>(
      ACL_ALLOW_ANONYMOUS,
      context.getHandler(),
    );

    if (allowAnonymous) {
      return true;
    }

    const aclConfig = this.reflector.getAllAndOverride<
      AuthorizationConfig | undefined
    >(ACL_META_DATA_KEY, [context.getHandler(), context.getClass()]);

    if (!aclConfig) {
      return true;
    }

    return this.handleAcl(context);
  }

  private async handleAcl(context: ExecutionContext) {
    if (!this.apiConfigService.jwt.secret) {
      throw new UnauthorizedException();
    }

    const request = context.switchToHttp().getRequest();

    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(request);

    if (!token) {
      throw new UnauthorizedException();
    }
    // const authorize = await jwt.verify(token, this.apiConfigService.jwt.secret);
    let decodedToken: any;
    try {
      decodedToken = await jwt.verify(token, this.apiConfigService.jwt.secret);
    } catch (err) {
      throw new UnauthorizedException('Invalid Token');
    }

    if (!decodedToken) {
      throw new UnauthorizedException('Invalid Token');
    }

    decodedToken.user.id = new Types.ObjectId(decodedToken.user.id.toString());
    request.currentUser = decodedToken.user;
    request.doneBy = {
      _id: decodedToken.user.id,
      name: decodedToken.user.name,
    };

    request.permission = decodedToken.permission;
    request.role = decodedToken.role;
    request.taggedPermissions = decodedToken.taggedPermissions;

    return true;
  }
}
