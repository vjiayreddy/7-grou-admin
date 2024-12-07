import { FetchBaseQueryArgs, fetchBaseQuery } from "@reduxjs/toolkit/query";
import { getSession } from "next-auth/react";

interface BaseQueryProps {
  fetchBaseQueryArgs?: FetchBaseQueryArgs | undefined;
}

const addTokenToRequest = async (headers: any, { getState }: any) => {
  const session: any = await getSession();
  if (session?.user?.token) {
    headers.set("Authorization", `Bearer ${session.user.token}`);
  }
  return headers;
};

const baseQuery = ({ fetchBaseQueryArgs }: BaseQueryProps) => {
  return fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: (headers, { getState }: any) => {
      return addTokenToRequest(headers, { getState });
    },
    ...fetchBaseQueryArgs,
  });
};

export default baseQuery;
