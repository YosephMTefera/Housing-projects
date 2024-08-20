import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiRequest from "../../utils/request";

const token = sessionStorage.getItem("tID");

export const fetchDivision = createAsyncThunk("division/fetchDivision", async({page,sort,name,status}) => {
  return apiRequest
    .get(`/division_api/get_division?page=${page}&sort=${sort}&searchName=${name}&status=${status}`, {
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

const divisionSlice = createSlice({
  name: "DIVISION",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchDivision.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchDivision.fulfilled, (state, action) => {
      state.loading = false;
      state.divisions = action.payload;
      state.error = false;
    });
    builder.addCase(fetchDivision.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export const divisionAction = divisionSlice.actions;

export default divisionSlice;
