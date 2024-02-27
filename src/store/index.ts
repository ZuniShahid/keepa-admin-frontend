import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "./api/api.slice";

const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

export type AppState = ReturnType<typeof store.getState>;

export default store;
