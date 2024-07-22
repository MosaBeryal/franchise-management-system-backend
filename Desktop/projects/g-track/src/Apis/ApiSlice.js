import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const ApiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://gs1ksa.org:4091/api/v1",
    // baseUrl: "http://127.0.0.1:4091/api/v1",
    // prepareHeaders: (headers, { getState }) => {
    //   const token = getState()?.auth?.user?.token;
    //   headers.set('authorization', `Bearer ${token}`);
    //   return headers;
    // },
  }),
  endpoints: () => ({}),
});
