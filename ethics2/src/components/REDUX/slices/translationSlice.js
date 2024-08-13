import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    lan:'En',
}

const translationSlice = createSlice({
    name:'TRANSLATION',
    initialState,
    reducers:{
        setLan:(state,action)=>{
            state.lan = action.payload;
        }
    }
})

export const translationAction = translationSlice.actions;

export default translationSlice;