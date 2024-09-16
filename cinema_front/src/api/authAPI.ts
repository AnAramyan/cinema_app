import { createAsyncThunk } from "@reduxjs/toolkit";
import { Axios } from "../app/config";
import { IUser } from "../types";

export const loginUser = createAsyncThunk(
  "auth/login",
  async (
    credentials: { username: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await Axios.post("login/", credentials);
      const data = response.data;
      localStorage.setItem("token", data.access);
      return data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.detail);
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async (userDetails: IUser, { rejectWithValue }) => {
    try {
      const response = await Axios.post("register/", userDetails);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      localStorage.removeItem("token");
    } catch (error: any) {
      return rejectWithValue(error.response.data.detail);
    }
  }
);
