import { createSlice } from "@reduxjs/toolkit";
import { fetchRoomDetails, fetchRooms } from "../api/roomsAPI";
import { IRoom } from "../types";

interface RoomsState {
  room: IRoom | null;
  rooms: IRoom[];
  loading: boolean;
  error: string | null;
}

const initialState: RoomsState = {
  room: null,
  rooms: [],
  loading: false,
  error: null,
};

const roomsSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRooms.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRooms.fulfilled, (state, action) => {
        state.rooms = action.payload;
        state.loading = false;
      })
      .addCase(fetchRooms.rejected, (state, action) => {
        state.error = action.error.message || "Failed to fetch rooms";
        state.loading = false;
      })
      .addCase(fetchRoomDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRoomDetails.fulfilled, (state, action) => {
        state.room = action.payload;
        state.loading = false;
      })
      .addCase(fetchRoomDetails.rejected, (state, action) => {
        state.error = action.error.message || "Failed to fetch room details";
        state.loading = false;
      });
  },
});

export default roomsSlice.reducer;
