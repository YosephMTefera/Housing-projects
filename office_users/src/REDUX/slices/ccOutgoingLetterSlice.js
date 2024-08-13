import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiRequest from "../../utils/request";

const token = sessionStorage.getItem("tID");

export const fetchCcoutgoingLetter = createAsyncThunk("ccoutgoingLetters/fetchCcoutgoingLetters",async ({page,sort,outgoingLtrNum,status,late,type}) => {
 
  if(type ==="forward" || type ===""){
    return apiRequest
    .get(`/frwd_outgoing_ltr_api/get_forwarded_outg_letters_cc?page=${page}&sort=${sort}&outgoing_letter_number=${outgoingLtrNum}&status=${status}&late=${late}`, {
      headers: {
  
        get_frwdgetccoutputltr_api: process.env.REACT_APP_GET_FRWDGETCCOUTPUTLTR_API,
        Authorization: `Bearer ${token}`, 
      },
    })
    .then((res) => res.data)

  }
  else if(type ==="reply"){
    return apiRequest
    .get(`/rply_outgoing_ltr_api/get_replied_outg_letter_cc?page=${page}&sort=${sort}&outgoing_letter_number=${outgoingLtrNum}&status=${status}&late=${late}`, {
      headers: {
  
        get_ccrplyincltrs_api: process.env.REACT_APP_GET_CCRPLYINCLTRS_API,
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
  }
  else{
    return apiRequest
    .get(`/frwd_outgoing_ltr_api/get_forwarded_outg_letters_cc?page=${page}&sort=${sort}&outgoing_letter_number=${outgoingLtrNum}&status=${status}&late=${late}`, {
      headers: {
  
        get_frwdgetccoutputltr_api: process.env.REACT_APP_GET_FRWDGETCCOUTPUTLTR_API,
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
  }
 

 
});

const initialState = {
  ccoutgoingLetters: [],
  loading: false,
  error: false,
};

const ccoutgoingLettersSlice = createSlice({
  name: "CCoutgoingLETTERS",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchCcoutgoingLetter.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCcoutgoingLetter.fulfilled, (state, action) => {
      state.loading = false;
      state.ccoutgoingLetters = action.payload;
      state.error = false;
    });
    builder.addCase(fetchCcoutgoingLetter.rejected, (state) => {
      state.loading = false;
      state.ccoutgoingLetters = []
      state.error = true;
    });
  },
});

export const ccoutgoingLettersAction = ccoutgoingLettersSlice.actions;

export default ccoutgoingLettersSlice;
