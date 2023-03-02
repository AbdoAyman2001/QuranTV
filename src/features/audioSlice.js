import { createSlice, current } from "@reduxjs/toolkit";
import { audioApi } from "./audioApi";
import { surahsApi } from "./surahsApi";

const initialState = {
  surahs: [],
  reciters: [],
  playingSurah: {
    src: "",
    surahName: "",
    reciterName: "",
    recitation: "",
  },
};

const audioSlice = createSlice({
  name: "audio",
  initialState,
  reducers: {
    play: (state) => {
      state.playing = true;
    },
    stop: (state) => {
      state.playing = false;
    },
    playDirectionalReciter: (state, { payload }) => {
      const reciterIndex = state.reciters.findIndex(
        (reciter) => reciter.name === state.playingSurah.reciterName
      );

      if (!payload?.direction)
        throw new Error('missing payload prop "direction"');
      if (
        payload.direction === "next" &&
        reciterIndex + 1 === state.reciters.length
      )
        return;
      if (payload.direction === "previous" && reciterIndex - 1 < 0) return;

      let reciter;
      payload.direction === "next"
        ? (reciter = state.reciters[reciterIndex + 1])
        : (reciter = state.reciters[reciterIndex - 1]);

      const telawah = reciter.moshaf[0];
      const surahSrc = Object.values(telawah.surah_src[0])[0];
      const surahNumber = Object.keys(telawah.surah_src[0])[0];
      const surah = state.surahs.find(
        (surah) => +surah.number === +surahNumber
      );
      state.playingSurah.surahName = surah.name;
      state.playingSurah.src = surahSrc;
      state.playingSurah.reciterName = reciter.name;
      state.playingSurah.recitation = telawah.name;
    },
    playDirectionalSurah: (state, { payload }) => {
      const { direction } = payload;
      if (
        direction === "next" &&
        state.playingSurah.surahName === state.surahs.at(-1).name
      )
        return;

      if (
        direction === "previous" &&
        state.playingSurah.surahName === state.surahs.at(0).name
      )
        return;

      const reciter = state.reciters.find(
        (reciter) => reciter.name === state.playingSurah.reciterName
      );
      const telawah = reciter.moshaf.find(
        (moshaf) => moshaf.name === state.playingSurah.recitation
      );
      const currentSurah = telawah.surah_src.find(
        (surah) => Object.values(surah)[0] === state.playingSurah.src
      );
      
      const currentSurahNumber = +Object.keys(currentSurah)[0];

      const nextSurah = telawah.surah_src.find((surah) => {
        if (direction === "next")
          return +Object.keys(surah)[0] === currentSurahNumber + 1;
        else return +Object.keys(surah)[0] === currentSurahNumber - 1;
      });

      state.playingSurah.surahName = state.surahs.find((surah) => {
        if (direction === "next")
          return +surah.number === +currentSurahNumber + 1;
        else return +surah.number === +currentSurahNumber - 1;
      }).name;
      state.playingSurah.src = Object.values(nextSurah)[0];
    },
    playPrevSurah: (state) => {},
    playSpecificSurah: (state, { payload }) => {
      const { reciterId, telawahId, surahNumber } = payload;
      const reciter = state.reciters.find(
        (reciter) => +reciterId === +reciter.id
      );
      const telawah = reciter.moshaf.find(
        (moshaf) => +moshaf.id === +telawahId
      );

      const surah = state.surahs.find(
        (surah, index) => +surah.number === +surahNumber
      );

      const surahSrc = telawah.surah_src.find(
        (surah, index) => +Object.keys(surah)[0] === +surahNumber
      );

      state.playingSurah.src = Object.values(surahSrc)[0];
      state.playingSurah.surahName = surah.name;
      state.playingSurah.recitation = telawah.name;
      state.playingSurah.reciterName = reciter.name;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      audioApi.endpoints.getReciters.matchFulfilled,
      (state, { payload }) => {
        state.reciters = payload;
      }
    );
    builder.addMatcher(
      surahsApi.endpoints.getSurahs.matchFulfilled,
      (state, { payload }) => {
        state.surahs = payload.data;
      }
    );
  },
});

export const {
  play,
  stop,
  playDirectionalReciter,
  playDirectionalSurah,
  playPrevSurah,
  playSpecificSurah,
} = audioSlice.actions;
const audioReducer = audioSlice.reducer;
export default audioReducer;
