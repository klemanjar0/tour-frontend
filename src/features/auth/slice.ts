import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from './types';

export interface AuthState {
  profile?: IUser;
  authToken?: string;
  fetching: boolean;
  error?: string;
  registerStatus?: boolean;
}

const initialState: AuthState = {
  fetching: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => state,

    clear: (state: AuthState) => {
      state.profile = undefined;
      state.authToken = undefined;
      state.error = undefined;
      state.fetching = false;
    },

    clearError: (state: AuthState) => {
      state.error = undefined;
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

    registerRequest: (state: AuthState, { payload }) => {
      state.fetching = true;
      state.error = undefined;
      state.registerStatus = false;
    },
    registerSuccess: (state: AuthState, action: PayloadAction<IUser>) => {
      state.fetching = false;
      state.error = undefined;
      state.registerStatus = true;
      state.profile = { email: action.payload.email } as IUser;
    },
    registerFailed: (state: AuthState, action: PayloadAction<string>) => {
      state.fetching = false;
      state.registerStatus = false;
      state.error = action.payload;
    },

    passwordChangeRequest: (state: AuthState, { payload }) => {
      state.fetching = true;
      state.error = undefined;
    },
    passwordChangeSuccess: (state: AuthState) => {
      state.fetching = false;
      state.error = undefined;
    },
    passwordChangeFailed: (state: AuthState, action: PayloadAction<string>) => {
      state.fetching = false;
      state.error = action.payload;
    },
  },
});

export const {
  clear,
  logout,
  loginRequest,
  loginSuccess,
  loginFailed,
  registerRequest,
  registerSuccess,
  registerFailed,
  clearError,
  passwordChangeRequest,
  passwordChangeSuccess,
  passwordChangeFailed,
} = authSlice.actions;
export default authSlice.reducer;
