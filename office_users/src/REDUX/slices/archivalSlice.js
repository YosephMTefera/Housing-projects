import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiRequest from "../../utils/request";


const token = sessionStorage.getItem("tID");

export const fetchArchivalUsers = createAsyncThunk("archivalUsers/fetchArchivalUsers",async ({page,sort,name,username,status}) => {
  return apiRequest
    .get(`/archival_user_api/get_archival_user?page=${page}&sort=${sort}&firstname=${name}&username=${username}&status=${status}`, {
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
  name: "ARCHIVALUSERS",
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

export const archvialUsersAction = archivalUsersSlice.actions;

export default archivalUsersSlice;
