import { SetMetadata } from '@nestjs/common';
import { RoleType } from '../../entities/user';
import { AuthorizationConfig } from './authorization-config';
import {
  ACL_CHECK_PERMISSIONS_META_DATA_KEY,
  ACL_META_DATA_KEY,
  ACL_ALLOW_ANONYMOUS,
} from './metadata-keys';

export const Role = (role: RoleType): AuthorizationConfig => ({
  authenticationManager: 'role',
  role,
});

export const Permission = (permission: string): AuthorizationConfig => ({
  permission,
  authenticationManager: 'permission',
});

export const And = (...items: AuthorizationConfig[]): AuthorizationConfig => ({
  authenticationManager: 'and',
  items,
});

export const Or = (...items: AuthorizationConfig[]): AuthorizationConfig => ({
  authenticationManager: 'or',
  items,
});

export const Authorize = (config?: AuthorizationConfig) => {
  const { authenticationManager = 'authenticate', ...rest } = config || {};
  return SetMetadata(ACL_META_DATA_KEY, {
    authenticationManager,
    ...rest,
  });
};

export const CheckPermissions = (permissions: string[]) => {
  return SetMetadata(ACL_CHECK_PERMISSIONS_META_DATA_KEY, {
    permissions,
  });
};

export const AllowAnonymous = () => {
  return SetMetadata(ACL_ALLOW_ANONYMOUS, true);
};
