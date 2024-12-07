import { createApi } from "@reduxjs/toolkit/query/react";
import { API_ROUTES } from "../apiRoutes";
import { fetchMarketsByFiltersResponseType } from "@/typescript/types";
import baseQuery from "../base-query/baseQuery";

export const marketApi = createApi({
  reducerPath: "marketApi",
  baseQuery: baseQuery({}),
  tagTypes: ["marketApi", "fetchMarketsByFilters"],
  endpoints: (builder) => ({
    fetchMarketsByFilters: builder.query<fetchMarketsByFiltersResponseType, {}>(
      {
        providesTags: ["fetchMarketsByFilters"],
        query: () => {
          return {
            url: API_ROUTES.FETCH_MARKETS,
            method: "GET",
            params: {
              page: 1,
              limit: 1000,
            },
          };
        },
      }
    ),
    fetchMarketCategoryNumber: builder.query<any, { gameRateId: string }>({
      providesTags: ["fetchMarketsByFilters"],
      query: ({ gameRateId }) => {
        return {
          url: API_ROUTES.FIND_MARKER_CATEGORY_NUMBER,
          method: "GET",
          params: {
            page: 1,
            limit: 1000,
            gameRateId,
          },
        };
      },
    }),
  }),
});

export const {
  useFetchMarketsByFiltersQuery,
  useLazyFetchMarketsByFiltersQuery,
  useLazyFetchMarketCategoryNumberQuery,
  useFetchMarketCategoryNumberQuery,
} = marketApi;
