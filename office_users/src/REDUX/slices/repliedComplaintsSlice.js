import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiRequest from "../../utils/request";


const token = sessionStorage.getItem("tID");

export const fetchReplyComplaints = createAsyncThunk("replycomplaints/fetchReplyComplaints", () => {
  return apiRequest
    .get(`/reply_complaint_api/get_replied_complaint`, {
      headers: {
        "Content-Type": "application/json",
        get_user_api: process.env.REACT_APP_GET_USER_API,
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data).catch((error)=>{
      if(error.response.status ===401 && error.response.data.Message ==="Token expired. Please log in again."){
        window.location.href = "/login"

      }
    });
});


const initialState = {
  repliedComplaints: [],
  loading: false,
  error: false,
};

const repliedComplaintsSlice = createSlice({
  name: "REPLIEDCOMPLAINTS",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchReplyComplaints.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchReplyComplaints.fulfilled, (state, action) => {
      state.loading = false;
      state.repliedComplaints = action.payload;
      state.error = false;
    });
    builder.addCase(fetchReplyComplaints.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export const repliedCaseAction = repliedComplaintsSlice.actions;

export default repliedComplaintsSlice;
