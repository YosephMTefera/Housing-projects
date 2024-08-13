import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiRequest from "../../utils/request";

const token = sessionStorage?.getItem("tID");

const initialState = {
  itUsers: [],
  loading: false,
  error: false,
};

export const fetchAllITUsers = createAsyncThunk(
  "allITUsers/fetchAllITUsers",
  async () => {
    return apiRequest
      .get(`/it_user_api/get_all_it_user`, {
        headers: {
          "Content-Type": "application/json",
          get_itusers_api: process.env.REACT_APP_GET_ITUSERS_API,
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.data)
      
  }
);

const allItUsersSlice = createSlice({
  name: "ALLITUSERS",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchAllITUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllITUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.itUsers = action.payload;
      state.error = false;
    });
    builder.addCase(fetchAllITUsers.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export const allItUsersAction = allItUsersSlice.actions;

export default allItUsersSlice;
