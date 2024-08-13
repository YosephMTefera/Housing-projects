import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiRequest from "../../utils/request";

const initialState = {
  data: [],
  loading: false,
  error: "",
};

const token = sessionStorage?.getItem("tID");

export const fetchUserReply = createAsyncThunk(
  "UserReply/fetchUserReply",
  async ({ document_id,type }) => {
    if(type==="case"){
      return apiRequest
      .get(`/reply_api/get_users_to_reply/${document_id}`, {
        headers: {
          Authorization: "Token " + token,
          get_user_api: process.env.REACT_APP_GET_USER_API,
        },
      })
      .then((res) => res?.data)
     
    }
   
    else if(type ==="letter"){
      return apiRequest
      .get(`/reply_letter_api/get_users_to_reply_letter/${document_id}`, {
        headers: {
          Authorization: "Token " + token,
          get_user_api: process.env.REACT_APP_GET_USER_API,
        },
      })
      .then((res) => res?.data)
    }
  }
  
);

const userReplySlice = createSlice({
  name: "UserReply",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchUserReply.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchUserReply.fulfilled, (state, actions) => {
      state.loading = false;
      state.data = actions.payload;
      state.error = "";
    });
    builder.addCase(fetchUserReply.rejected, (state, actions) => {
      state.loading = false;
      state.data = [];
      state.error = actions.error.message;
    });
  },
});

export default userReplySlice.reducer;

export const userReplyActions = userReplySlice.actions;
