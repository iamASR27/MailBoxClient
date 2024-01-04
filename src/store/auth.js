import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
    token: localStorage.getItem("token") || null,
    // userId: localStorage.getItem("userId") || null,
    userEmail: localStorage.getItem("userEmail") || null,
    isLoggedIn: !!localStorage.getItem("token"),
}

const authSlice = createSlice({
    name: 'auth',
    initialState: initialAuthState,
    reducers: {
        login(state, action) {
            state.isLoggedIn = true;
            // console.log(state.isLoggedIn)
            state.token = action.payload.token;
            // state.userId = action.payload.userId;
            state.userEmail = action.payload.userEmail;
        },
        logout(state) {
            state.isLoggedIn = false;
            // console.log(state.isLoggedIn)
            state.token = null;
            // state.userId = null;
            state.userEmail = null;
        },
    }
})

export const authActions = authSlice.actions;

export default authSlice;