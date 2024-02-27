import apiSlice from "../api/api.slice";
import { CreateShopVariables, Shop, ShopExtended } from "./shops.types";

const itemsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createShop: builder.mutation<Shop, CreateShopVariables>({
      query: ({ body }) => ({
        method: "POST",
        url: "/api/shops",
        body,
      }),
    }),
    getShop: builder.query<ShopExtended, string>({
      query: (id: string) => ({
        method: "GET",
        url: `/api/shops/${id}`,
      }),
    }),
    getShops: builder.query<Shop[], void>({
      query: () => ({
        method: "GET",
        url: "/api/shops",
      }),
    }),
  }),
});

export const { useCreateShopMutation, useGetShopQuery, useGetShopsQuery } = itemsApiSlice;
