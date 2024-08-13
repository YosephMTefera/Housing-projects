import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiRequest from "../../utils/request";


const token = sessionStorage.getItem("tID");

export const fetchAllOfficeUsers = createAsyncThunk("allOfficeUsers/fetchAllOfficeUsers", () => {
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

const allOfficeUsersSlice = createSlice({
  name: "ALLOFFICEUSERS",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchAllOfficeUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllOfficeUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.officeUsers = action.payload;
      state.error = false;
    });
    builder.addCase(fetchAllOfficeUsers.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export const allOfficeUsersAction = allOfficeUsersSlice.actions;

export default allOfficeUsersSlice;
