import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { actionTypes, IUser } from './types';
import { HTTPError } from '../types';
import { ILoginReq, loginThunk } from './thunk';
import { RootState } from '../store';
import { prepareSliceReducerNetworkNeed } from '../utils/reduxUtils';

export interface AuthState {
  profile?: IUser;
  authToken?: string;
  fetching: boolean;
  error?: string;
}

const initialState: AuthState = {
  fetching: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clear: (state: AuthState) => {
      state.profile = undefined;
      state.authToken = undefined;
      state.error = undefined;
      state.fetching = false;
    },

    loginRequest: (state: AuthState, { payload }) => {
      state.fetching = true;
      state.error = undefined;
    },
    loginSuccess: (
      state: AuthState,
      action: PayloadAction<Partial<AuthState>>,
    ) => {
      state.fetching = false;
      state.profile = action.payload.profile;
      state.authToken = action.payload.authToken;
    },
    loginFailed: (state: AuthState, action: PayloadAction<string>) => {
      state.fetching = false;
      state.error = action.payload;
      state.profile = undefined;
      state.authToken = undefined;
    },
  },
});

export const { clear, loginRequest, loginSuccess, loginFailed } =
  authSlice.actions;
export default authSlice.reducer;
