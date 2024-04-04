import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { CartPizzaItem, PizzaData, PizzaParams } from 'types';

export const pizzaApi = createApi({
  reducerPath: 'pizzaApi',
  tagTypes: ['PizzaItems'],
  baseQuery: fetchBaseQuery({ baseUrl: 'https://4275eac693d4b299.mokky.dev/' }),
  endpoints: (build) => ({
    getPizzaItems: build.query<PizzaData, PizzaParams>({
      query: (data) => {
        const { category, sort = 'rating', q = '', page } = data;

        return {
          url: 'items',
          params: { page, category, sortBy: sort, title: '*' + q, limit: 4 },
        };
      },

      providesTags: (result) =>
        result
          ? [
            ...result.items.map(({ id }) => ({ type: 'PizzaItems' as const, id })),
            { type: 'PizzaItems', id: 'LIST' },
          ]
          : [{ type: 'PizzaItems', id: 'LIST' }],
    }),
    getCartPizzaItems: build.query<CartPizzaItem[], void>({
      query: () => 'cart',
      providesTags: (result) =>
        result
          ? [
            ...result.map(({ id }) => ({ type: 'PizzaItems' as const, id })),
            { type: 'PizzaItems', id: 'LIST' },
          ]
          : [{ type: 'PizzaItems', id: 'LIST' }],
    }),
    addPizzaItem: build.mutation<CartPizzaItem, CartPizzaItem>({
      query(body) {
        return {
          url: `cart`,
          method: 'POST',
          body,
        };
      },
      invalidatesTags: [{ type: 'PizzaItems', id: 'LIST' }],
    }),
    updatePizzaItem: build.mutation<CartPizzaItem, Partial<CartPizzaItem>>({
      query(data) {
        const { id, ...body } = data;
        return {
          url: `cart/${id}`,
          method: 'PATCH',
          body,
        };
      },
      invalidatesTags: [{ type: 'PizzaItems', id: 'LIST' }],
    }),
    deletePizzaItem: build.mutation<{ success: boolean; id: number }, number>({
      query(id) {
        return {
          url: `cart/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: (_, __, id) => [{ type: 'PizzaItems', id }],
    }),
  }),
});

export const {
  useAddPizzaItemMutation,
  useGetPizzaItemsQuery,
  useGetCartPizzaItemsQuery,
  useUpdatePizzaItemMutation,
  useDeletePizzaItemMutation,
} = pizzaApi;