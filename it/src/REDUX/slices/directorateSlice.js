import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiRequest from "../../utils/request";

const token = sessionStorage.getItem("tID");

export const fetchDirectorate = createAsyncThunk(
  "directorate/fetchDirectorate",
  async({page,sort,status,searchName,division}) => {
    return apiRequest
      .get(`/directorate_api/get_directorate?page=${page}&sort=${sort}&status=${status}&searchName=${searchName}&division=${division}`, {
        headers: {
          "Content-Type": "application/json",
          get_directs_api: process.env.REACT_APP_GET_DIRECTS_API,
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.data)
     
  }
);

const initialState = {
  directorates: [],
  loading: false,
  error: false,
};

const directorateSlice = createSlice({
  name: "DIRECTORATE",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchDirectorate.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchDirectorate.fulfilled, (state, action) => {
      state.loading = false;
      state.directorates = action.payload;
      state.error = false;
    });
    builder.addCase(fetchDirectorate.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export const directorateAction = directorateSlice.actions;

export default directorateSlice;
