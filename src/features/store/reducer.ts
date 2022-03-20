import authReducer from '../auth/slice';
import routerReducer from '../router/slice';
import eventsReducer from '../events/slice';
import { combineReducers } from 'redux';

const rootReducer = {
  auth: authReducer,
  router: routerReducer,
  events: eventsReducer,
};

export default rootReducer;
