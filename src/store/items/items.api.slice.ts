import apiSlice from "../api/api.slice";
import { GetItemsResponse, Item, PutItemVariables } from "./items.types";

const itemsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getItem: builder.query<Item, string>({
      query: (id: string) => ({
        method: "GET",
        url: `/api/items/${id}`,
      }),
    }),
    getItems: builder.query<GetItemsResponse, void>({
      query: () => ({
        method: "GET",
        url: "/api/items",
      }),
    }),
    putItem: builder.mutation<Item, PutItemVariables>({
      query: ({ body, itemId }) => ({
        method: "PUT",
        url: `/api/items/${itemId}`,
        body,
      }),
    }),
  }),
});

export const { useGetItemQuery, useGetItemsQuery, usePutItemMutation } = itemsApiSlice;
