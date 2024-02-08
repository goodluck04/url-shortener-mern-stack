import { apiSlice } from "../api/apiSlice";

export const urlApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        generateUrl: builder.mutation({
            query: (data) => ({
                url: "url",
                method: "POST",
                body: data,
                credentials: "include",
            }),
        }),
        // backend endpoint+shortId
        getLink: builder.query({
            query: (id) => ({
                url: `get-url/${id}`,
                method: "GET",
                credentials: "include",
            }),
        }),
        deleteUrl: builder.mutation({
            query: (id) => ({
                url: `delete-url/${id}`,
                method: "DELETE",
                credentials: "include",
            }),
        }),
        editUrl: builder.mutation({
            query: ({ id, userId, url, urlName }) => ({
                url: `edit-url/${id}`,
                method: "PUT",
                body: { userId, url, urlName },
                credentials: "include",
            }),
        }),
        getUsersAllUrls: builder.query({
            query: (id) => ({
                url: `get-all-url/${id}`,
                method: "GET",
                credentials: "include",
            }),
        }),
        getUrlHistory: builder.query({
            query: (id) => ({
                url: `get-url/${id}`,
                method: "GET",
                credentials: "include",
            }),
        }),
        // redirectToLink: builder.query({
        //     query: (id) => ({
        //         url: `/${id}`,
        //         method: "GET",
        //         credentials: "include",
        //     }),
        // }),
    }),
});

export const {
    useGenerateUrlMutation,
    useGetUsersAllUrlsQuery,
    useEditUrlMutation,
    useGetLinkQuery,
    useGetUrlHistoryQuery,
    useDeleteUrlMutation,
} = urlApi;
