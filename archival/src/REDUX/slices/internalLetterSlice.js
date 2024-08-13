import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiRequest from "../../utils/request";

const token = sessionStorage.getItem("tID");

export const fetchInternalLetter = createAsyncThunk("internalLetters/fetchInternalLetters",async ({page,sort,internalLtrNum,late,status,createdBy}) => {
 
 
  return apiRequest
    .get(`/internal_ltr_api/get_internal_ltrs?page=${page}&sort=${sort}&internalLtrNum=${internalLtrNum}&late=${late}&status=${status}&createdBy=${createdBy}`, {
      headers: {
  
        get_intltrs_api: process.env.REACT_APP_GET_INTLTRS_API,
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
 
});

const initialState = {
  internalLetters: [],
  loading: false,
  error: false,
};

const internalLettersSlice = createSlice({
  name: "INTERNALLETTERS",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchInternalLetter.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchInternalLetter.fulfilled, (state, action) => {
      state.loading = false;
      state.internalLetters = action.payload;
      state.error = false;
    });
    builder.addCase(fetchInternalLetter.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export const internalLettersAction = internalLettersSlice.actions;

export default internalLettersSlice;
