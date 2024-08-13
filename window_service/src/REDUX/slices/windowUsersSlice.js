import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiRequest from "../../utils/request";

const token = sessionStorage.getItem("tID");

export const fetchWindowUsers = createAsyncThunk("windowUsers/fetchWindowUsers",async ({page,sort,status,username,phone}) => {
  return apiRequest
    .get(`/window_service_user_api/get_window_service_user?page=${page}&sort=${sort}&status=${status}&username=${username}&phone=${phone}`, {
      headers: {
        "Content-Type": "application/json",
        get_windusers_api: process.env.REACT_APP_GET_WINDUSERS_API,
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
 
});

const initialState = {
  windowUsers: [],
  loading: false,
  error: false,
};

const windowUsersSlice = createSlice({
  name: "WindowUsers",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchWindowUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchWindowUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.windowUsers = action.payload;
      state.error = false;
    });
    builder.addCase(fetchWindowUsers.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export const windowUsersAction = windowUsersSlice.actions;

export default windowUsersSlice;
