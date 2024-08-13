import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiRequest from "../../utils/request";

const token = sessionStorage.getItem("tID");

export const fetchCcinternalMemo = createAsyncThunk("ccinternalMemo/fetchCcinternalMemo",async ({page,sort,status,type}) => {
 
  if(type ==="forward" || type ===""){
    return apiRequest
    .get(`/frwd_internal_memo_api/get_forwarded_internal_memos_cc?page=${page}&sort=${sort}&status=${status}`, {
      headers: {
  
        get_frwdgetintmemoscc_api: process.env.REACT_APP_GET_FRWDGETINTMEMOSCC_API,
        Authorization: `Bearer ${token}`, 
      },
    })
    .then((res) => res.data)

  }
  else if(type ==="reply"){
    return apiRequest
    .get(`/rply_internal_memo_api/get_replied_memo_letter_cc?page=${page}&sort=${sort}&status=${status}`, {
      headers: {
  
        get_rplyintmemscc_api: process.env.REACT_APP_GET_RPLYINTMEMSCC_API,
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
  }
  else{
    return apiRequest
    .get(`/frwd_internal_memo_api/get_forwarded_internal_memos_cc?page=${page}&sort=${sort}&status=${status}`, {
      headers: {
  
        get_frwdintltrscc_api: process.env.REACT_APP_GET_FRWDINTLTRSCC_API,
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
  }
 

 
});

const initialState = {
  ccinternalMemo: [],
  loading: false,
  error: false,
};

const ccinternalMemoSlice = createSlice({
  name: "CCINTERNALMEMO",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchCcinternalMemo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCcinternalMemo.fulfilled, (state, action) => {
      state.loading = false;
      state.ccinternalMemo = action.payload;
      state.error = false;
    });
    builder.addCase(fetchCcinternalMemo.rejected, (state) => {
      state.loading = false;
      state.ccinternalLetters = []
      state.error = true;
    });
  },
});

export const ccinternalMemoAction = ccinternalMemoSlice.actions;

export default ccinternalMemoSlice;
