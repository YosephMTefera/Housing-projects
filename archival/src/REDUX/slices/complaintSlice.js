import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiRequest from "../../utils/request";

const initialState = {
  data: [],
  loading: false,
  error: "",
};

const token = sessionStorage?.getItem("tID");

export const fetchComplaint = createAsyncThunk(
  "Complaint/fetchComplaint",
  async () => {
    return apiRequest
      .get("/customer_complaint_api/get_complaint", {
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
  }
);

const complaintSlice = createSlice({
  name: "Complaint",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchComplaint.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchComplaint.fulfilled, (state, actions) => {
      state.loading = false;
      state.data = actions.payload;
      state.error = "";
    });
    builder.addCase(fetchComplaint.rejected, (state, actions) => {
      state.loading = false;
      state.data = [];
      state.error = actions.error.message;
    });
  },
});

export default complaintSlice.reducer;

export const complaintsActions = complaintSlice.actions;
