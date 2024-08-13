import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiRequest from "../../utils/request";



export const fetchAllDivision = createAsyncThunk("allDivision/fetchAllDivision", async(_, { dispatch }) => {
  return apiRequest
    .get(`/division_api/get_all_divisions`, {
      headers: {
        "Content-Type": "application/json",
        get_divs_api: process.env.REACT_APP_GET_DIVS_API,
      
      },
    })
    .then((res) => res.data).catch((error)=>{
      if(error?.response?.status ===429){
        dispatch(divisionAction.setLimitError(true));
      }
    })
    
});

const initialState = {
  divisions: [],
  loading: false,
  limitError:false,
  error: false,
};

const allDivisionSlice = createSlice({
  name: "ALLDIVISION",
  initialState,
  reducers:{
    setLimitError: (state, action) => {
      state.limitError = action.payload;
    },

  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllDivision.pending, (state) => {
      state.loading = true;
      state.limitError = false;
      state.error = false
    });
    builder.addCase(fetchAllDivision.fulfilled, (state, action) => {
      state.loading = false;
      state.divisions = action.payload;
      state.limitError = false;
      state.error = false;
    });
    builder.addCase(fetchAllDivision.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export const divisionAction = allDivisionSlice.actions;

export default allDivisionSlice;
