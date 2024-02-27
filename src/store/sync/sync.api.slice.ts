import apiSlice from "../api/api.slice";

const itemsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createSyncItems: builder.mutation<string, object>({
      query: () => ({
        method: "POST",
        url: "/api/sync-items",
      }),
    }),
  }),
});

export const { useCreateSyncItemsMutation } = itemsApiSlice;
