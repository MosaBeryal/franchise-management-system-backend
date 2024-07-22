import { ApiSlice } from "../ApiSlice";
const RouteApis = ApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getRouteMaster: builder.query({
      query: (memberId) => `/routes/` + memberId,
      providesTags: ["RouteMaster"],
    }),
    postRouteMaster: builder.mutation({
      query: (body) => ({
        url: `/routes`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["RouteMaster"],
    }),
    putRouteMaster: builder.mutation({
      query: ({ id, body }) => ({
        url: `/routes/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["RouteMaster"],
    }),
    deleteRouteMaster: builder.mutation({
      query: (id) => ({
        url: `/routes/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["RouteMaster"],
    }),
  }),
});

export const {
  useGetRouteMasterQuery,
  usePostRouteMasterMutation,
  usePutRouteMasterMutation,
  useDeleteRouteMasterMutation,
} = RouteApis;
