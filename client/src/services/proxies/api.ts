import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../queryConfig';

export const proxiesApi = createApi({
  reducerPath: 'proxiesApi',
  baseQuery: baseQuery('/proxies'),
  tagTypes: ['AccountsList'],
  endpoints: (builder) => ({
    getProxies: builder.query({
      query: () => '/',
      providesTags: ['AccountsList'],
    }),
  }),
});

export const { useGetProxiesQuery } = proxiesApi;
