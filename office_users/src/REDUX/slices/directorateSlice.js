import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiRequest from "../../utils/request";


const token = sessionStorage.getItem("tID");

export const fetchDirectorate = createAsyncThunk("directorate/fetchDirectoate",async ({page,sort,name,division,status}) => {
  return apiRequest
    .get(`/directorate_api/get_directorate?page=${page}&sort=${sort}&division=${division}&searchName=${name}&status=${status}`, {
      headers: {
        "Content-Type": "application/json",
        get_directs_api: process.env.REACT_APP_GET_DIRECTS_API,
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
});


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

export const directoateAction = directorateSlice.actions;

export default directorateSlice;
