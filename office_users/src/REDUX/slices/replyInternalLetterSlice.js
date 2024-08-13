import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiRequest from "../../utils/request";

const token = sessionStorage.getItem("tID");

export const fetchreplyinternalLetter = createAsyncThunk("replyinternalLetters/fetchreplyinternalLetters",async ({page,sort,internalLtrNum,status,late}) => {
 
 
  return apiRequest
    .get(`/rply_internal_ltr_api/get_replied_intl_letter?page=${page}&sort=${sort}&internal_letter_number=${internalLtrNum}&status=${status}&late=${late}`, {
      headers: {
  
        get_rplyintltrs_api: process.env.REACT_APP_GET_RPLYINTLTRS_API,
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
 
});

const initialState = {
  replyinternalLetters: [],
  loading: false,
  error: false,
};

const replyinternalLettersSlice = createSlice({
  name: "REPLYINTERNALLETTERS",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchreplyinternalLetter.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchreplyinternalLetter.fulfilled, (state, action) => {
      state.loading = false;
      state.replyinternalLetters = action.payload;
      state.error = false;
    });
    builder.addCase(fetchreplyinternalLetter.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export const replyinternalLettersAction = replyinternalLettersSlice.actions;

export default replyinternalLettersSlice;
