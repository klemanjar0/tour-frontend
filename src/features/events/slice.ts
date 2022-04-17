import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EventFilters, IEvent, TransformedEvent } from './types';

export interface EventsState {
  myEvents: TransformedEvent[];
  selectedEventId?: number;
  filters?: EventFilters;
  maxEventPrize?: number;
  eventView?: TransformedEvent;
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
    selectEvent: (state: EventsState, action: PayloadAction<number>) => {
      state.selectedEventId = action.payload;
    },
    clearSelectionEvent: (state: EventsState) => {
      state.selectedEventId = undefined;
    },
    openEventView: (
      state: EventsState,
      action: PayloadAction<TransformedEvent>,
    ) => {
      state.eventView = action.payload;
    },
    clearEventView: (state: EventsState) => {
      state.eventView = undefined;
    },
    setMaxEventPrize: (state: EventsState, action: PayloadAction<number>) => {
      state.maxEventPrize = action.payload;
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
    createEventRequest: (state: EventsState, { payload }) => {
      state.fetching = true;
      state.error = undefined;
    },
    createEventSuccess: (state: EventsState) => {
      state.fetching = false;
      state.error = undefined;
    },
    createEventFailed: (state: EventsState, action: PayloadAction<string>) => {
      state.fetching = false;
      state.error = action.payload;
    },
  },
});

export const {
  clearEvents,
  myEventRequest,
  myEventSuccess,
  myEventFailed,
  selectEvent,
  clearSelectionEvent,
  setMaxEventPrize,
  openEventView,
  clearEventView,
  createEventRequest,
  createEventSuccess,
  createEventFailed,
} = eventsSlice.actions;
export default eventsSlice.reducer;
