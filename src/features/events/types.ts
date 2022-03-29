import { IUser } from '../auth/types';

export enum EventRoles {
  SUPER_ADMIN = 500,
  OWNER = 400,
  EDITOR = 200,
  MEMBER = 100,
  NO_ACCESS = 1,
}

export enum EventStatuses {
  CLOSED = 16,
  FINISHED = 8,
  ACTIVE = 4,
  REGISTRATION_CLOSED = 2,
  REGISTRATION_PENDING = 1,
  CREATED = 0,
}
export interface UserWithRelation extends IUser {
  EventToUser?: IEventToUser;
}
export interface IEvent {
  id: number;
  title: string;
  type?: string;
  description?: string;
  country?: string;
  prizeFund: number;
  status: EventStatuses;
  twitchUrl?: string;
  createdAt?: string;
  updatedAt?: string;
  users: UserWithRelation[];
}

export interface IEventToUser {
  id: number;
  userId: number;
  eventId: number;
  isActive: boolean;
  role: EventRoles;
  createdAt?: string;
  updatedAt?: string;
}

export interface TransformedEvent {
  id: number;
  title: string;
  type?: string;
  description?: string;
  country?: string;
  prizeFund: number;
  status: EventStatuses;
  createdAt?: string;
  updatedAt?: string;
  myRole?: EventRoles;
  isActive?: boolean;
}

export interface EventFilters {
  roleLevel: EventRoles;
  country: string;
  prizeMin: number;
  prizeMax: number;
  status: EventStatuses;
}
