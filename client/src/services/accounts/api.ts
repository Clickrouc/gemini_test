import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../queryConfig';

export const accountsApi = createApi({
  reducerPath: 'accountsApi',
  baseQuery: baseQuery('/accounts'),
  tagTypes: ['AccountsList'],
  endpoints: (builder) => ({
    updateAccount: builder.mutation({
      query: (body) => ({
        url: '/',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['AccountsList'],
    }),
    getAccounts: builder.query({
      query: () => '/',
      providesTags: ['AccountsList'],
    }),
    deleteAccount: builder.mutation({
      query: (body) => ({
        url: '/',
        method: 'DELETE',
        body,
      }),
      invalidatesTags: ['AccountsList'],
    }),
  }),
});

export const {
  useGetAccountsQuery,
  useUpdateAccountMutation,
  useDeleteAccountMutation,
} = accountsApi;
