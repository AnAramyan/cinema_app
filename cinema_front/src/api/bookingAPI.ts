import { createAsyncThunk } from "@reduxjs/toolkit";
import { Axios } from "../app/config";

export const bookSeat = createAsyncThunk(
  "booking/bookSeat",
  async (
    bookingData: { scheduleId: number; row: number; column: number },
    { rejectWithValue }
  ) => {
    try {
      const response = await Axios.post("bookings/", bookingData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);
