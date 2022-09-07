import { fetchBaseQuery } from '@reduxjs/toolkit/query';

export const apiUrl = 'http://localhost:3000/v1';

export const baseQuery = (baseUrl: string) => fetchBaseQuery({
  baseUrl: `${apiUrl}${baseUrl}`,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      headers.set('Authorization', `Bearer ${token}`);
    }
    return headers;
  },
});
