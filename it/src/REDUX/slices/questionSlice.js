import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiRequest from "../../utils/request";

const token = sessionStorage.getItem("tID");

export const fetchQuestions = createAsyncThunk("questions/fetchQuestions",async ({page,sort,caselist,searchName}) => {
  return apiRequest
    .get(`/questions_api/get_questions?page=${page}&sort=${sort}&caselist=${caselist}&searchName=${searchName}`, {
      headers: {
        "Content-Type": "application/json",
        get_questlists_api: process.env.REACT_APP_GET_QUESTLISTS_API,
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
 
});

const initialState = {
  questions: [],
  loading: false,
  error: false,
};

const questionSlice = createSlice({
  name: "QUESTIONS",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchQuestions.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchQuestions.fulfilled, (state, action) => {
      state.loading = false;
      state.questions = action.payload;
      state.error = false;
    });
    builder.addCase(fetchQuestions.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export const questionAction = questionSlice.actions;

export default questionSlice;
