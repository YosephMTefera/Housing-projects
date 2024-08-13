import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiRequest from "../../utils/request";


const token = sessionStorage.getItem("tID");

export const fetchForwardCases = createAsyncThunk("forwardcases/fetchForwardCases", async({page,sort,status,division,caseNumber,late}) => {
  return apiRequest
    .get(`/forward_case_api/get_forwarded_case?page=${page}&sort=${sort}&status=${status}&division=${division}&case_number=${caseNumber}&late=${late}`, {
      headers: {
        "Content-Type": "application/json",
        get_casefrwded_case_api: process.env.REACT_APP_GET_CASEFRWDED_CASE_API,
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
});


const initialState = {
  forwardCases: [],
  loading: false,
  error: false,
};

const forwardCaseSlice = createSlice({
  name: "FORWARDCASES",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchForwardCases.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchForwardCases.fulfilled, (state, action) => {
      state.loading = false;
      state.forwardCases = action.payload;
      state.error = false;
    });
    builder.addCase(fetchForwardCases.rejected, (state) => {
      state.loading = false;
      state.forwardCases = []
      state.error = true;
    });
  },
});

export const forwardCaseAction = forwardCaseSlice.actions;

export default forwardCaseSlice;
