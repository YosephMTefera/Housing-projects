import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiRequest from "../../utils/request";

const token = sessionStorage.getItem("tID");

export const fetchIncomingLetter = createAsyncThunk("incomingLetters/fetchIncomingLetters",async ({page,sort,nimera,incomingLtrNum,attentionFrom,status,late}) => {
 
 
  return apiRequest
    .get(`/incoming_ltr/get_incoming_ltr?page=${page}&sort=${sort}&incomingLtrNum=${incomingLtrNum}&nimera=${nimera}&attention_from=${attentionFrom}&late=${late}&status=${status}`, {
      headers: {
  
        get_incletters_api: process.env.REACT_APP_GET_INCLETTERS_API,
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
 
});

const initialState = {
  incomingLetters: [],
  loading: false,
  error: false,
};

const incomingLettersSlice = createSlice({
  name: "INCOMINGLETTERS",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchIncomingLetter.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchIncomingLetter.fulfilled, (state, action) => {
      state.loading = false;
      state.incomingLetters = action.payload;
      state.error = false;
    });
    builder.addCase(fetchIncomingLetter.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export const incomingLettersAction = incomingLettersSlice.actions;

export default incomingLettersSlice;
