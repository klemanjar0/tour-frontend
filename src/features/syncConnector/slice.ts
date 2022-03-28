import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SyncState {
  profileSyncActionTime: number;
}

const initialState: SyncState = {
  profileSyncActionTime: 0,
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
  },
});

export const { updateProfileSyncActionTime } = syncSlice.actions;
export default syncSlice.reducer;
