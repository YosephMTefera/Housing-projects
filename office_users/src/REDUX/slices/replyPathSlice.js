import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiRequest from "../../utils/request";



const token = sessionStorage?.getItem("tID");

export const fetchreplyPath = createAsyncThunk(
  "replyPath/fetchReplyPath",
  async ({ document_id,type }) => {

    if(type ==="case"){
      return apiRequest
      .get(`/reply_api/get_reply_path/${document_id}`, {
        headers: {
          Authorization: "Token " + token,
          get_user_api: process.env.REACT_APP_GET_USER_API,
        },
      })
      .then((res) => res?.data)
    
    }

    else if(type==="letter"){
      return apiRequest
      .get(`/reply_letter_api/get_reply_letter_path/${document_id}`, {
        headers: {
          Authorization: "Token " + token,
          get_user_api: process.env.REACT_APP_GET_USER_API,
        },
      })
      .then((res) => res?.data)
    
      
    }
   
  
  }
);

const initialState = {
    replyPath: [],
    loading: false,
    error: false,
  };

const replyPathSlice = createSlice({
  name: "REPLYPATH",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchreplyPath.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchreplyPath.fulfilled, (state, actions) => {
      state.loading = false;
      state.replyPath = actions.payload;
      state.error = false;
    });
    builder.addCase(fetchreplyPath.rejected, (state, actions) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export const replyPathActions = replyPathSlice.actions;
export default replyPathSlice.reducer;