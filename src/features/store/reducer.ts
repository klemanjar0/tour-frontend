import authReducer from '../auth/slice';
import routerReducer from '../router/slice';
import eventsReducer from '../events/slice';
import spinnerReducer from '../spinner/slice';
import syncReducer from '../syncConnector/slice';
import notificationReducer from '../notifications/slice';
import invitesReducer from '../invites/slice';
import balanceReducer from '../balance/silce';

import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  auth: authReducer,
  router: routerReducer,
  events: eventsReducer,
  spinner: spinnerReducer,
  sync: syncReducer,
  notifications: notificationReducer,
  invites: invitesReducer,
  balance: balanceReducer,
});

export default rootReducer;
