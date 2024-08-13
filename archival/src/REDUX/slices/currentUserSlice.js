import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiRequest from "../../utils/request";
import {jwtDecode} from 'jwt-decode';

const initialState = {
  loading: false,
  data: [],
  error: "",
};

const token = sessionStorage?.getItem("tID");
const stringifedToken =token.toString();
const decodedToken = jwtDecode(stringifedToken);
const userID = decodedToken?.user?.id;

export const fetchCurrentUser = createAsyncThunk(
  "CurrentUser/fetchCurrentUser",
  async () => {
    return apiRequest
      .get(`/archival_user_api/get_archival_user/${userID}`, {
        headers: {
          Authorization: "Token " + token,
          get_archuser_api: process.env.REACT_APP_GET_ARCHUSER_API,
        },
      })
      .then((res) => res.data)
   
  }
);

const currentUserSlice = createSlice({
  name: "CurrentUser",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchCurrentUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCurrentUser.fulfilled, (state, actions) => {
      state.loading = false;
      state.data = actions.payload;
      state.error = "";
    });
    builder.addCase(fetchCurrentUser.rejected, (state, actions) => {
      state.loading = false;
      state.data = [];
      state.error = actions.error.message;
    });
  },
});

export default currentUserSlice.reducer;
