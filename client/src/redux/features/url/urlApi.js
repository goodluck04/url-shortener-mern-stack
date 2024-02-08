import { apiSlice } from "../api/apiSlice";

export const urlApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        generateUrl: builder.mutation({
            query: (data) => ({
                url: "url",
                method: "POST",
                body: data,
            }),
        }),
        // backend endpoint+shortId
        getLink: builder.query({
            query: (id) => ({
                url: `get-url/${id}`,
                method: "GET",
            }),
        }),
        deleteUrl: builder.mutation({
            query: (id) => ({
                url: `delete-url/${id}`,
                method: "DELETE",
            }),
        }),
        editUrl: builder.mutation({
            query: ({ id, userId, url, urlName }) => ({
                url: `edit-url/${id}`,
                method: "PUT",
                body: { userId, url, urlName },
            }),
        }),
        getUsersAllUrls: builder.query({
            query: (id) => ({
                url: `get-all-url/${id}`,
                method: "GET",
            }),
        }),
        getUrlHistory: builder.query({
            query: (id) => ({
                url: `get-url/${id}`,
                method: "GET",
            }),
        }),
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
