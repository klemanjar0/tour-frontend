import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Notification } from './NotificationService';

export interface NodeNotification {
  id: number;
  title: string;
  body: string;
  seen: boolean;
  userId: number;
  user: any;
  createdAt: string;
  updatedAt: string;
}

export interface NotificationState {
  activeNotifications: Notification[];
  myNotifications: NodeNotification[];
  fetching: boolean;
  error?: string;
}

const initialState: NotificationState = {
  activeNotifications: [],
  myNotifications: [],
  fetching: false,
};

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    clearNotifications: () => initialState,
    setNotifications: (
      state: NotificationState,
      action: PayloadAction<Notification[]>,
    ) => {
      state.activeNotifications = action.payload;
    },
    pushNotification: (
      state: NotificationState,
      action: PayloadAction<Notification>,
    ) => {
      state.activeNotifications = [
        ...state.activeNotifications,
        action.payload,
      ];
    },
    hideNotification: (
      state: NotificationState,
      action: PayloadAction<number>,
    ) => {
      state.activeNotifications = state.activeNotifications.map((it) => {
        if (it.id === action.payload) {
          it.show = false;
        }
        return it;
      });
    },
    removeNotification: (
      state: NotificationState,
      action: PayloadAction<number>,
    ) => {
      state.activeNotifications = state.activeNotifications.filter(
        (it) => it.id !== action.payload,
      );
    },
  },
});

export const {
  clearNotifications,
  setNotifications,
  hideNotification,
  pushNotification,
  removeNotification,
} = notificationSlice.actions;
export default notificationSlice.reducer;
