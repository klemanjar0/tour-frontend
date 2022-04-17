import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface InviteState {
  invites: any[];
  fetching: boolean;
  error?: string;
}

const initialState: InviteState = {
  invites: [],
  fetching: false,
};

const invitesSlice = createSlice({
  name: 'invites',
  initialState,
  reducers: {
    getInvitesRequest: (state: InviteState) => {
      state.fetching = true;
      state.error = undefined;
    },
    getInvitesSuccess: (state: InviteState, action: PayloadAction<any[]>) => {
      state.fetching = false;
      state.error = undefined;
      state.invites = action.payload;
    },
    getInvitesFailed: (state: InviteState, action: PayloadAction<string>) => {
      state.fetching = false;
      state.error = action.payload;
    },

    declineInviteRequest: (state, { payload }: PayloadAction<number>) => state,
    acceptInviteRequest: (state, { payload }: PayloadAction<number>) => state,
  },
});

export const {
  getInvitesRequest,
  getInvitesFailed,
  getInvitesSuccess,
  declineInviteRequest,
  acceptInviteRequest,
} = invitesSlice.actions;
export default invitesSlice.reducer;
