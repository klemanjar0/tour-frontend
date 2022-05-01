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
  eventView: {
    data?: TransformedEvent;
    fetching: boolean;
    error?: string;
  };
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
  eventView: {
    fetching: false,
  },
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
      state.eventView!.data = action.payload;
    },
    clearEventView: (state: EventsState) => {
      state.eventView.data = undefined;
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
    deleteEventRequest: (state: EventsState, { payload }) => {
      state.eventView.fetching = true;
      state.eventView.error = undefined;
    },
    deleteEventSuccess: (state: EventsState) => {
      state.eventView.fetching = false;
      state.eventView.error = undefined;
    },

    updateStatusRequest: (state: EventsState, { payload }) => {
      state.eventView.fetching = true;
      state.eventView.error = undefined;
    },
    updateStatusSuccess: (state: EventsState) => {
      state.eventView.fetching = false;
      state.eventView.error = undefined;
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
    removeUserRequest: (state: EventsState, { payload }) => {
      state.eventView.fetching = true;
      state.eventView.error = undefined;
    },
    removeUserSuccess: (state: EventsState) => {
      state.eventView.fetching = false;
      state.eventView.error = undefined;
    },

    chooseWinnerRequest: (state: EventsState, { payload }) => {
      state.eventView.fetching = true;
      state.eventView.error = undefined;
    },
    chooseWinnerSuccess: (state: EventsState) => {
      state.eventView.fetching = false;
      state.eventView.error = undefined;
    },

    getEventRequest: (state: EventsState, { payload }) => {
      state.eventView.fetching = true;
      state.eventView.error = undefined;
    },
    getEventSuccess: (
      state: EventsState,
      action: PayloadAction<TransformedEvent>,
    ) => {
      state.eventView.fetching = false;
      state.eventView.error = undefined;
      state.eventView.data = action.payload;
    },
    getEventFailed: (state: EventsState, action: PayloadAction<string>) => {
      state.eventView.fetching = false;
      state.eventView.error = action.payload;
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
  removeUserRequest,
  removeUserSuccess,
  getEventFailed,
  getEventRequest,
  getEventSuccess,
  deleteEventRequest,
  deleteEventSuccess,
  updateStatusRequest,
  updateStatusSuccess,
  chooseWinnerRequest,
  chooseWinnerSuccess,
} = eventsSlice.actions;
export default eventsSlice.reducer;
