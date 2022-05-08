import { Notification } from './notifications/NotificationService';
import moment from 'moment/moment';

export const PAGE = {
  HOME: '/',
  LOGIN: 'login',
  REGISTER: 'register',
  PROFILE: 'profile',
  EVENTS: 'events',
  CREATE_EVENT: 'create_new_event',
  MY_EVENTS: 'my_events',
  MANAGE_EVENT: 'view_event',
  INVITES: 'invites',
};

export const labels = {
  navbar: {
    title: 'Tour',
    login: 'Login',
    register: 'Registration',
    logout: 'Sign Out',
    events: 'Event Management',
    invites: 'Invites',
  },
  login: {
    signIn: 'Sign In',
    emailPlaceholder: 'Enter Email or Username',
    passwordPlaceholder: 'Enter Password',
  },
  register: {
    signUp: 'Sign Up',
  },
  event: {
    manage: 'Details',
    noEvents: 'No events',
    create: 'Establish new event',
    onlyMy: 'Show only me-created events',
  },
  profile: {
    role: 'Service role',
    updateImage: 'Update image',
    updatePassword: 'Update password',
  },
  common: {
    save: 'Save',
    cancel: 'Cancel',
    back: 'Back',
    filters: 'Filters',
  },
};

export const dateToString = (date: number | Date) =>
  moment(date).format('hh:mm:ss');

const appendNotifyId = (date: number | Date) => ({
  id: Number(date),
  show: true,
});

export const notifications = {
  passwordChanged: (date: number | Date) => ({
    title: 'Password change',
    body: 'Password has been successfully changed',
    date: dateToString(date),
    ...appendNotifyId(date),
  }),
  featureLocked: (date: number | Date) => ({
    title: 'Error',
    body: 'Feature is currently unavailable',
    date: dateToString(date),
    ...appendNotifyId(date),
  }),
  tokenExpired: (date: number | Date) => ({
    title: 'Token has been expired',
    body: 'Your token has been expired. Login again.',
    date: dateToString(date),
    ...appendNotifyId(date),
  }),
  defaultError: (date: number | Date, description: string) => ({
    title: 'Error',
    body: description,
    date: dateToString(date),
    ...appendNotifyId(date),
  }),
  inviteError: (date: number | Date, description: string) => ({
    title: 'Error',
    body: description,
    date: dateToString(date),
    ...appendNotifyId(date),
  }),
  newInvite: (date: number | Date) => ({
    title: 'Invite',
    body: 'You have been invited to a new event.',
    date: dateToString(date),
    ...appendNotifyId(date),
  }),
  balanceChanged: (date: number | Date) => ({
    title: 'Balance $',
    body: 'Your balance changed',
    date: dateToString(date),
    ...appendNotifyId(date),
  }),
  invitedSuccessfully: (date: number | Date) => ({
    title: 'Invite',
    body: 'Invite sent.',
    date: dateToString(date),
    ...appendNotifyId(date),
  }),
  invitedDeclineError: (date: number | Date) => ({
    title: 'Invite decline error.',
    body: 'Error during declining.',
    date: dateToString(date),
    ...appendNotifyId(date),
  }),
  invitedAcceptError: (date: number | Date) => ({
    title: 'Invite accept error.',
    body: 'Error during accepting.',
    date: dateToString(date),
    ...appendNotifyId(date),
  }),
  removeUserError: (date: number | Date) => ({
    title: 'Removal user error.',
    body: 'Error during removing user.',
    date: dateToString(date),
    ...appendNotifyId(date),
  }),
  removeEventError: (date: number | Date) => ({
    title: 'Removal event error.',
    body: 'Error during removing event.',
    date: dateToString(date),
    ...appendNotifyId(date),
  }),
  updateStatusError: (date: number | Date) => ({
    title: 'Unable to update status.',
    body: 'Error during updating event, try again.',
    date: dateToString(date),
    ...appendNotifyId(date),
  }),
  chooseWinnerError: (date: number | Date) => ({
    title: 'Unable to set winner.',
    body: 'Error during choosing winner of event, try again.',
    date: dateToString(date),
    ...appendNotifyId(date),
  }),
  paymentError: (date: number | Date, body: string) => ({
    title: 'Payment Error.',
    body,
    date: dateToString(date),
    ...appendNotifyId(date),
  }),
};

export const EventStatus = {
  0: "Hasn't started yet",
  1: 'Registration started',
  2: 'Registration finished',
  4: 'Event in progress',
  8: 'Event finished',
  16: 'Event closed',
};

export const UserRole = {
  1: 'No access',
  100: 'Default',
  200: 'Editor',
  400: 'Admin',
  500: 'Super admin',
};

export const UserRoleColor: { [key in string]: string } = {
  '1': 'secondary',
  '100': 'secondary',
  '200': 'primary',
  '400': 'success',
  '500': 'success',
};
