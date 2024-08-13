import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiRequest from "../../utils/request";

const token = sessionStorage.getItem("tID");

export const fetchAllTeams = createAsyncThunk("teams/fetchallTeams",async () => {
  return apiRequest
    .get(`/team_leader_api/get_all_team`, {
      headers: {
        "Content-Type": "application/json",
        get_teams_api: process.env.REACT_APP_GET_TEAMS_API,
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
 
});

const initialState = {
  teams: [],
  loading: false,
  error: false,
};

const allTeamSlice = createSlice({
  name: "ALLTEAMS",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchAllTeams.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchAllTeams.fulfilled, (state, action) => {
      state.loading = false;
      state.teams = action.payload;
      state.error = false;
    });
    builder.addCase(fetchAllTeams.rejected, (state) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export const AllTeamAction = allTeamSlice.actions;

export default allTeamSlice;
