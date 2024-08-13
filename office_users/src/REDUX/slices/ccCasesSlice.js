import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiRequest from "../../utils/request";


const token = sessionStorage.getItem("tID");

export const fetchCcCases = createAsyncThunk("ccCases/fetchCcCases", async({page,sort,status,division,caseNumber,late,type}) => {
  
  if(type ==="reply"){
    return apiRequest
    .get(`/reply_case_api/get_replied_case_cc?page=${page}&sort=${sort}&status=${status}&division=${division}&case_number=${caseNumber}&late=${late}`, {
      headers: {
        "Content-Type": "application/json",
        get_rplycasecc_api: process.env.REACT_APP_GET_RPLYCASECC_API,
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
  }
  
  return apiRequest
    .get(`/forward_case_api/get_forwarded_case_cc?page=${page}&sort=${sort}&status=${status}&division=${division}&case_number=${caseNumber}&late=${late}`, {
      headers: {
        "Content-Type": "application/json",
        get_casefrwdcc_api: process.env.REACT_APP_GET_CASEFRWDCC_API,
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
});


const initialState = {
  cCCases: [],
  loading: false,
  error: false,
};

const cCCaseSlice = createSlice({
  name: "CCCASES",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchCcCases.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCcCases.fulfilled, (state, action) => {
      state.loading = false;
      state.cCCases = action.payload;
      state.error = false;
    });
    builder.addCase(fetchCcCases.rejected, (state) => {
      state.loading = false;
      state.cCCases = []
      state.error = true;
    });
  },
});

export const cCCaseAction = cCCaseSlice.actions;

export default cCCaseSlice;
