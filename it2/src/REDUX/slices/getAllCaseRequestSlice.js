import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiRequest from "../../utils/request";

const token = sessionStorage.getItem("tID");

export const fetchAllCaseRequests = createAsyncThunk("allCaseRequests/fetchAllCaseRequests",async () => {
  return apiRequest
    .get(`/case_list_api/get_all_case_list`, {
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

const allCaseRequestSlice = createSlice({
  name: "ALLCASEREQUESTS",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchAllCaseRequests.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllCaseRequests.fulfilled, (state, action) => {
      state.loading = false;
      state.caseRequests = action.payload;
      state.error = false;
    });
    builder.addCase(fetchAllCaseRequests.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export const caseRequestsAction = allCaseRequestSlice.actions;

export default allCaseRequestSlice;
