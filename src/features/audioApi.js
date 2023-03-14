import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const toThreeDigits = (number) => {
  if (number < 10) return "00" + number;
  if (number < 100) return "0" + number;
  else return number;
};

export const audioApi = createApi({
  reducerPath: "audioApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://mp3quran.net/api/v3",
  }),
  endpoints: (builder) => ({
    getReciters: builder.query({
      query: (args) => {
        return {
          url: "reciters",
          params: { language: "ar", ...args },
        };
      },
      transformResponse: (response) => {
        const reciters = response.reciters;
        reciters.forEach((Reciter, index, reciters) => {
          Reciter.moshaf.forEach((telawah, index, moshaf) => {
            telawah.surah_list = telawah.surah_list.split(",");
            telawah.surah_src = [];
            telawah.surah_list.forEach((surah) => {
              const surahSrcObj = {};
              surahSrcObj[`${surah}`] = `${telawah.server}${toThreeDigits(
                +surah
              )}.mp3`;
              telawah.surah_src.push(surahSrcObj);
            });
            Reciter.moshaf = moshaf;
            Reciter.isFav = Boolean(localStorage.getItem(Reciter.id));
          });
        });
        reciters.sort((a, b) => {
          if (a.isFav === false && b.false === true) return 1;
          else if (a.isFav === true && b.isFav === false) return -1;
          else if (a.isFav === b.isFav) return 0;
        });
        return reciters;
      },
    }),
  }),
});

export const { useGetRecitersQuery } = audioApi;
