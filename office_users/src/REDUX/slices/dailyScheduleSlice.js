import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiRequest from "../../utils/request";


const token = sessionStorage.getItem("tID");

export const fetchScheduleDate = createAsyncThunk("schedule/scheduleDate",async ({scheduleDate}) => {
  return apiRequest
    .get(`/customer_case_api/get_daily_schedule?date=${scheduleDate}`, {
      headers: {
      
        get_extfourth_api: process.env.REACT_APP_GET_EXTFOURTH_API,
        Authorization: `Bearer ${token}`,
      },
    }).then((res)=>res.data)
});


const initialState = {
  scheduleDate: [],
  loading: false,
  error: false,
};

const scheduleDateSlice = createSlice({
  name: "SCHEDULEDATE",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchScheduleDate.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchScheduleDate.fulfilled, (state, action) => {
      state.loading = false;
      state.scheduleDate = action.payload;
      state.error = false;
    });
    builder.addCase(fetchScheduleDate.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export const scheduleDateAction = scheduleDateSlice.actions;

export default scheduleDateSlice;
