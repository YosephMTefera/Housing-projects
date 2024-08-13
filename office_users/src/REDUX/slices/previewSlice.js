import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    previewRoute:true
}


const previewSlice = createSlice({
    name:'PREVIEWSLICE',
    initialState,
    reducers:{
        setPreviewRoute:(state,action)=>{
            state.previewRoute = action.payload
        }
    }
})

export const previewAction = previewSlice.actions;

export default previewSlice;