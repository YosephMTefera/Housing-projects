import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiRequest from "../../utils/request";

const token = sessionStorage.getItem("tID");

export const fetchCaseList = createAsyncThunk("caseList/fetchCaseList",async (_, { dispatch }) => {
  return apiRequest
    .get(`/case_list_api/get_case_list`, {
      headers: {
        "Content-Type": "application/json",
        get_user_api: process.env.REACT_APP_GET_USER_API,
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data).catch((error)=>{
      if(error?.response?.status ===429){
        dispatch(caseListAction.setLimitError(true));
      }
    })
  
});

const initialState = {
  caseList: [],
  loading: false,
  limitError:false,
  error: false,
};

const caseListSlice = createSlice({
  name: "CASESLIST",
  initialState,
  reducers:{
    setLimitError: (state, action) => {
      state.limitError = action.payload;
    },

  },
  extraReducers: (builder) => {
    builder.addCase(fetchCaseList.pending, (state) => {
      state.loading = true;
      state.limitError = false
    });
    builder.addCase(fetchCaseList.fulfilled, (state, action) => {
      state.loading = false;
      state.caseList = action.payload;
      state.limitError = false
      state.error = false;
    });
    builder.addCase(fetchCaseList.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export const caseListAction = caseListSlice.actions;

export default caseListSlice;
