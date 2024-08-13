import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiRequest from "../../utils/request";

const token = sessionStorage.getItem("tID");

export const fetchForwardOutgoingLetter = createAsyncThunk("forwardoutgoingLetters/fetchforwardOutgoingLetters",async ({page,sort,outgoingLtrNum,late,status}) => {
 
 
  return apiRequest
    .get(`/frwd_outgoing_ltr_api/get_forwarded_outg_letters?page=${page}&sort=${sort}&outgoing_letter_number=${outgoingLtrNum}&status=${status}&late=${late}`, {
      headers: {
  
        get_frwdgetoutputltr_api: process.env.REACT_APP_GET_FRWDGETOUTPUTLTR_API,
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
 
});

const initialState = {
  forwardOutgoingLetters: [],
  loading: false,
  error: false,
};

const forwardOutgoingLettersSlice = createSlice({
  name: "FORWARDOUTGOINGLETTERS",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchForwardOutgoingLetter.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchForwardOutgoingLetter.fulfilled, (state, action) => {
      state.loading = false;
      state.forwardOutgoingLetters = action.payload;
      state.error = false;
    });
    builder.addCase(fetchForwardOutgoingLetter.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export const forwardOutgoingLettersAction = forwardOutgoingLettersSlice.actions;

export default forwardOutgoingLettersSlice;
