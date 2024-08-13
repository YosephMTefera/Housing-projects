import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiRequest from "../../utils/request";

const token = sessionStorage.getItem("tID");

export const fetchCasesHistory = createAsyncThunk(
  "cases/fetchCasesHistory",
  async () => {
    return apiRequest
      .get(`/customer_case_history_api/get_case_history`, {
        headers: {
          "Content-Type": "application/json",
          get_user_api: process.env.REACT_APP_GET_USER_API,
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => res.data)
    
  }
);

const initialState = {
  caseHistory: [],
  loading: false,
  error: false,
};

const caseHistorySlice = createSlice({
  name: "CASESHISTORY",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchCasesHistory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCasesHistory.fulfilled, (state, action) => {
      state.loading = false;
      state.caseHistory = action.payload;
      state.error = false;
    });
    builder.addCase(fetchCasesHistory.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export const caseAction = caseHistorySlice.actions;

export default caseHistorySlice;
