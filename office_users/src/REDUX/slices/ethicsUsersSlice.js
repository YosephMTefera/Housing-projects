import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiRequest from "../../utils/request";

const token = sessionStorage.getItem("tID");

export const fetchEthicsUsers = createAsyncThunk("ethicsUsers/fetchEthicsUsers", async({page,sort,status,username,phone}) => {
  return apiRequest
    .get(`/accusation_acceptor_user_api/get_accusation_acceptor?page=${page}&sort=${sort}&status=${status}&username=${username}&phone=${phone}`, {
      headers: {
        "Content-Type": "application/json",
        get_accusers_api: process.env.REACT_APP_GET_ACCUSERS_API,
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
 
});

const initialState = {
  ethicsUsers: [],
  loading: false,
  error: false,
};

const ethicsUsersSlice = createSlice({
  name: "EthicsUsers",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchEthicsUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchEthicsUsers.fulfilled, (state, action) => {
      state.loading = false;
      state.ethicsUsers = action.payload;
      state.error = false;
    });
    builder.addCase(fetchEthicsUsers.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export const ethicsUsersAction = ethicsUsersSlice.actions;

export default ethicsUsersSlice;
