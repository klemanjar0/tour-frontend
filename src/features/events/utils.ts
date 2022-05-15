import { EventStatuses, IEvent, TransformedEvent } from './types';
import map from 'lodash/map';
import head from 'lodash/head';
import { EventStatus } from '../constants';
import { RootState } from '../store';

export const buildEventsJson = (filters: RootState['events']['filters']) => {
  return {
    start: 0,
    limit: -1,
    searchParams: {
      onlyMy: filters.onlyMy,
      prizeMin: filters.prizeMin,
      prizeMax: filters.prizeMax,
      country: filters.country,
      title: filters.title,
    },
  };
};

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
        twitchUrl: event.twitchUrl,
        myRole: myRole,
        isActive: isActive,
      };
    }) || ([] as TransformedEvent[])
  );
};

export const transformUsers = (users: any[]) => {
  return map(users, (user) => {
    const eventRole = user?.EventToUser?.role;
    const isActive = user?.EventToUser?.isActive;
    return {
      ...user,
      eventRole,
      isActive,
    };
  });
};

export const getEventStatus = (status?: EventStatuses) => {
  return status ? EventStatus[status] : EventStatus[0];
};
