import { ApiSlice } from "../ApiSlice";

export const salesOrders = ApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getUserEmails: builder.query({
      query: (memberId) => "/user-assignment/users-for-picklist/" + memberId,
    }),

    getAllAssignedOrders: builder.query({
      query: (memberId) => "/orders/get-assigned-orders/" + memberId,
      providesTags: ["AssignedOrders"],
    }),

    assignSalesOrders: builder.mutation({
      query: (data) => ({
        url: "/orders/assign-orders-to-user",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["AssignedOrders"],
    }),

    deleteAssignedOrder: builder.mutation({
      query: (id) => ({
        url: `/orders/assiged-orders/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["AssignedOrders"],
    }),
  }),
});

export const {
  useGetUserEmailsQuery,
  useAssignSalesOrdersMutation,
  useGetAllAssignedOrdersQuery,
  useDeleteAssignedOrderMutation,
} = salesOrders;
