import {
  BaseQueryFn,
  FetchArgs,
  createApi,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

const BASE_URL = import.meta.env.VITE_SERVER_ENDPOINT;

interface CustomError {
  status?: number;
  data: {
    errors: { [k: string]: string[] };
  };
}

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: BASE_URL }) as BaseQueryFn<
    string | FetchArgs,
    unknown,
    CustomError,
    {}
  >,
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      transformErrorResponse: (response) => response.data.errors[0],
      query: (body: { username: string; password: string }) => {
        return {
          url: "/api/users/login",
          method: "post",
          body,
        };
      },
    }),
  }),
});

export const { useLoginUserMutation } = authApi;
