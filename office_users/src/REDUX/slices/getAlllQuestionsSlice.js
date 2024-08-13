import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiRequest from "../../utils/request";

const token = sessionStorage.getItem("tID");

export const fetchAllQuestions = createAsyncThunk("allQuestions/fetchAllQuestions", () => {
  return apiRequest
    .get(`/questions_api/get_all_questions`, {
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

const allQuestionSlice = createSlice({
  name: "ALLQUESTIONS",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchAllQuestions.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllQuestions.fulfilled, (state, action) => {
      state.loading = false;
      state.questions = action.payload;
      state.error = false;
    });
    builder.addCase(fetchAllQuestions.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export const allQuestionsAction = allQuestionSlice.actions;

export default allQuestionSlice;
