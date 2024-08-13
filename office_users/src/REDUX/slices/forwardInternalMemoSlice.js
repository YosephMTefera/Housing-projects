import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiRequest from "../../utils/request";

const token = sessionStorage.getItem("tID");

export const fetchForwardInternalMemo = createAsyncThunk("forwardinternalMemo/fetchforwardInternalMemo",async ({page,sort,status}) => {
 
 
  return apiRequest
    .get(`/frwd_internal_memo_api/get_forwarded_internal_memos?page=${page}&sort=${sort}&status=${status}`, {
      headers: {
  
        get_frwdgetintmemos_api: process.env.REACT_APP_GET_FRWDGETINTMEMOS_API,
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
 
});

const initialState = {
  forwardInternalMemo: [],
  loading: false,
  error: false,
};

const forwardInternalMemoSlice = createSlice({
  name: "FORWARDINTERNALMEMO",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchForwardInternalMemo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchForwardInternalMemo.fulfilled, (state, action) => {
      state.loading = false;
      state.forwardInternalMemo = action.payload;
      state.error = false;
    });
    builder.addCase(fetchForwardInternalMemo.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export const forwardInternalMemoAction = forwardInternalMemoSlice.actions;

export default forwardInternalMemoSlice;
