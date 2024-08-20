import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiRequest from "../../utils/request";

const token = sessionStorage.getItem("tID");

export const fetchAllDivision = createAsyncThunk("allDivision/fetchAllDivision", async() => {
  return apiRequest
    .get(`/division_api/get_all_divisions`, {
      headers: {
        "Content-Type": "application/json",
        get_divs_api: process.env.REACT_APP_GET_DIVS_API,
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
    
});

const initialState = {
  divisions: [],
  loading: false,
  error: false,
};

const allDivisionSlice = createSlice({
  name: "ALLDIVISION",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchAllDivision.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllDivision.fulfilled, (state, action) => {
      state.loading = false;
      state.divisions = action.payload;
      state.error = false;
    });
    builder.addCase(fetchAllDivision.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export const divisionAction = allDivisionSlice.actions;

export default allDivisionSlice;
