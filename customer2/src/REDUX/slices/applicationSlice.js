import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sidebarOpened:false,
  loading: false,
  otpScreen:false,
  error: false,
};

const applicationSlice = createSlice({
  name: "APPLICATION",
  initialState,
  reducers: {
    setSideBarOpened:(state,action)=>{
      state.sidebarOpened = action.payload
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setOtpScreen:(state,action)=>{
      state.otpScreen = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const applicationAction = applicationSlice.actions;

export default applicationSlice;
