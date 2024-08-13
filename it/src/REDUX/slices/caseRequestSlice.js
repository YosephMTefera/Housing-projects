import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiRequest from "../../utils/request";

const token = sessionStorage.getItem("tID");

export const fetchCaseRequests = createAsyncThunk("caseRequests/fetchCaseRequests",async ({page,sort,status,answerBy,division,searchName}) => {
  return apiRequest
    .get(`/case_list_api/get_case_list?page=${page}&sort=${sort}&searchName=${searchName}&status=${status}&answer_by=${answerBy}&division=${division}`, {
      headers: {
        "Content-Type": "application/json",
        get_casegetslist_api: process.env.REACT_APP_GET_CASEGETSLIST_API,
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
 
});

const initialState = {
  caseRequests: [],
  loading: false,
  error: false,
};

const caseRequestSlice = createSlice({
  name: "CASEREQUESTS",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchCaseRequests.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCaseRequests.fulfilled, (state, action) => {
      state.loading = false;
      state.caseRequests = action.payload;
      state.error = false;
    });
    builder.addCase(fetchCaseRequests.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export const caseRequestsAction = caseRequestSlice.actions;

export default caseRequestSlice;
