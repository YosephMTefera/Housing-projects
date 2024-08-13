import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiRequest from "../../utils/request";

const token = sessionStorage.getItem("tID");

export const fetchForwardInternalLetter = createAsyncThunk("forwardinternalLetters/fetchforwardInternalLetters",async ({page,sort,internalLtrNum,late,status}) => {
 
 
  return apiRequest
    .get(`/frwd_internal_api/get_forwarded_internal_letters?page=${page}&sort=${sort}&internal_letter_number=${internalLtrNum}&status=${status}&late=${late}`, {
      headers: {
  
        get_frwdintltrs_api: process.env.REACT_APP_GET_FRWDINTLTRS_API,
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
 
});

const initialState = {
  forwardInternalLetters: [],
  loading: false,
  error: false,
};

const forwardInternalLettersSlice = createSlice({
  name: "FORWARDINTERNALLETTERS",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchForwardInternalLetter.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchForwardInternalLetter.fulfilled, (state, action) => {
      state.loading = false;
      state.forwardInternalLetters = action.payload;
      state.error = false;
    });
    builder.addCase(fetchForwardInternalLetter.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export const forwardInternalLettersAction = forwardInternalLettersSlice.actions;

export default forwardInternalLettersSlice;
