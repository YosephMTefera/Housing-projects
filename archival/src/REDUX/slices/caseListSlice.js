import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiRequest from "../../utils/request";

const initialState = {
  data: [],
  loading: false,
  error: "",
};

const token = sessionStorage?.getItem("tID");

export const fetchCaseList = createAsyncThunk(
  "CaseList/fetchCaseList",
  async () => {
    return apiRequest
      .get("/case_list_api/get_case_list", {
        headers: {
          Authorization: "Token " + token,
          get_user_api: process.env.REACT_APP_GET_USER_API,
        },
      })
      .then((res) => res?.data)
     
  }
);

const caseListSlice = createSlice({
  name: "CaseList",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchCaseList.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCaseList.fulfilled, (state, actions) => {
      state.loading = false;
      state.data = actions.payload;
      state.error = "";
    });
    builder.addCase(fetchCaseList.rejected, (state, actions) => {
      state.loading = false;
      state.data = [];
      state.error = actions.error.message;
    });
  },
});

export default caseListSlice.reducer;

export const caseListsActions = caseListSlice.actions;
