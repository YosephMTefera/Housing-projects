import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    dashboardLoading:true
}


const applicationStateSlice = createSlice({
    name:'APPLICATIONSTATE',
    initialState,
    reducers:{
        setDashboardLoading:(state,action)=>{
            state.dashboardLoading = action.payload
        }
    }
})


export const applicationAction = applicationStateSlice.actions;


export default applicationStateSlice;