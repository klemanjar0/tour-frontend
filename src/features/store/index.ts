import {
  configureStore,
  applyMiddleware,
  ThunkAction,
  Action,
} from '@reduxjs/toolkit';
import rootReducer from './reducer';
import thunkMiddleware from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './saga';
import DispatchService from './DispatchService';
const sagaMiddleware = createSagaMiddleware();

const middlewares = [thunkMiddleware, sagaMiddleware];
const middlewareEnhancer = applyMiddleware(...middlewares);

export const store = configureStore({
  reducer: rootReducer,
  enhancers: [middlewareEnhancer],
});

sagaMiddleware.run(rootSaga);
DispatchService.setDispatch(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export default store;
