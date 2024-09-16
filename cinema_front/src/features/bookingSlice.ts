import { createSlice } from "@reduxjs/toolkit";
import { bookSeat } from "../api/bookingAPI";

interface BookingState {
  loading: boolean;
  error: string | null;
}

const initialState: BookingState = {
  loading: false,
  error: null,
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(bookSeat.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(bookSeat.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(bookSeat.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default bookingSlice.reducer;
