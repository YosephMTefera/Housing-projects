import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiRequest from "../../utils/request";

const initialState = {
  data: [],
  loading: false,
  error: "",
};

const token = sessionStorage?.getItem("tID");

export const fetchDivision = createAsyncThunk("Division/fetchDivision", async () => {
  return apiRequest
    .get("/division_api/get_division", {
      headers: {
        Authorization: "Token " + token,
        get_user_api: process.env.REACT_APP_GET_USER_API,
      },
    })
    .then((res) => res?.data)
    .catch((error) => {
      if (
        error.response.status === 401 &&
        error.response.data.Message === "Token expired. Please log in again."
      ) {
        window.location.href = "/login";
      }
    });
});

const divisionSlice = createSlice({
  name: "Division",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchDivision.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchDivision.fulfilled, (state, actions) => {
      state.loading = false;
      state.data = actions.payload;
      state.error = "";
    });
    builder.addCase(fetchDivision.rejected, (state, actions) => {
      state.loading = false;
      state.data = [];
      state.error = actions.error.message;
    });
  },
});

export default divisionSlice.reducer;

export const divisionsActions = divisionSlice.actions;
