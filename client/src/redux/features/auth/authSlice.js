
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   userId:"",
    user: "",
}

const userSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
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

export const { userLoggedIn, userLoggedOut } = userSlice.actions;
export default userSlice.reducer;

