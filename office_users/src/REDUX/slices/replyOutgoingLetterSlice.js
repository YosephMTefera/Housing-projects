import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiRequest from "../../utils/request";

const token = sessionStorage.getItem("tID");

export const fetchreplyoutgoingLetter = createAsyncThunk("replyoutgoingLetters/fetchforwardoutgoingLetters",async ({page,sort,outgoingLtrNum,status,late}) => {
 
 
  return apiRequest
    .get(`/rply_outgoing_ltr_api/get_replied_outg_letter?page=${page}&sort=${sort}&outgoing_letter_number=${outgoingLtrNum}&status=${status}&late=${late}`, {
      headers: {
  
        get_rpliedoutptltr_api: process.env.REACT_APP_GET_RPLIEDOUTPTLTR_API,
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
 
});

const initialState = {
  replyoutgoingLetters: [],
  loading: false,
  error: false,
};

const replyoutgoingLettersSlice = createSlice({
  name: "REPLYoutgoingLETTERS",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchreplyoutgoingLetter.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchreplyoutgoingLetter.fulfilled, (state, action) => {
      state.loading = false;
      state.replyoutgoingLetters = action.payload;
      state.error = false;
    });
    builder.addCase(fetchreplyoutgoingLetter.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export const replyoutgoingLettersAction = replyoutgoingLettersSlice.actions;

export default replyoutgoingLettersSlice;
