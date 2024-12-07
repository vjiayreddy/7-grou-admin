import { createApi } from "@reduxjs/toolkit/query/react";
import { API_ROUTES } from "../apiRoutes";
import { fetchGameRateResponseType } from "@/typescript/types";
import baseQuery from "../base-query/baseQuery";

export const mainGameRateApi = createApi({
  reducerPath: "mainGameRateApi",
  baseQuery: baseQuery({}),
  tagTypes: ["mainGameRateApi", "fetchMainGameRate"],
  endpoints: (builder) => ({
    fetchMainGameRate: builder.query<fetchGameRateResponseType, {}>({
      providesTags: ["fetchMainGameRate"],
      query: () => {
        return {
          url: API_ROUTES.FETCH_MAIN_GAME_RATE,
          method: "GET",
        };
      },
    }),
    updateMainGameRate: builder.mutation<any, { body: any }>({
      query: ({ body }) => {
        return {
          url: `${API_ROUTES.UPDATE_MAIN_GAME_RATE}`,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["fetchMainGameRate"],
    }),
  }),
});

export const { useLazyFetchMainGameRateQuery, useUpdateMainGameRateMutation } =
  mainGameRateApi;
