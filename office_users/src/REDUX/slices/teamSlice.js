import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiRequest from "../../utils/request";


const token = sessionStorage.getItem("tID");

export const fetchTeams = createAsyncThunk("teams/fetchTeams", () => {
  return apiRequest
    .get(`/team_leader_api/get_team`, {
      headers: {
        "Content-Type": "application/json",
        get_user_api: process.env.REACT_APP_GET_USER_API,
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data)
});


const initialState = {
  teams: [],
  loading: false,
  error: false,
};

const teamsSlice = createSlice({
  name: "TEAMS",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchTeams.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchTeams.fulfilled, (state, action) => {
      state.loading = false;
      state.teams = action.payload;
      state.error = false;
    });
    builder.addCase(fetchTeams.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export const teamsAction = teamsSlice.actions;

export default teamsSlice;
