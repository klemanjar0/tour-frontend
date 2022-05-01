import {
  configureStore,
  applyMiddleware,
  ThunkAction,
  Action,
} from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import rootReducer from './reducer';
import thunkMiddleware from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './saga';
import DispatchService from './DispatchService';
import storage from 'redux-persist/lib/storage';

const sagaMiddleware = createSagaMiddleware();

const middlewares = [thunkMiddleware, sagaMiddleware];
const middlewareEnhancer = applyMiddleware(...middlewares);

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  blacklist: [
    'router',
    'events',
    'spinner',
    'sync',
    'notifications',
    'invites',
    'balance',
  ],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  enhancers: [middlewareEnhancer],
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);
DispatchService.setDispatch(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export default store;
