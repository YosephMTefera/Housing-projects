import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiRequest from "../../utils/request";

const initialState = {
  data: [],
  loading: false,
  error: "",
};

const token = sessionStorage?.getItem("tID");

export const fetchOfficeUser = createAsyncThunk(
  "OfficeUser/fetchOfficeUser",
  async () => {
    return apiRequest
      .get("/office_user_api/get_all_office_users", {
        headers: {
          Authorization: "Token " + token,
          get_users_api: process.env.REACT_APP_GET_USERS_API,
        },
      })
      .then((res) =>
        res?.data?.filter(
          (item) =>
            item?.level === "MainExecutive" ||
            item?.level === "DivisionManagers"
        )
      )
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

const officeUserSlice = createSlice({
  name: "OfficeUser",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchOfficeUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchOfficeUser.fulfilled, (state, actions) => {
      state.loading = false;
      state.data = actions.payload;
      state.error = "";
    });
    builder.addCase(fetchOfficeUser.rejected, (state, actions) => {
      state.loading = false;
      state.data = [];
      state.error = actions.error.message;
    });
  },
});

export default officeUserSlice.reducer;

export const officeUserActions = officeUserSlice.actions;
