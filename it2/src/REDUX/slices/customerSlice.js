import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiRequest from "../../utils/request";


const token = sessionStorage.getItem("tID");

export const fetchCustomers = createAsyncThunk("customers/fetchCustomers", async({page,sort,status,phone,hasLogged}) => {
  return apiRequest
    .get(`/customer_user_api/get_customer_user?page=${page}&sort=${sort}&status=${status}&phone=${phone}&haslogged=${hasLogged}`, {
      headers: {
        "Content-Type": "application/json",
        get_cuserslist_api: process.env.REACT_APP_GET_CUSERSLIST_API,
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
});


const initialState = {
  customers: [],
  loading: false,
  error: false,
};

const customersSlice = createSlice({
  name: "CUSTOMER",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchCustomers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchCustomers.fulfilled, (state, action) => {
      state.loading = false;
      state.customers = action.payload;
      state.error = false;
    });
    builder.addCase(fetchCustomers.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export const customerAction = customersSlice.actions;

export default customersSlice;
