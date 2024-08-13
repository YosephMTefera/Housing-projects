import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiRequest from "../../utils/request";




export const fetchAllDirectorate = createAsyncThunk(
  "allDirectorate/fetchAllDirectorate",
  async(_, { dispatch }) => {
    return apiRequest
      .get(`/directorate_api/get_all_directorate`, {
        headers: {
          "Content-Type": "application/json",
          get_directs_api: process.env.REACT_APP_GET_DIRECTS_API,
         
        },
      })
      .then((res) => res.data).catch((error)=>{
        if(error?.response?.status ===429){
          dispatch(allDirectorateAction.setLimitError(true));
        }
      })
     }
);

const initialState = {
  directorates: [],
  loading: false,
  limitError:false,
  error: false,
};

const allDirectorateSlice = createSlice({
  name: "ALLDIRECTORATE",
  initialState,
  reducers:{
    setLimitError: (state, action) => {
      state.limitError = action.payload;
    },

  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllDirectorate.pending, (state) => {
      state.loading = true;
      state.limitError = false
    });
    builder.addCase(fetchAllDirectorate.fulfilled, (state, action) => {
      state.loading = false;
      state.directorates = action.payload;
      state.limitError = false
      state.error = false;
    });
    builder.addCase(fetchAllDirectorate.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export const allDirectorateAction = allDirectorateSlice.actions;

export default allDirectorateSlice;
