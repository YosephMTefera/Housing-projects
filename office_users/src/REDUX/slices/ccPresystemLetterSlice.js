import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiRequest from "../../utils/request";

const token = sessionStorage.getItem("tID");

export const fetchCcPresystemLetter = createAsyncThunk("ccPresystemLetters/fetchCcPresystemLetters",async ({page,sort,letter_number,status,type,pathType}) => {
 
  if(pathType ==="forward"){
    return apiRequest
    .get(`/forward_letter_api/get_forwarded_letters_cc?page=${page}&sort=${sort}&letter_number=${letter_number}&status=${status}&letter_type=${type}`, {
      headers: {
  
        get_frwdletterscc_api: process.env.REACT_APP_GET_FRWDLETTERSCC_API,
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)

  }
  else if(pathType ==="reply"){
    return apiRequest
    .get(`/reply_letter_api/get_replied_letter_cc?page=${page}&sort=${sort}&letter_number=${letter_number}&status=${status}&letter_type=${type}`, {
      headers: {
  
        get_rplyltrspathcc_api: process.env.REACT_APP_GET_RPLYLTRSPATHCC_API,
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
  }
  else{
    return apiRequest
    .get(`/forward_letter_api/get_forwarded_letters_cc?page=${page}&sort=${sort}&letter_number=${letter_number}&status=${status}&letter_type=${type}`, {
      headers: {
  
        get_frwdletterscc_api: process.env.REACT_APP_GET_FRWDLETTERSCC_API,
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
  }
 

 
});

const initialState = {
  ccPresystemLetters: [],
  loading: false,
  error: false,
};

const ccPresystemLettersSlice = createSlice({
  name: "CCPRESYSTEMLETTERS",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchCcPresystemLetter.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCcPresystemLetter.fulfilled, (state, action) => {
      state.loading = false;
      state.ccPresystemLetters = action.payload;
      state.error = false;
    });
    builder.addCase(fetchCcPresystemLetter.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export const ccPresystemLettersAction = ccPresystemLettersSlice.actions;

export default ccPresystemLettersSlice;
