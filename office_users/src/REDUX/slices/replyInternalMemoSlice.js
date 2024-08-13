import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiRequest from "../../utils/request";

const token = sessionStorage.getItem("tID");

export const fetchreplyinternalMemo = createAsyncThunk("replyinternalMemo/fetchreplyinternalMemo",async ({page,sort,status}) => {
 
 
  return apiRequest
    .get(`/rply_internal_memo_api/get_replied_memo_letter?page=${page}&sort=${sort}&status=${status}`, {
      headers: {
  
        get_rplyintmems_api: process.env.REACT_APP_GET_RPLYINTMEMS_API,
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
 
});

const initialState = {
  replyinternalMemo: [],
  loading: false,
  error: false,
};

const replyinternalMemoSlice = createSlice({
  name: "REPLYINTERNALLETTERS",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchreplyinternalMemo.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchreplyinternalMemo.fulfilled, (state, action) => {
      state.loading = false;
      state.replyinternalMemo = action.payload;
      state.error = false;
    });
    builder.addCase(fetchreplyinternalMemo.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export const replyinternalMemoAction = replyinternalMemoSlice.actions;

export default replyinternalMemoSlice;
