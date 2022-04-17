import authReducer from '../auth/slice';
import routerReducer from '../router/slice';
import eventsReducer from '../events/slice';
import spinnerReducer from '../spinner/slice';
import syncReducer from '../syncConnector/slice';
import notificationReducer from '../notifications/slice';
import invitesReducer from '../invites/slice';
import { combineReducers } from 'redux';

const rootReducer = {
  auth: authReducer,
  router: routerReducer,
  events: eventsReducer,
  spinner: spinnerReducer,
  sync: syncReducer,
  notifications: notificationReducer,
  invites: invitesReducer,
};

export default rootReducer;
