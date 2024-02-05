
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: "",
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        userLoggedIn: (state, action) => {
            state.user = action.payload;
        },
        userLoggedOut: (state) => {
            state.user = "";
        },
    }
});

export const { userLoggedIn, userLoggedOut } = userSlice.actions;

export default userSlice.reducer;