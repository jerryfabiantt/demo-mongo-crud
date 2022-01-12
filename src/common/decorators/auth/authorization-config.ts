import { RoleType } from '../../entities/user';

const TYPE_OR = 'or';
const TYPE_AND = 'and';
const TYPE_PERMISSION = 'permission';
const TYPE_AUTHENTICATE = 'authenticate';
const TYPE_ROLE = 'role';

export interface AuthConfigBase {
  onAuthorize?: (req: any, data: any) => void;
}

export interface OrAuthorizationConfig extends AuthConfigBase {
  authenticationManager: typeof TYPE_OR;
  items?: AuthorizationConfig[];
}

export interface AndAuthorizationConfig extends AuthConfigBase {
  authenticationManager: typeof TYPE_AND;
  items?: AuthorizationConfig[];
}

export interface PermissionAuthorizationConfig extends AuthConfigBase {
  authenticationManager: typeof TYPE_PERMISSION;
  permission?: string;
}

export interface RoleAuthorizationConfig extends AuthConfigBase {
  authenticationManager: typeof TYPE_ROLE;
  role?: RoleType;
}

export interface AuthenticateAuthorizationConfig extends AuthConfigBase {
  authenticationManager: typeof TYPE_AUTHENTICATE;
}

export type AuthorizationConfig =
  | OrAuthorizationConfig
  | AndAuthorizationConfig
  | PermissionAuthorizationConfig
  | RoleAuthorizationConfig
  | AuthenticateAuthorizationConfig;
