import { configureStore } from "@reduxjs/toolkit";
import caseSlice from "./slices/caseSlice";
import caseListSlice from "./slices/caseListSlice";
import officeUserSlice from "./slices/officeUserSlice";
import archivalCategorySlice from "./slices/archivalCategorySlice";
import documentCategorySlice from "./slices/documentCategorySlice";
import divisionSlice from "./slices/divisionSlice";
import translationSlice from "./slices/translationSlice";
import allDivisionSlice from "./slices/allDivisionsSlice";
import allQuestionSlice from "./slices/getAlllQuestionsSlice";
import allCasesSlice from "./slices/getAllCasesSlice";
import incomingLettersSlice from "./slices/IncomingLetterSlice";
import outgoingLettersSlice from "./slices/outgoingLetterSlice";
import internalLettersSlice from "./slices/internalLetterSlice";
import presystemLettersSlice from "./slices/presystemLettersSlice";

const store = configureStore({
  reducer: {
    translation:translationSlice.reducer,
    case: caseSlice.reducer,
    caseList: caseListSlice,
    officeUser: officeUserSlice,
    archivalCategory: archivalCategorySlice.reducer,
    documentCategory: documentCategorySlice,
    division: divisionSlice,
    allDivisions:allDivisionSlice.reducer,
    allQuestions:allQuestionSlice.reducer,
    allCases:allCasesSlice.reducer,
    incomingLetters:incomingLettersSlice.reducer,
    outgoingLetters:outgoingLettersSlice.reducer,
    internalLetters:internalLettersSlice.reducer,
    presystemLetters:presystemLettersSlice.reducer
  },
});

export default store;
