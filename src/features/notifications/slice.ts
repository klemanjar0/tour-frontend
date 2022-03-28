import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Notification } from './NotificationService';

export interface NotificationState {
  activeNotifications: Notification[];
}

const initialState: NotificationState = {
  activeNotifications: [],
};

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
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
  setNotifications,
  hideNotification,
  pushNotification,
  removeNotification,
} = notificationSlice.actions;
export default notificationSlice.reducer;
