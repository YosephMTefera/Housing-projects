import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiRequest from "../../../utils/request";

const token = sessionStorage.getItem("tID");

export const fetchAccusations = createAsyncThunk("accusations/fetchAccusations",async ({page,sort,name,phone}) => {
  return apiRequest
    .get(`/accusation_acceptor_api/get_accusations?page=${page}&sort=${sort}&name=${name}&phone=${phone}`, {
      headers: {
        "Content-Type": "application/json",
        get_accusethics_api: process.env.REACT_APP_GET_ACCUSETHICS_API,
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
  
});

const initialState = {
  accusations: [],
  loading: false,
  error: false,
};

const accusationsSlice = createSlice({
  name: "CASESLIST",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchAccusations.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAccusations.fulfilled, (state, action) => {
      state.loading = false;
      state.accusations = action.payload;
      state.error = false;
    });
    builder.addCase(fetchAccusations.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export const accusationsAction = accusationsSlice.actions;

export default accusationsSlice;
