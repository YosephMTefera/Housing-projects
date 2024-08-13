import {configureStore} from '@reduxjs/toolkit';
import officeUsersSlice from './slices/officeUserSlice';
import casesSlice from './slices/caseSlice';
import lettersSlice from './slices/LetterSlice';
import archivalUsersSlice from './slices/archivalSlice';
import customerSlice from './slices/customerSlice';
import itusersSlice from './slices/itUsersSlice';
import divisionSlice from './slices/divisionSlice';
import directorateSlice from './slices/directorateSlice';
import teamsSlice from './slices/teamSlice';
import forwardCaseSlice from './slices/forwardCaseSlice';
import archivalCategoriesSlice from './slices/archivalCategorySlice';
import userReplySlice from './slices/userReplySlice';
import forwardPathSlice from './slices/forwardPathSlice';
import replyPathSlice from './slices/replyPathSlice';
import repliedCaseSlice from './slices/repliedCaseSlice';
import forwardLettersSlice from './slices/forwardLettersSlice';
import repliedLettersSlice from './slices/repliedLetterSlice';
import translationSlice from './slices/translationSlice';
import allOfficeUsersSlice from './slices/getAllOfficeUsersSlice';
import allDivisionSlice from './slices/allDivisionsSlice';
import allDirectorateSlice from './slices/allDirectorateSlice';
import allTeamSlice from './slices/allTeamSlice';
import allItUsersSlice from './slices/allItUsersSlice';
import windowUsersSlice from './slices/windowUsersSlice';
import ethicsUsersSlice from './slices/ethicsUsersSlice';
import allCaseRequestSlice from './slices/getAllCaseRequestSlice';
import allQuestionSlice from './slices/getAlllQuestionsSlice';
import cCCaseSlice from './slices/ccCasesSlice';
import applicationStateSlice from './slices/applicationStateSlice';
import forwardIncomingLettersSlice from './slices/forwardIncomingLettersSlice';
import ccIncomingLettersSlice from './slices/ccIncomingLetterSlice';
import replyIncomingLettersSlice from './slices/replyIncomingLettersSlice';
import outgoingLettersSlice from './slices/outgoingLetterSlice';
import forwardOutgoingLettersSlice from './slices/forwardOutgoingLetterSlice';
import ccoutgoingLettersSlice from './slices/ccOutgoingLetterSlice';
import replyoutgoingLettersSlice from './slices/replyOutgoingLetterSlice';
import internalLettersSlice from './slices/internalLetterSlice';
import forwardInternalLettersSlice from './slices/forwardInternalLettersSlice';
import ccinternalLettersSlice from './slices/ccInternalLetterSlice';
import replyinternalLettersSlice from './slices/replyInternalLetterSlice';
import previewSlice from './slices/previewSlice';
import incomingLettersSlice from './slices/IncomingLetterSlice';
import presystemLettersSlice from './slices/presystemLettersSlice';
import forwardPresystemLettersSlice from './slices/forwardedPresystemLettersSlice';
import ccPresystemLettersSlice from './slices/ccPresystemLetterSlice';
import replyPresystemLettersSlice from './slices/repliedPresystemLettersSlice';
import internalMemoSlice from './slices/internalMemoSlice';
import ccinternalMemoSlice from './slices/ccInternalMemoSlice';
import forwardInternalMemoSlice from './slices/forwardInternalMemoSlice';
import replyinternalMemoSlice from './slices/replyInternalMemoSlice';
import scheduleDateSlice from './slices/dailyScheduleSlice';



const store  = configureStore({
    reducer:{
        application:applicationStateSlice.reducer,
        translation:translationSlice.reducer,
        getAllOfficeUsers: allOfficeUsersSlice.reducer,
        officeUsers:officeUsersSlice.reducer,
        cases:casesSlice.reducer,
        letters:lettersSlice.reducer,
        archivalUsers:archivalUsersSlice.reducer,
        customers:customerSlice.reducer,
        itUsers:itusersSlice.reducer,
        allItUsers:allItUsersSlice.reducer,
        windowServiceUsers:windowUsersSlice.reducer,
        ethicsUsers:ethicsUsersSlice.reducer,
        divisions:divisionSlice.reducer,
        allDivisions:allDivisionSlice.reducer,
        directorates:directorateSlice?.reducer,
        allDirectorates:allDirectorateSlice.reducer,
        teams:teamsSlice.reducer,
        allTeams:allTeamSlice.reducer,
        forwardCases:forwardCaseSlice.reducer,
        archivalCategory:archivalCategoriesSlice.reducer,
        userReply: userReplySlice,
        forwardPath:forwardPathSlice,
        replyPath:replyPathSlice,
        repliedCases:repliedCaseSlice.reducer,
        forwardLetters:forwardLettersSlice.reducer,
        repliedLetters:repliedLettersSlice.reducer,
        allCaseRequests:allCaseRequestSlice.reducer,
        allQuestions:allQuestionSlice.reducer,
        ccCases:cCCaseSlice.reducer,
        incomingLetters:incomingLettersSlice.reducer,
        forwardIncomingLetters:forwardIncomingLettersSlice.reducer,
        ccIncomingLetters:ccIncomingLettersSlice.reducer,
        replyIncomingLetters:replyIncomingLettersSlice.reducer,
        outgoingLetters:outgoingLettersSlice.reducer,
        forwardOutgoingLetters:forwardOutgoingLettersSlice.reducer,
        ccOutgoingLetters:ccoutgoingLettersSlice.reducer,
        replyOutgoingLetters:replyoutgoingLettersSlice.reducer,
        internalLetters:internalLettersSlice.reducer,
        forwardInternalLetters:forwardInternalLettersSlice.reducer,
        ccInternalLetters:ccinternalLettersSlice.reducer,
        replyInternalLetters:replyinternalLettersSlice.reducer,
        presystemLetters:presystemLettersSlice.reducer,
        forwardPresystemLetters:forwardPresystemLettersSlice.reducer,
        ccPresystemLetters:ccPresystemLettersSlice.reducer,
        replyPresystemLetters:replyPresystemLettersSlice.reducer,
        previewRoutes:previewSlice.reducer,
        internalMemo:internalMemoSlice.reducer,
        forwardInternalMemo:forwardInternalMemoSlice.reducer,
        ccInternalMemo:ccinternalMemoSlice.reducer,
        replyInternalMemo:replyinternalMemoSlice.reducer,
        scheduledDate:scheduleDateSlice.reducer
        
      
    }
})


export default store;