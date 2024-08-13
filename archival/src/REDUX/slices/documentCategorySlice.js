import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiRequest from "../../utils/request";

const initialState = {
  data: [],
  loading: false,
  error: "",
};

const token = sessionStorage?.getItem("tID");

export const fetchDocumentCategory = createAsyncThunk(
  "DocumentCategory/fetchDocumentCategory",
  async ({docId, doctype}) => {
    return apiRequest
      .get(`/archival_category_api/get_arch_bydocId/${docId}/${doctype}`, {
        headers: {
          Authorization: "Token " + token,
          get_user_api: process.env.REACT_APP_GET_USER_API,
        },
      })
      .then((res) => res?.data)
      .catch((error) => {
        if (
          error.response.status === 401 &&
          error.response.data.Message === "Token expired. Please log in again."
        ) {
          window.location.href = "/login";
        }
      });
  }
);

const documentCategorySlice = createSlice({
  name: "DocumentCategory",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchDocumentCategory.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchDocumentCategory.fulfilled, (state, actions) => {
      state.loading = false;
      state.data = actions.payload;
      state.error = "";
    });
    builder.addCase(fetchDocumentCategory.rejected, (state, actions) => {
      state.loading = false;
      state.data = [];
      state.error = actions.error.message;
    });
  },
});

export default documentCategorySlice.reducer;

export const documentCategoryActions = documentCategorySlice.actions;
