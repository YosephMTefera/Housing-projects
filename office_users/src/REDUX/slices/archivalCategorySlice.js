import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiRequest from "../../utils/request";


const token = sessionStorage.getItem("tID");

export const fetchArchivalCategory = createAsyncThunk("archivalcategory/fetchArchivalCateogry", () => {
  return apiRequest
    .get(`/archival_category_api/get_archival_category`, {
      headers: {
        "Content-Type": "application/json",
        get_user_api: process.env.REACT_APP_GET_USER_API,
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
});


const initialState = {
  archivalCategories: [],
  loading: false,
  error: false,
};

const archivalCategoriesSlice = createSlice({
  name: "ARCHIVALCATEGORIES",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchArchivalCategory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchArchivalCategory.fulfilled, (state, action) => {
      state.loading = false;
      state.archivalCategories = action.payload;
      state.error = false;
    });
    builder.addCase(fetchArchivalCategory.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export const archivalCategoryAction = archivalCategoriesSlice.actions;

export default archivalCategoriesSlice;
