import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiRequest from "../../utils/request";

const token = sessionStorage.getItem("tID");

export const fetchforwardIncomingLetter = createAsyncThunk("forwardincomingLetters/fetchforwardIncomingLetters",async ({page,sort,incomingLtrNum,attentionFrom,late}) => {
 
 
  return apiRequest
    .get(`/forward_incoming_ltr_api/get_forwarded_inc_letters?page=${page}&sort=${sort}&incoming_letter_number=${incomingLtrNum}&attention_from=${attentionFrom}&late=${late}`, {
      headers: {
  
        get_frwinc_ltr_api: process.env.REACT_APP_GET_FRWINC_LTR_API,
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
 
});

const initialState = {
  forwardIncomingLetters: [],
  loading: false,
  error: false,
};

const forwardIncomingLettersSlice = createSlice({
  name: "FORWARDINCOMINGLETTERS",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchforwardIncomingLetter.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchforwardIncomingLetter.fulfilled, (state, action) => {
      state.loading = false;
      state.forwardIncomingLetters = action.payload;
      state.error = false;
    });
    builder.addCase(fetchforwardIncomingLetter.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export const forwardIncomingLettersAction = forwardIncomingLettersSlice.actions;

export default forwardIncomingLettersSlice;
