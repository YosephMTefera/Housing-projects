import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiRequest from "../../utils/request";



export const fetchAllQuestions = createAsyncThunk("allQuestions/fetchAllQuestions",async (_, { dispatch }) => {
  return apiRequest
    .get(`/questions_api/get_all_questions`, {
      headers: {
        "Content-Type": "application/json",
        get_questlists_api: process.env.REACT_APP_GET_QUESTLISTS_API,
     
      },
    })
    .then((res) => res.data).catch((error)=>{
      if(error?.response?.status ===429){
        dispatch(allQuestionsAction.setLimitError(true));
      }

    })
 
});

const initialState = {
  questions: [],
  loading: false,
  limitError:false,
  error: false,
};

const allQuestionSlice = createSlice({
  name: "ALLQUESTIONS",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchAllQuestions.pending, (state) => {
      state.loading = true;
      state.limitError = false
    });
    builder.addCase(fetchAllQuestions.fulfilled, (state, action) => {
      state.loading = false;
      state.questions = action.payload;
      state.limitError = false
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
