import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiRequest from "../../utils/request";


const token = sessionStorage.getItem("tID");

export const fetchReplyCases = createAsyncThunk("replycases/fetchReplyCases", async({page,sort,status,division,case_number,late}) => {
  return apiRequest
    .get(`/reply_case_api/get_replied_case?page=${page}&sort=${sort}&status=${status}&division=${division}&case_number=${case_number}&late=${late}`, {
      headers: {
        "Content-Type": "application/json",
        get_rplycase_api: process.env.REACT_APP_GET_RPLYCASE_API,
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
});


const initialState = {
  repliedCases: [],
  loading: false,
  error: false,
};

const repliedCaseSlice = createSlice({
  name: "REPLIEDCASES",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchReplyCases.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchReplyCases.fulfilled, (state, action) => {
      state.loading = false;
      state.repliedCases = action.payload;
      state.error = false;
    });
    builder.addCase(fetchReplyCases.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export const repliedCaseAction = repliedCaseSlice.actions;

export default repliedCaseSlice;
