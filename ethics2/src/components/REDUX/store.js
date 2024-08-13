import {configureStore} from '@reduxjs/toolkit';
import translationSlice from './slices/translationSlice';
import accusationsSlice from './slices/accusationSlice';


const store = configureStore({
    reducer:{
        translation:translationSlice.reducer,
        accusations:accusationsSlice.reducer
        
    }
    
})

export default store;