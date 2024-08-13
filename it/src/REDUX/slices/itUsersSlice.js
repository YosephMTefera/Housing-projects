import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiRequest from "../../utils/request";

const token = sessionStorage?.getItem("tID");

const initialState = {
  itUsers: [],
  loading: false,
  error: false,
};

export const fetchITUsers = createAsyncThunk(
  "ITUsers/fetchITUsers",
  async ({page,sort,status,username}) => {
    return apiRequest
      .get(`/it_user_api/get_it_user?page=${page}&sort=${sort}&status=${status}&username=${username}`, {
        headers: {
          "Content-Type": "application/json",
          get_itusers_api: process.env.REACT_APP_GET_ITUSERS_API,
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.data)
      
  }
);

const itUsersSlice = createSlice({
  name: "ITUsers",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchITUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchITUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.itUsers = action.payload;
      state.error = false;
    });
    builder.addCase(fetchITUsers.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export const itUsersAction = itUsersSlice.actions;

export default itUsersSlice;
