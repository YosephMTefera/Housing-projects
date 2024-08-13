import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiRequest from "../../utils/request";

const token = sessionStorage.getItem("tID");

export const fetchreplyPresystemLetter = createAsyncThunk("replypresystemLetters/fetchforwardPresystemLetters",async ({page,sort,incomingLtrNum,attentionFrom,late}) => {
 
 
  return apiRequest
    .get(`/reply_letter_api/get_replied_letter?page=${page}&sort=${sort}&incoming_letter_number=${incomingLtrNum}&attention_from=${attentionFrom}&late=${late}`, {
      headers: {
  
        get_rplyltrspath_api: process.env.REACT_APP_GET_RPLYLTRSPATH_API,
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
 
});

const initialState = {
  replyPresystemLetters: [],
  loading: false,
  error: false,
};

const replyPresystemLettersSlice = createSlice({
  name: "REPLYPRESYSTEMLETTERS",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchreplyPresystemLetter.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchreplyPresystemLetter.fulfilled, (state, action) => {
      state.loading = false;
      state.replyPresystemLetters = action.payload;
      state.error = false;
    });
    builder.addCase(fetchreplyPresystemLetter.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export const replyPresystemLettersAction = replyPresystemLettersSlice.actions;

export default replyPresystemLettersSlice;
