import { createSlice } from "@reduxjs/toolkit";


//console.log("From userSlice.js");
const initialState = {
    currentUser: null,
    error: null,
    loading: false
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true;
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        signInFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        }
    }
});

//provides easy access to the action creators
export const {signInStart, signInSuccess, signInFailure} = userSlice.actions;

//provides access to the reducer function.
export default userSlice.reducer;

/*
    Actions: "Hey, something happened!"
    Reducers: "Here's what we should do about it."
*/