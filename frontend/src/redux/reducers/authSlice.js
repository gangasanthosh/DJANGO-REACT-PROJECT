    import { createSlice } from '@reduxjs/toolkit';

    const initialState = {
    token: null,
    userType: null,
    userDetails: null,
    email: null, // Add email to the initial state
    };

    const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess(state, action) {
        state.token = action.payload.token;
        state.userType = action.payload.userType;
        state.userDetails = action.payload.userDetails;
        state.email = action.payload.email; // Update the state with email
        state.isAuthenticated = true;
        },
        logout(state) {
        state.token = null;
        state.userType = null;
        state.userDetails = null;
        state.email = null; // Clear email on logout
        state.isAuthenticated = false;
        },
    },
    });

    export const { loginSuccess, logout } = authSlice.actions;
    export default authSlice.reducer;
