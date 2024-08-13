import {configureStore} from '@reduxjs/toolkit';
import windowUsersSlice from './slices/windowUsersSlice';
import translationSlice from './slices/translationSlice';
import allCaseRequestSlice from './slices/getAllCaseRequestSlice';
import allQuestionSlice from './slices/getAlllQuestionsSlice';
import allDivisionSlice from './slices/allDivisionsSlice';
import casesSlice from './slices/caseSlice';
import allCasesSlice from './slices/getAllCasesSlice';


const store = configureStore({
    reducer:{
        translation:translationSlice.reducer,
        windowUsers:windowUsersSlice.reducer,
        allDivisions:allDivisionSlice.reducer,
        allCaseRequests:allCaseRequestSlice.reducer,
        allQuestions:allQuestionSlice.reducer,
        getCases:casesSlice.reducer,
        allCases:allCasesSlice.reducer
    }
})


export default store;