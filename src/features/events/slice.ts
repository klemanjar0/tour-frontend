import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { EventFilters, IEvent, TransformedEvent } from './types';
import { IUser } from '../auth/types';

export interface EventsState {
  myEvents: TransformedEvent[];
  assets: {
    users?: string[];
    fetching: boolean;
  };
  selectedEventId?: number;
  filters?: EventFilters;
  maxEventPrize?: number;
  eventView?: TransformedEvent;
  eventViewAssets: {
    users?: IUser[];
    fetching: boolean;
  };
  fetching: boolean;
  error?: string;
}

const initialState: EventsState = {
  myEvents: [],
  fetching: false,
  assets: {
    fetching: false,
  },
  eventViewAssets: {
    fetching: false,
  },
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
      state.eventViewAssets.fetching = false;
      state.eventViewAssets.users = [];
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

    fetchUsernamesRequest: (state: EventsState, { payload }) => {
      state.assets.fetching = true;
      state.error = undefined;
    },
    fetchUsernamesSuccess: (
      state: EventsState,
      action: PayloadAction<string[]>,
    ) => {
      state.assets.fetching = false;
      state.error = undefined;
      state.assets.users = action.payload;
    },
    fetchUsernamesFailed: (
      state: EventsState,
      action: PayloadAction<string>,
    ) => {
      state.assets.fetching = false;
      state.error = action.payload;
    },

    inviteUserRequest: (state: EventsState, { payload }) => {
      state.fetching = true;
      state.error = undefined;
    },
    inviteUserSuccess: (state: EventsState) => {
      state.fetching = false;
      state.error = undefined;
    },

    fetchEventUsersRequest: (state: EventsState, { payload }) => {
      state.eventViewAssets.fetching = true;
      state.error = undefined;
    },
    fetchEventUsersSuccess: (
      state: EventsState,
      action: PayloadAction<IUser[]>,
    ) => {
      state.eventViewAssets.fetching = false;
      state.error = undefined;
      state.eventViewAssets.users = action.payload;
    },
    fetchEventUsersFailed: (
      state: EventsState,
      action: PayloadAction<string>,
    ) => {
      state.eventViewAssets.fetching = false;
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
  fetchUsernamesRequest,
  fetchUsernamesFailed,
  fetchUsernamesSuccess,
  inviteUserRequest,
  inviteUserSuccess,
  fetchEventUsersRequest,
  fetchEventUsersFailed,
  fetchEventUsersSuccess,
} = eventsSlice.actions;
export default eventsSlice.reducer;
