import apiSlice from "../api/api.slice";
import {
  Category,
  DeleteCategoryVariables,
  CreateCategoryVariables,
  UpdateCategoryVariables,
} from "./categories.types";

const itemsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    createCategory: builder.mutation<Category, CreateCategoryVariables>({
      query: ({ body }) => ({
        method: "POST",
        url: "/api/categories",
        body,
      }),
    }),
    deleteCategory: builder.mutation<{ message: string }, DeleteCategoryVariables>({
      query: ({ id }) => ({
        method: "DELETE",
        url: `/api/categories/${id}`,
      }),
    }),
    getCategories: builder.query<Category[], void>({
      query: () => ({
        method: "GET",
        url: "/api/categories",
      }),
    }),
    updateCategory: builder.mutation<Category, UpdateCategoryVariables>({
      query: ({ body, id }) => ({
        method: "PUT",
        url: `/api/categories/${id}`,
        body,
      }),
    }),
  }),
});

export const {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
  useUpdateCategoryMutation,
} = itemsApiSlice;
