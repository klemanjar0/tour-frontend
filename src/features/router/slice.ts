import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface RouterState {
  currentRoute: string | null;
  previousRoute: string | null;
  backRoute: string | null;
}

const initialState: RouterState = {
  currentRoute: null,
  previousRoute: null,
  backRoute: null,
};

const routerSlice = createSlice({
  name: 'router',
  initialState,
  reducers: {
    setCurrentRoute: (state: RouterState, action: PayloadAction<string>) => {
      state.previousRoute = state.currentRoute;
      state.currentRoute = action.payload;
    },
    setBackRoute: (
      state: RouterState,
      action: PayloadAction<string | null>,
    ) => {
      state.previousRoute = null;
      state.backRoute = action.payload;
    },
  },
});

export const { setCurrentRoute, setBackRoute } = routerSlice.actions;
export default routerSlice.reducer;
