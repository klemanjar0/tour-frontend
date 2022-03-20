import authReducer from '../auth/slice';
import { combineReducers } from 'redux';

const rootReducer = {
  auth: authReducer,
};

export default rootReducer;
