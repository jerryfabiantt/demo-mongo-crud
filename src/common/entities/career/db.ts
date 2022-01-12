import { CareerSchema } from './career.schema';

export enum EventModelCollectionNames {
  Career = 'Career',
}

export const careerEntities = [
  {
    name: EventModelCollectionNames.Career,
    schema: CareerSchema,
  },
];
