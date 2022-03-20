import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IEvent, TransformedEvent } from './types';

export interface EventsState {
  myEvents: TransformedEvent[];
  fetching: boolean;
  error?: string;
}

const initialState: EventsState = {
  myEvents: [],
  fetching: false,
};

const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    clearEvents: (state: EventsState) => {
      state.myEvents = [];
      state.fetching = false;
    },

    myEventRequest: (state: EventsState) => {
      state.fetching = true;
      state.error = undefined;
    },
    myEventSuccess: (
      state: EventsState,
      action: PayloadAction<TransformedEvent[]>,
    ) => {
      state.fetching = false;
      state.error = undefined;
      state.myEvents = action.payload;
    },
    myEventFailed: (state: EventsState, action: PayloadAction<string>) => {
      state.fetching = false;
      state.error = action.payload;
    },
  },
});

export const { clearEvents, myEventRequest, myEventSuccess, myEventFailed } =
  eventsSlice.actions;
export default eventsSlice.reducer;
