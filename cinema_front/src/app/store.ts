import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/authSlice";
import roomsSlice from "../features/roomsSlice";
import scheduleSlice from "../features/scheduleSlice";
import bookingSlice from "../features/bookingSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    rooms: roomsSlice,
    schedule: scheduleSlice,
    booking: bookingSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
