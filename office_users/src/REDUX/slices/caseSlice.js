import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiRequest from "../../utils/request";


const token = sessionStorage.getItem("tID");

export const fetchCases = createAsyncThunk("cases/fetchCases",async ({page,sort,status,division,caseNumber,late}) => {
  return apiRequest
    .get(`/customer_case_api/get_case?page=${page}&sort=${sort}&status=${status}&division=${division}&case_number=${caseNumber}&late=${late}`, {
      headers: {
      
        get_gecases_api: process.env.REACT_APP_GET_GECASES_API,
        Authorization: `Bearer ${token}`,
      },
    }).then((res)=>res.data)
});


const initialState = {
  cases: [],
  loading: false,
  error: false,
};

const casesSlice = createSlice({
  name: "CASES",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchCases.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCases.fulfilled, (state, action) => {
      state.loading = false;
      state.cases = action.payload;
      state.error = false;
    });
    builder.addCase(fetchCases.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export const casesAction = casesSlice.actions;

export default casesSlice;
