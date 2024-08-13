import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiRequest from "../../utils/request";

const token = sessionStorage.getItem("tID");

export const fetchforwardPresystemLetter = createAsyncThunk("forwardpresystemLetters/fetchforwardPresystemLetters",async ({page,sort,letter_number,status,type}) => {
 
 
  return apiRequest
    .get(`/forward_letter_api/get_forwarded_letters?page=${page}&sort=${sort}&letter_number=${letter_number}&status=${status}&type=${type}`, {
      headers: {
  
        get_frwdletters_api: process.env.REACT_APP_GET_FRWDLETTERS_API,
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
 
});

const initialState = {
  forwardPresystemLetters: [],
  loading: false,
  error: false,
};

const forwardPresystemLettersSlice = createSlice({
  name: "FORWARDPRESYSTEMLETTERS",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchforwardPresystemLetter.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchforwardPresystemLetter.fulfilled, (state, action) => {
      state.loading = false;
      state.forwardPresystemLetters = action.payload;
      state.error = false;
    });
    builder.addCase(fetchforwardPresystemLetter.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export const forwardPresystemLettersAction = forwardPresystemLettersSlice.actions;

export default forwardPresystemLettersSlice;
