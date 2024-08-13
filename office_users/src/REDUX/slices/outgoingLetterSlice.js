import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiRequest from "../../utils/request";

const token = sessionStorage.getItem("tID");

export const fetchOutgoingLetter = createAsyncThunk("outgoingLetters/fetchoutgoingLetters",async ({page,sort,outgoingLtrNum,late,status,createdBy}) => {
 
 
  return apiRequest
    .get(`/outgoing_ltr_api/get_output_ltrs?page=${page}&sort=${sort}&outgoing_letter_number=${outgoingLtrNum}&late=${late}&status=${status}&createdBy=${createdBy}`, {
      headers: {
  
        get_outputltrs_api: process.env.REACT_APP_GET_OUTPUTLTRS_API,
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
 
});

const initialState = {
  outgoingLetters: [],
  loading: false,
  error: false,
};

const outgoingLettersSlice = createSlice({
  name: "OUTGOINGLETTERS",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchOutgoingLetter.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchOutgoingLetter.fulfilled, (state, action) => {
      state.loading = false;
      state.outgoingLetters = action.payload;
      state.error = false;
    });
    builder.addCase(fetchOutgoingLetter.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export const outgoingLettersAction = outgoingLettersSlice.actions;

export default outgoingLettersSlice;
