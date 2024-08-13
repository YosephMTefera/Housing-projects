import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiRequest from "../../utils/request";


const token = sessionStorage.getItem("tID");

export const fetchForwardLetters = createAsyncThunk("forwardletters/fetchForwardLetters", () => {
  return apiRequest
    .get(`/forward_letter_api/get_forwarded_letters`, {
      headers: {
        "Content-Type": "application/json",
        get_user_api: process.env.REACT_APP_GET_USER_API,
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
});


const initialState = {
  forwardLetters: [],
  loading: false,
  error: false,
};

const forwardLettersSlice = createSlice({
  name: "FORWARDLETTERS",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchForwardLetters.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchForwardLetters.fulfilled, (state, action) => {
      state.loading = false;
      state.forwardLetters = action.payload;
      state.error = false;
    });
    builder.addCase(fetchForwardLetters.rejected, (state) => {
      state.loading = false;
      state.forwardLetters = []
      state.error = true;
    });
  },
});

export const forwardLettersAction = forwardLettersSlice.actions;

export default forwardLettersSlice;
