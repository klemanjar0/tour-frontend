import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SyncState {
  profileSyncActionTime: number;
  eventsSyncActionTime: number;
  invitesSyncActionTime: number;
}

const initialState: SyncState = {
  profileSyncActionTime: 0,
  eventsSyncActionTime: 0,
  invitesSyncActionTime: 0,
};

const syncSlice = createSlice({
  name: 'sync',
  initialState,
  reducers: {
    updateProfileSyncActionTime: (
      state: SyncState,
      action: PayloadAction<number>,
    ) => {
      state.profileSyncActionTime = action.payload;
    },
    updateEventsSyncActionTime: (
      state: SyncState,
      action: PayloadAction<number>,
    ) => {
      state.eventsSyncActionTime = action.payload;
    },
    updateInvitesSyncActionTime: (
      state: SyncState,
      action: PayloadAction<number>,
    ) => {
      state.invitesSyncActionTime = action.payload;
    },
  },
});

export const {
  updateProfileSyncActionTime,
  updateEventsSyncActionTime,
  updateInvitesSyncActionTime,
} = syncSlice.actions;
export default syncSlice.reducer;
