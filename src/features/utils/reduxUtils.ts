import { Reducer } from 'redux';

export const createAsyncActionTypes = (type: string) => {
  return {
    request: `${type}/request`,
    fulfilled: `${type}/fulfilled`,
    rejected: `${type}/rejected`,
  };
};

export const prepareSliceReducerNetworkNeed = <PayloadType>(
  reducer: Reducer,
) => ({
  reducer,
  prepare: (payload: PayloadType) => ({
    payload,
    meta: { network: true },
  }),
});
