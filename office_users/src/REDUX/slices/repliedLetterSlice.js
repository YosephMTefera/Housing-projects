import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiRequest from "../../utils/request";


const token = sessionStorage.getItem("tID");

export const fetchRepliedLetters = createAsyncThunk("repliedletters/fetchRepliedLetters", () => {
  return apiRequest
    .get(`/reply_letter_api/get_replied_letters`, {
      headers: {
        "Content-Type": "application/json",
        get_user_api: process.env.REACT_APP_GET_USER_API,
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
});


const initialState = {
  repliedLetters: [],
  loading: false,
  error: false,
};

const repliedLettersSlice = createSlice({
  name: "REPLIEDLETTERS",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchRepliedLetters.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchRepliedLetters.fulfilled, (state, action) => {
      state.loading = false;
      state.repliedLetters = action.payload;
      state.error = false;
    });
    builder.addCase(fetchRepliedLetters.rejected, (state) => {
      state.loading = false;
      state.repliedLetters = []
      state.error = true;
    });
  },
});

export const repliedLettersAction = repliedLettersSlice.actions;

export default repliedLettersSlice;
