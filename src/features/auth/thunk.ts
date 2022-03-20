import { createAsyncThunk } from '@reduxjs/toolkit';
import { actionTypes } from './types';
import { buildHeaders, callApi, ENDPOINT } from '../api';
import { AppThunk, RootState } from '../store';
import { loginRequest } from './slice';

export interface ILoginReq {
  email: string;
  password: string;
}

export const loginThunk =
  (payload: ILoginReq): AppThunk =>
  async (dispatch, getState) => {
    const state = getState();
    const { email, password } = payload;
    const json = {
      email,
      password,
    };
    const response = await callApi(ENDPOINT.LOGIN, buildHeaders(state, json));
  };
