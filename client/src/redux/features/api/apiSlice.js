import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userLoggedIn } from "../auth/authSlice";
import { data } from "autoprefixer";

export const apiSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_SERVER_URI,
    }),
    endpoints: (builder) => ({
        loadUser: builder.query({
            query: (data) => ({
                url: "me",
                method: "GET",
                credentials: "include",
            }),
            // give user info
            // cache or store the user in store
            async onQueryStarted(args, { queryFulfilled, dispatch }) {
                try {
                    const result = await queryFulfilled;
                    dispatch(
                        userLoggedIn({
                            userId: result.data.id,
                            user: result.data.username,
                        })
                    );
                } catch (error) {
                    console.error('Error in onQueryStarted:', error);
                }
            }
        }),
    })
});

export const { useLazyLoadUserQuery } = apiSlice;
