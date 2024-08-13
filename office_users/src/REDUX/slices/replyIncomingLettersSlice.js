import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiRequest from "../../utils/request";

const token = sessionStorage.getItem("tID");

export const fetchreplyIncomingLetter = createAsyncThunk("replyncomingLetters/fetchforwardIncomingLetters",async ({page,sort,incomingLtrNum,attentionFrom,late}) => {
 
 
  return apiRequest
    .get(`/reply_incoming_ltr_api/get_replied_inc_letter?page=${page}&sort=${sort}&incoming_letter_number=${incomingLtrNum}&attention_from=${attentionFrom}&late=${late}`, {
      headers: {
  
        get_rplyincltrs_api: process.env.REACT_APP_GET_RPLYINCLTRS_API,
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
 
});

const initialState = {
  replyIncomingLetters: [],
  loading: false,
  error: false,
};

const replyIncomingLettersSlice = createSlice({
  name: "REPLYINCOMINGLETTERS",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchreplyIncomingLetter.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchreplyIncomingLetter.fulfilled, (state, action) => {
      state.loading = false;
      state.replyIncomingLetters = action.payload;
      state.error = false;
    });
    builder.addCase(fetchreplyIncomingLetter.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export const replyIncomingLettersAction = replyIncomingLettersSlice.actions;

export default replyIncomingLettersSlice;
