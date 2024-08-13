import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiRequest from "../../utils/request";

const token = sessionStorage.getItem("tID");

export const fetchAllDirectorate = createAsyncThunk(
  "allDirectorate/fetchAllDirectorate",
  async() => {
    return apiRequest
      .get(`/directorate_api/get_all_directorate`, {
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

const allDirectorateSlice = createSlice({
  name: "ALLDIRECTORATE",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchAllDirectorate.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllDirectorate.fulfilled, (state, action) => {
      state.loading = false;
      state.directorates = action.payload;
      state.error = false;
    });
    builder.addCase(fetchAllDirectorate.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export const allDirectorateAction = allDirectorateSlice.actions;

export default allDirectorateSlice;
