import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const surahsApi = createApi({
  reducerPath: "surahsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://api.alquran.cloud/v1/",
  }),
  endpoints: (builder) => ({
    getSurahs: builder.query({
      query: () => "surah",
    }),
  }),
});

export const { useGetSurahsQuery } = surahsApi;
