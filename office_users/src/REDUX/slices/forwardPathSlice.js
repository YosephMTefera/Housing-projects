import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiRequest from "../../utils/request";



const token = sessionStorage?.getItem("tID");

export const fetchForwardPath = createAsyncThunk(
  "forwardPath/fetchForwardPath",
  async ({ document_id,type }) => {

    if(type==="case"){
      return apiRequest
      .get(`/forward_api/get_forward_path/${document_id}`, {
        headers: {
          Authorization: "Token " + token,
          get_user_api: process.env.REACT_APP_GET_USER_API,
        },
      })
      .then((res) => res?.data)
     
      
    } 
    else if(type==="letter"){
      return apiRequest
      .get(`/forward_letter_api/get_forward_letter_path/${document_id}`, {
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
    forwardPath: [],
    loading: false,
    error: false,
  };

const forwardPathSlice = createSlice({
  name: "FORWARDPATH",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchForwardPath.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchForwardPath.fulfilled, (state, actions) => {
      state.loading = false;
      state.forwardPath = actions.payload;
      state.error = false;
    });
    builder.addCase(fetchForwardPath.rejected, (state, actions) => {
      state.loading = false;
      state.forwardPath = [];
      state.error = true;
    });
  },
});

export const forwardPathActions = forwardPathSlice.actions;
export default forwardPathSlice.reducer;