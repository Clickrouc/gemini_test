import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const apiSlice = createApi({
  reducerPath: 'apiSlice',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:3000/v1',
    prepareHeaders: (headers) => {
      headers.set('authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MzE3NjVlNjZkM2NiNzJjNTA5Y2JkODYiLCJpYXQiOjE2NjI0ODc3NjEsImV4cCI6MTY2MjQ4OTU2MSwidHlwZSI6ImFjY2VzcyJ9.3vpAWs-MgxjUy40mQWU5rpIbM8yYjNBuIzexs7vfyzk');
      return headers;
    },
  }),
  tagTypes: ['Account'],
  endpoints: (builder) => ({
    createAccount: builder.mutation({
      query: ({ body }) => ({
        url: '/accounts',
        method: 'POST',
        body,
      }),
    }),
    getAccounts: builder.query({
      query: () => '/accounts',
    }),
  }),
});

export const {
  useGetAccountsQuery,
  useCreateAccountMutation,
} = apiSlice;
