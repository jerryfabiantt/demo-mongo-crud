import { EventSchema } from './event.schema';

export enum EventModelCollectionNames {
  Event = 'Event',
}

export const eventEntities = [
  {
    name: EventModelCollectionNames.Event,
    schema: EventSchema,
  },
];
