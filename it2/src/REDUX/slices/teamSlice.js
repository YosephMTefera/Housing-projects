import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiRequest from "../../utils/request";

const token = sessionStorage.getItem("tID");

export const fetchTeams = createAsyncThunk("teams/fetchTeams",async ({page,sort,name,status,directorate}) => {
  return apiRequest
    .get(`/team_leader_api/get_team?page=${page}&sort=${sort}&searchName=${name}&status=${status}&directorate=${directorate}`, {
      headers: {
        "Content-Type": "application/json",
        get_teams_api: process.env.REACT_APP_GET_TEAMS_API,
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

const teamSlice = createSlice({
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

export const teamAction = teamSlice.actions;

export default teamSlice;
