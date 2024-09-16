import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IScheduledMovie } from "../types";
import { fetchScheduleDetails } from "../api/scheduleAPI";

interface ScheduleState {
  schedules: IScheduledMovie[];
  currentSchedule: IScheduledMovie | null;
  loading: boolean;
  error: string | null;
}

const initialState: ScheduleState = {
  schedules: [],
  currentSchedule: null,
  loading: false,
  error: null,
};
const scheduleSlice = createSlice({
  name: "schedules",
  initialState,
  reducers: {
    clearSchedule: (state) => {
      state.currentSchedule = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchScheduleDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchScheduleDetails.fulfilled,
        (state, action: PayloadAction<IScheduledMovie>) => {
          state.loading = false;
          state.currentSchedule = action.payload;
        }
      )
      .addCase(fetchScheduleDetails.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Failed to fetch schedule details";
      });
  },
});

export const { clearSchedule } = scheduleSlice.actions;
export default scheduleSlice.reducer;
