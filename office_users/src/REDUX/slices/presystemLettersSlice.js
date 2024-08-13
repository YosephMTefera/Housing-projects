import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiRequest from "../../utils/request";

const token = sessionStorage.getItem("tID");

export const fetchPresystemLetter = createAsyncThunk("presystemLetters/fetchPresystemLetters",async ({page,sort,letter_number,status,type}) => {
 
 
  return apiRequest
    .get(`/archival_letter_api/get_letter?page=${page}&sort=${sort}&letter_number=${letter_number}&letter_type=${type}&status=${status}`, {
      headers: {
  
        get_geletters_api: process.env.REACT_APP_GET_GELETTERS_API,
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
 
});

const initialState = {
  presystemLetters: [],
  loading: false,
  error: false,
};

const presystemLettersSlice = createSlice({
  name: "PRESYSTEMLETTERS",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchPresystemLetter.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchPresystemLetter.fulfilled, (state, action) => {
      state.loading = false;
      state.presystemLetters = action.payload;
      state.error = false;
    });
    builder.addCase(fetchPresystemLetter.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export const presystemLettersAction = presystemLettersSlice.actions;

export default presystemLettersSlice;
