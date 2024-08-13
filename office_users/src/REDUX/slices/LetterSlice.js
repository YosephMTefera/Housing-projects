import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiRequest from "../../utils/request";


const token = sessionStorage.getItem("tID");

export const fetchLetters = createAsyncThunk("letters/fetchLetters", async({page,sort,letterNumber,status,sentFrom,sentTo}) => {
  return apiRequest
    .get(`/archival_letter_api/get_letter?page=${page}&sort=${sort}&letter_number=${letterNumber}&status=${status}&sent_from=${sentFrom}&sent_to=${sentTo}`, {
      headers: {
        "Content-Type": "application/json",
        get_geletters_api: process.env.REACT_APP_GET_GELETTERS_API,
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
});


const initialState = {
  letters: [],
  loading: false,
  error: false,
};

const lettersSlice = createSlice({
  name: "LETTERS",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchLetters.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchLetters.fulfilled, (state, action) => {
      state.loading = false;
      state.letters = action.payload;
      state.error = false;
    });
    builder.addCase(fetchLetters.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export const lettersAction = lettersSlice.actions;

export default lettersSlice;
