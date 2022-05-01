import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { BalanceResponse } from './entities';
import { RootState } from '../store';
import get from 'lodash/get';

export interface BalanceState {
  balanceId: number | null;
  account: number | null;
  fetching: boolean;
  error: string | null;
}

const initialState: BalanceState = {
  balanceId: null,
  account: null,
  fetching: false,
  error: null,
};

const balanceSlice = createSlice({
  name: 'balance',
  initialState,
  reducers: {
    getAccountRequest: (state: BalanceState) => {
      state.fetching = true;
      state.error = null;
    },
    getAccountSuccess: (
      state: BalanceState,
      { payload }: PayloadAction<BalanceResponse>,
    ) => {
      state.balanceId = payload.id;
      state.account = payload.account;
      state.fetching = false;
      state.error = null;
    },
    getAccountFailure: (
      state: BalanceState,
      { payload }: PayloadAction<string>,
    ) => {
      state.fetching = false;
      state.error = payload;
    },
  },
});

export const balanceSelector = (state: RootState): number | null => {
  return get(state, ['balance', 'account']);
};

export const { getAccountRequest, getAccountFailure, getAccountSuccess } =
  balanceSlice.actions;
export default balanceSlice.reducer;
