import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiRequest from "../../utils/request";

const token = sessionStorage.getItem("tID");

export const fetchCcinternalLetter = createAsyncThunk("ccinternalLetters/fetchCcinternalLetters",async ({page,sort,internalLtrNum,status,late,type}) => {
 
  if(type ==="forward" || type ===""){
    return apiRequest
    .get(`/frwd_internal_api/get_forwarded_internal_letters_cc?page=${page}&sort=${sort}&internal_letter_number=${internalLtrNum}&status=${status}&late=${late}`, {
      headers: {
  
        get_frwdintltrscc_api: process.env.REACT_APP_GET_FRWDINTLTRSCC_API,
        Authorization: `Bearer ${token}`, 
      },
    })
    .then((res) => res.data)

  }
  else if(type ==="reply"){
    return apiRequest
    .get(`/rply_internal_ltr_api/get_replied_intl_letter_cc?page=${page}&sort=${sort}&internal_letter_number=${internalLtrNum}&status=${status}&late=${late}`, {
      headers: {
  
        get_rplyintltrscc_api: process.env.REACT_APP_GET_RPLYINTLTRSCC_API,
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
  }
  else{
    return apiRequest
    .get(`/frwd_internal_api/get_forwarded_internal_letters_cc?page=${page}&sort=${sort}&internal_letter_number=${internalLtrNum}&status=${status}&late=${late}`, {
      headers: {
  
        get_frwdintltrscc_api: process.env.REACT_APP_GET_FRWDINTLTRSCC_API,
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
  }
 

 
});

const initialState = {
  ccinternalLetters: [],
  loading: false,
  error: false,
};

const ccinternalLettersSlice = createSlice({
  name: "CCINTERNALLETTERS",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchCcinternalLetter.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCcinternalLetter.fulfilled, (state, action) => {
      state.loading = false;
      state.ccinternalLetters = action.payload;
      state.error = false;
    });
    builder.addCase(fetchCcinternalLetter.rejected, (state) => {
      state.loading = false;
      state.ccinternalLetters = []
      state.error = true;
    });
  },
});

export const ccinternalLettersAction = ccinternalLettersSlice.actions;

export default ccinternalLettersSlice;
