import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiRequest from "../../utils/request";



const token = sessionStorage?.getItem("tID");

export const fetchArchivalCategory = createAsyncThunk(
  "archivalCategory/fetchArchivalCategory",
  async ({page,sort,name,status}) => {
    return apiRequest
      .get(`/archival_category_api/get_archival_category?page=${page}&sort=${sort}&searchNameEnAm=${name}&status=${status}`, {
        headers: {
          Authorization: "Token " + token,
          get_archcats_api: process.env.REACT_APP_GET_ARCHCATS_API,
        },
      })
      .then((res) => res?.data)
     
  }
);

const initialState = {
  archivalCategories: [],
  loading: false,
  error: false,
};

const archivalCategorySlice = createSlice({
  name: "ArchivalCategory",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchArchivalCategory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchArchivalCategory.fulfilled, (state, actions) => {
      state.loading = false;
      state.archivalCategories = actions.payload;
      state.error = false;
    });
    builder.addCase(fetchArchivalCategory.rejected, (state, actions) => {
      state.loading = false;
      state.archivalCategories = [];
      state.error = true;
    });
  },
});



export const archivalCategoryActions = archivalCategorySlice.actions;
export default archivalCategorySlice;