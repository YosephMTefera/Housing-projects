import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import apiRequest from "../../utils/request";

export const fetchAllTeams = createAsyncThunk(
  "teams/fetchallTeams",
  async (_, { dispatch }) => {
    return apiRequest
      .get(`/team_leader_api/get_all_team`, {
        headers: {
          "Content-Type": "application/json",
          get_teams_api: process.env.REACT_APP_GET_TEAMS_API,
        },
      })
      .then((res) => res?.data).catch((error)=>{
        if(error?.response?.status ===429){
          dispatch(AllTeamAction.setLimitError(true));
        }
      });
  }
);

const initialState = {
  teams: [],
  loading: false,
  limitError:false,
  error: false,
};

const allTeamSlice = createSlice({
  name: "ALLTEAMS",
  initialState,
  reducers:{
    setLimitError: (state, action) => {
      state.limitError = action.payload;
    },

  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllTeams.pending, (state) => {
      state.loading = true;
      state.limitError = false
    });
    builder.addCase(fetchAllTeams.fulfilled, (state, action) => {
      state.loading = false;
      state.teams = action.payload;
      state.limitError = false
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
