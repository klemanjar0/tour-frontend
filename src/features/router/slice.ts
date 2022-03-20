import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface RouterState {
  currentRoute: string | null;
  backRoute: string | null;
}

const initialState: RouterState = {
  currentRoute: null,
  backRoute: null,
};

const routerSlice = createSlice({
  name: 'router',
  initialState,
  reducers: {
    setCurrentRoute: (state: RouterState, action: PayloadAction<string>) => {
      state.currentRoute = action.payload;
    },
    setBackRoute: (
      state: RouterState,
      action: PayloadAction<string | null>,
    ) => {
      state.backRoute = action.payload;
    },
  },
});

export const { setCurrentRoute, setBackRoute } = routerSlice.actions;
export default routerSlice.reducer;
