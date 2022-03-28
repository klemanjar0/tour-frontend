import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SyncState {
  profileSyncActionTime: number;
  eventsSyncActionTime: number;
}

const initialState: SyncState = {
  profileSyncActionTime: 0,
  eventsSyncActionTime: 0,
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
  },
});

export const { updateProfileSyncActionTime, updateEventsSyncActionTime } =
  syncSlice.actions;
export default syncSlice.reducer;
