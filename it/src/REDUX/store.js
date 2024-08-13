import { configureStore } from "@reduxjs/toolkit";
import officeUsersSlice from "./slices/officeUsersSlice";
import divisionSlice from "./slices/divisionSlice";
import archivalUsersSlice from "./slices/archivalUsersSlice";
import directorateSlice from "./slices/directorateSlice";
import teamSlice from "./slices/teamSlice";
import customersSlice from "./slices/customerSlice";
import itUsersSlice from "./slices/itUsersSlice";
import translationSlice from "./slices/translationSlice";
import windowUsersSlice from "./slices/windowUsersSlice";
import ethicsUsersSlice from "./slices/ethicsUsersSlice";
import caseRequestSlice from "./slices/caseRequestSlice";
import allDivisionSlice from "./slices/allDivisionsSlice";
import allDirectorateSlice from "./slices/allDirectorateSlice";
import allTeamSlice from "./slices/allTeamSlice";
import allOfficeUsersSlice from "./slices/allOfficeUsersSlice";
import allItUsersSlice from "./slices/allItUsersSlice";
import questionSlice from "./slices/questionSlice";
import allQuestionSlice from "./slices/getAlllQuestionsSlice";
import allCaseRequestSlice from "./slices/getAllCaseRequestSlice";

const store = configureStore({
  reducer: {
    translation:translationSlice.reducer,
    allOfficers:allOfficeUsersSlice.reducer,
    officeUsers: officeUsersSlice.reducer,
    allDivisions:allDivisionSlice.reducer,
    divisions: divisionSlice.reducer,
    archivalUsers: archivalUsersSlice.reducer,
    allDirectorates:allDirectorateSlice.reducer,
    directorates: directorateSlice.reducer,
    allTeams:allTeamSlice.reducer,
    teams: teamSlice?.reducer,
    customers: customersSlice.reducer,
    itUsers: itUsersSlice.reducer,
    allItUsers:allItUsersSlice.reducer,
    windowServiceUsers:windowUsersSlice.reducer,
    ethicsUsers:ethicsUsersSlice.reducer,
    caseRequests:caseRequestSlice.reducer,
    allCaseLists:allCaseRequestSlice.reducer,
    questions:questionSlice.reducer,
    allQuestions:allQuestionSlice.reducer
  },
});

export default store;
