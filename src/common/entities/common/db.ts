import { eventEntities } from '../event/db';
import { userEntities } from '../user/db';
import { careerEntities } from '../career/db';

export const allEntities = [
  ...eventEntities,
  ...userEntities,
  ...careerEntities,
];
