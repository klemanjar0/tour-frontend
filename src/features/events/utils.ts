import { EventStatuses, IEvent, TransformedEvent } from './types';
import map from 'lodash/map';
import head from 'lodash/head';
import { EventStatus } from '../constants';

export const transformEvents = (events: IEvent[]): TransformedEvent[] => {
  return (
    map(events, (event: IEvent) => {
      const myRole = head(event.users)?.EventToUser?.role;
      const isActive = head(event.users)?.EventToUser?.isActive;
      return {
        id: event.id,
        title: event.title,
        type: event.type,
        status: event.status,
        country: event.country,
        prizeFund: event.prizeFund,
        description: event.description,
        createdAt: event.createdAt,
        updatedAt: event.updatedAt,
        myRole: myRole,
        isActive: isActive,
      };
    }) || ([] as TransformedEvent[])
  );
};

export const getEventStatus = (status: EventStatuses) => {
  return EventStatus[status];
};
