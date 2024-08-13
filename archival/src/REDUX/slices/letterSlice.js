import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiRequest from "../../utils/request";

const initialState = {
  letters: [],
  loading: false,
  error: "",
};

const token = sessionStorage?.getItem("tID");

export const fetchLetter = createAsyncThunk("Letter/fetchLetter", async ({page,sort,letterNum,letterType,status}) => {
  return apiRequest
    .get(`/archival_letter_api/get_letter?page=${page}&sort=${sort}&letter_number=${letterNum}&letter_type=${letterType}&status=${status}`, {
      headers: {
        Authorization: "Token " + token,
        get_geletters_api: process.env.REACT_APP_GET_GELETTERS_API,
      },
    })
    .then((res) => res?.data)
  
});

const letterSlice = createSlice({
  name: "Letter",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchLetter.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchLetter.fulfilled, (state, actions) => {
      state.loading = false;
      state.letters = actions.payload;
      state.error = "";
    });
    builder.addCase(fetchLetter.rejected, (state, actions) => {
      state.loading = false;
      state.letters = [];
      state.error = actions.error.message;
    });
  },
});

export default letterSlice.reducer;

export const lettersActions = letterSlice.actions;
