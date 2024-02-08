import { apiSlice } from "../api/apiSlice";
import { userLoggedIn, userLoggedOut } from "./authSlice";

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
           
        }),
        logout: builder.query({
            query: () => ({
                url: "signout",
                method: "GET",
                credentials: "include",
            }),
            // it will return data
            async onQueryStarted(arg, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    dispatch(userLoggedOut())
                } catch (error) {
                    console.log(error);

                }
            },
        }),
    })
});

export const {
    useLoginMutation,
    useSignupMutation,
    useLogoutQuery,
} = authApi;
