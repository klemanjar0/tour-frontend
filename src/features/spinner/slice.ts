import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface SpinnerState {
  globalSpinner: boolean;
}

const initialState: SpinnerState = {
  globalSpinner: false,
};

const spinnerSlice = createSlice({
  name: 'router',
  initialState,
  reducers: {
    setSpinnerState: (state: SpinnerState, action: PayloadAction<boolean>) => {
      state.globalSpinner = action.payload;
    },
  },
});

export const { setSpinnerState } = spinnerSlice.actions;
export default spinnerSlice.reducer;
