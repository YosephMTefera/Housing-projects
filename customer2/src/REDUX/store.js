import { configureStore } from "@reduxjs/toolkit";
import applicationSlice from "./slices/applicationSlice";
import caseSlice from "./slices/caseSlice";
import caseListSlice from "./slices/caseListSlice";
import caseHistorySlice from "./slices/caseHistorySlice";
import divisionSlice from "./slices/divisionSlice";
import translationSlice from "./slices/translationSlice";
import allDivisionSlice from "./slices/allDivisionsSlice";
import allCaseRequestSlice from "./slices/getAllCaseRequestSlice";
import allQuestionSlice from "./slices/getAlllQuestionsSlice";
import casesSlice from "./slices/caseSlice";
import allCasesSlice from "./slices/getAllCasesSlice";
import allDirectorateSlice from "./slices/allDirectorateSlice";
import allTeamSlice from "./slices/allTeamSlice";

const store = configureStore({
  reducer: {
    application: applicationSlice.reducer,
    cases: caseSlice.reducer,
    allCases:allCasesSlice.reducer,
    caseList: caseListSlice.reducer,
    caseHistory: caseHistorySlice.reducer,
    division: divisionSlice.reducer,
    directorate:allDirectorateSlice.reducer,
    allTeams:allTeamSlice.reducer,
    translation:translationSlice.reducer,
    allDivisions:allDivisionSlice.reducer,
    allCaseRequests:allCaseRequestSlice.reducer,
    allQuestions:allQuestionSlice.reducer,
    getCases:casesSlice.reducer
  },
});

export default store;
