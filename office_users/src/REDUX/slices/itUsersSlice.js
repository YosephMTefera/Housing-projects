import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiRequest from "../../utils/request";


const token = sessionStorage.getItem("tID");

export const fetchItUsers = createAsyncThunk("it/fetchItUsers", async({page,sort,firstname,username,phone,status}) => {
  return apiRequest
    .get(`/it_user_api/get_it_user?page=${page}&sort=${sort}&firstname=${firstname}&username=${username}&phone=${phone}&status=${status}`, {
      headers: {
        "Content-Type": "application/json",
        get_itusers_api: process.env.REACT_APP_GET_ITUSERS_API,
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
});


const initialState = {
  itusers: [],
  loading: false,
  error: false,
};

const itusersSlice = createSlice({
  name: "IT",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchItUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchItUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.itusers = action.payload;
      state.error = false;
    });
    builder.addCase(fetchItUsers.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export const itUsersAction = itusersSlice.actions;

export default itusersSlice;
