import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiRequest from "../../utils/request";

const token = sessionStorage.getItem("tID");

export const fetchCcIncomingLetter = createAsyncThunk("ccIncomingLetters/fetchCcIncomingLetters",async ({page,sort,incomingLtrNum,attentionFrom,type}) => {
 
  if(type ==="forward" || type ===""){
    return apiRequest
    .get(`/forward_incoming_ltr_api/get_forwarded_inc_letters_cc?page=${page}&sort=${sort}&incoming_letter_number=${incomingLtrNum}&attention_from=${attentionFrom}`, {
      headers: {
  
        get_offincomcc_incltr_api: process.env.REACT_APP_GET_OFFINCOMCC_INCLTR_API,
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)

  }
  else if(type ==="reply"){
    return apiRequest
    .get(`/reply_incoming_ltr_api/get_replied_inc_letter_cc?page=${page}&sort=${sort}&incoming_letter_number=${incomingLtrNum}&attention_from=${attentionFrom}`, {
      headers: {
  
        get_ccrplyincltrs_api: process.env.REACT_APP_GET_CCRPLYINCLTRS_API,
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
  }
  else{
    return apiRequest
    .get(`/forward_incoming_ltr_api/get_forwarded_inc_letters_cc?page=${page}&sort=${sort}&incoming_letter_number=${incomingLtrNum}&attention_from=${attentionFrom}`, {
      headers: {
  
        get_offincomcc_incltr_api: process.env.REACT_APP_GET_OFFINCOMCC_INCLTR_API,
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
  }
 

 
});

const initialState = {
  ccIncomingLetters: [],
  loading: false,
  error: false,
};

const ccIncomingLettersSlice = createSlice({
  name: "CCINCOMINGLETTERS",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchCcIncomingLetter.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCcIncomingLetter.fulfilled, (state, action) => {
      state.loading = false;
      state.ccIncomingLetters = action.payload;
      state.error = false;
    });
    builder.addCase(fetchCcIncomingLetter.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export const ccIncomingLettersAction = ccIncomingLettersSlice.actions;

export default ccIncomingLettersSlice;
