import { createAsyncThunk } from "@reduxjs/toolkit";
import { Axios } from "../app/config";
import { IRoom } from "../types";

export const fetchRooms = createAsyncThunk<IRoom[]>(
  "rooms/fetchRooms",
  async () => {
    const response = await Axios.get("rooms/");
    return response.data;
  }
);

export const fetchRoomDetails = createAsyncThunk<IRoom, number>(
  "rooms/fetchRoomDetails",
  async (roomId) => {
    const response = await Axios.get(`rooms/${roomId}/`);
    return response.data;
  }
);
