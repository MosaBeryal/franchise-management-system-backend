import { ApiSlice } from "../ApiSlice";

export const VehiclesApis = ApiSlice.injectEndpoints({
  endpoints: (build) => ({
    getVehicles: build.query({
      query: (memberId) => "/vehicles/" + memberId,
      providesTags: ["Vehicle"],
    }),
    addVehicle: build.mutation({
      query: (body) => ({
        url: "/vehicles",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Vehicle"],
    }),
    updateVehicle: build.mutation({
      query: (args) => {
        const { id, body } = args;
        return {
          url: `/vehicles/${id}`,
          method: "PUT",
          body,
        };
      },
      invalidatesTags: ["Vehicle"],
    }),
    deleteVehicle: build.mutation({
      query: (id) => ({
        url: `/vehicles/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Vehicle"],
    }),
  }),
});

export const {
  useGetVehiclesQuery,
  useAddVehicleMutation,
  useUpdateVehicleMutation,
  useDeleteVehicleMutation,
} = VehiclesApis;
