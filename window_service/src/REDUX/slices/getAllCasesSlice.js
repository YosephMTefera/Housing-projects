import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiRequest from "../../utils/request";


const token = sessionStorage.getItem("tID");

export const fetchAllCases = createAsyncThunk("allCases/fetchAllCases",async () => {
  return apiRequest
    .get(`/customer_case_api/get_all_cases`, {
      headers: {
        "Content-Type": "application/json",
        get_gecases_api: process.env.REACT_APP_GET_GECASES_API,
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
});


const initialState = {
  cases: [],
  loading: false,
  error: false,
};

const allCasesSlice = createSlice({
  name: "ALLCASES",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchAllCases.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllCases.fulfilled, (state, action) => {
      state.loading = false;
      state.cases = action.payload;
      state.error = false;
    });
    builder.addCase(fetchAllCases.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export const allCasesAction = allCasesSlice.actions;

export default allCasesSlice;
