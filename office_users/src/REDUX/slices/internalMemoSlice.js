import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiRequest from "../../utils/request";

const token = sessionStorage.getItem("tID");

export const fetchInternalMemo = createAsyncThunk("internalMemo/fetchInternalMemo",async ({page,sort,status,createdBy}) => {
 
 
  return apiRequest
    .get(`/internal_memo_api/get_internal_memos?page=${page}&sort=${sort}&status=${status}&createdBy=${createdBy}`, {
      headers: {
  
        get_intmemos_api: process.env.REACT_APP_GET_INTMEMOS_API,
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
 
});

const initialState = {
  internalMemos: [],
  loading: false,
  error: false,
};

const internalMemoSlice = createSlice({
  name: "INTERNAMEMO",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchInternalMemo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchInternalMemo.fulfilled, (state, action) => {
      state.loading = false;
      state.internalMemos = action.payload;
      state.error = false;
    });
    builder.addCase(fetchInternalMemo.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export const internalMemoAction = internalMemoSlice.actions;

export default internalMemoSlice;
