import { createAsyncThunk } from "@reduxjs/toolkit";
import { Axios } from "../app/config";

export const fetchScheduleDetails = createAsyncThunk(
  "schedules/fetchScheduleDetails",
  async (scheduleId: number) => {
    const response = await Axios.get(`schedule-details/${scheduleId}/`);
    return response.data;
  }
);
