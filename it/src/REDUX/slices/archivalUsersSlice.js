import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiRequest from "../../utils/request";


const token = sessionStorage.getItem("tID");

export const fetchArchivalUsers = createAsyncThunk("archival/fetchArchivalUsers", async({page,sort,status,username,phone}) => {
  return apiRequest
    .get(`/archival_user_api/get_archival_user?page=${page}&sort=${sort}&status=${status}&username=${username}&phone=${phone}`, {
      headers: {
        "Content-Type": "application/json",
        get_arch_users_api: process.env.REACT_APP_GET_ARCH_USERS_API,
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
});


const initialState = {
  archivalUsers: [],
  loading: false,
  error: false,
};

const archivalUsersSlice = createSlice({
  name: "ARCHIVAL",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchArchivalUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchArchivalUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.archivalUsers = action.payload;
      state.error = false;
    });
    builder.addCase(fetchArchivalUsers.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export const archivalUsersAction = archivalUsersSlice.actions;

export default archivalUsersSlice;
