import { userCommands, userMigrations } from './user';
import { BasicCommand } from './test-command';

export const allCommands = [...userCommands, ...userMigrations, BasicCommand];
