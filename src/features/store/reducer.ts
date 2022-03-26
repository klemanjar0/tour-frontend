import authReducer from '../auth/slice';
import routerReducer from '../router/slice';
import eventsReducer from '../events/slice';
import spinnerReducer from '../spinner/slice';
import { combineReducers } from 'redux';

const rootReducer = {
  auth: authReducer,
  router: routerReducer,
  events: eventsReducer,
  spinner: spinnerReducer,
};

export default rootReducer;
