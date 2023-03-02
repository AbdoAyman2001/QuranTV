import { configureStore } from "@reduxjs/toolkit";
import audioReducer from "./audioSlice";
import { audioApi } from "./audioApi";
import { surahsApi } from "./surahsApi";

const store = configureStore({
  reducer: {
    [audioApi.reducerPath]: audioApi.reducer,
    [surahsApi.reducerPath]: surahsApi.reducer,
    audio: audioReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(audioApi.middleware)
      .concat(surahsApi.middleware),
});

export default store;
