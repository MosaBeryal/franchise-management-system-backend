import { ApiSlice } from "../ApiSlice";

const UsersApi = ApiSlice.injectEndpoints({
  endpoints: (build) => ({
    getUsers: build.query({
      query: (memberId) => "/users/" + memberId,
      providesTags: ["Users"],
    }),

    createUser: build.mutation({
      query: (body) => ({
        url: "/users",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Users"],
    }),

    updateUser: build.mutation({
      query: (args) => {
        const { id, body } = args;
        return {
          url: "/users/" + id,
          method: "PUT",
          body: body,
        };
      },
      invalidatesTags: ["Users"],
    }),
    deleteUser: build.mutation({
      query: (id) => ({
        url: `/users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),

    // user assignment
    getUserAssignment: build.query({
      query: (memberId) => "/user-assignment/" + memberId,
      providesTags: ["UserAssignment"],
    }),

    assignUser: build.mutation({
      query: (body) => ({
        url: "/user-assignment",
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["UserAssignment"],
    }),

    deleteUserAssignment: build.mutation({
      query: (id) => ({
        url: `/user-assignment/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["UserAssignment"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,

  // assignemd users
  useGetUserAssignmentQuery,
  useAssignUserMutation,
  useDeleteUserAssignmentMutation,
} = UsersApi;
