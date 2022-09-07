import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../queryConfig';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: baseQuery('/auth'),
  tagTypes: ['User'],
  endpoints: (build) => ({
    signIn: build.mutation({
      query: (body) => ({
        url: '/login',
        method: 'POST',
        body,
      }),
    }),
    registration: build.mutation({
      query: (body) => ({
        url: '/register',
        method: 'POST',
        body,
      }),
    }),
    logout: build.mutation({
      query: (body) => ({
        url: '/logout',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useSignInMutation, useRegistrationMutation, useLogoutMutation } = authApi;
