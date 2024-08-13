import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiRequest from "../../utils/request";


const token = sessionStorage.getItem("tID");

export const fetchOfficeUsers = createAsyncThunk("officeUsers/fetchOfficeUsers", () => {
  return apiRequest
    .get(`/office_user_api/get_all_office_users`, {
      headers: {
        "Content-Type": "application/json",
        get_users_api: process.env.REACT_APP_GET_USERS_API,
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
});


const initialState = {
  officeUsers: [],
  loading: false,
  error: false,
};

const officeUsersSlice = createSlice({
  name: "OFFICEUSERS",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchOfficeUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchOfficeUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.officeUsers = action.payload;
      state.error = false;
    });
    builder.addCase(fetchOfficeUsers.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export const officeUsersAction = officeUsersSlice.actions;

export default officeUsersSlice;
