import { apiSlice } from "../api/apiSlice";
import { userLoggedIn } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        signup: builder.mutation({
            query: (data) => ({
                url: "signup",
                method: "POST",
                body: data,
                credentials: "include"
            })
        }),
        login: builder.mutation({
            query: (data) => ({
                url: "signin",
                method: "POST",
                body: data,
                credentials: "include"
            }),
           
        })
    })
});

export const {
    useLoginMutation,
    useSignupMutation,
} = authApi;
