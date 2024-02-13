
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   userId:"",
    user: "",
}

const userSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        userLoggedIn2: (state, action) => {
            state.userId = action.payload.userId;
            state.user = action.payload.user;
        },
        userLoggedIn: (state, action) => {
            state.userId = action.payload.userId;
            state.user = action.payload.user;
        },
        userLoggedOut: (state) => {
            state.userId = "";
            state.user = "";
        },
    }
});

export const { userLoggedIn,userLoggedIn2,userLoggedOut } = userSlice.actions;
export default userSlice.reducer;

