import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiRequest from "../../utils/request";

const token = sessionStorage.getItem("tID");

export const fetchCases = createAsyncThunk("cases/fetchCases",async ({page,sort,status,caseNumber,name,phone,customer_id},{dispatch}) => {
  return apiRequest
    .get(`/customer_case_api/get_case?page=${page}&sort=${sort}&status=${status}&case_number=${caseNumber}&phone_number=${phone}&customer_id=${customer_id}&firstname=${name}`, {
      headers: {
        "Content-Type": "application/json",
        get_gecases_api: process.env.REACT_APP_GET_GECASES_API,
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data).catch((error)=>{
      if(error?.response?.status ===429){
        dispatch(casesAction.setLimitError(true));
      }
    })
 
});

const initialState = {
  cases: [],
  loading: false,
  limitError:false,
  error: false,
};

const casesSlice = createSlice({
  name: "CASES",
  initialState,
  reducers:{
    setLimitError: (state, action) => {
      state.limitError = action.payload;
    },

  },
  extraReducers: (builder) => {
    builder.addCase(fetchCases.pending, (state) => {
      state.loading = true;
      state.limitError = false
    });
    builder.addCase(fetchCases.fulfilled, (state, action) => {
      state.loading = false;
      state.cases = action.payload;
      state.limitError = false
      state.error = false;
    });
    builder.addCase(fetchCases.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export const casesAction = casesSlice.actions;

export default casesSlice;
