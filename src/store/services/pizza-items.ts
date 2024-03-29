import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface PizzaItem {
  id: number;
  imageUrl: string;
  title: string;
  types: number[];
  sizes: number[];
  price: number;
  category: number;
  rating: number;
}

type PizzaItemsResponse = PizzaItem[];

export const pizzaApi = createApi({
  reducerPath: 'pizzaApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://4275eac693d4b299.mokky.dev/' }),
  endpoints: (build) => ({
    getAllPizzaItems: build.query<PizzaItemsResponse, void>({
      query: () => 'items',
    }),
    getCartPizzaItems: build.query<PizzaItemsResponse, void>({
      query: () => 'cart',
    }),
    addPizzaItem: build.mutation<PizzaItem, Partial<PizzaItem>>({
      query(body) {
        return {
          url: `cart`,
          method: 'POST',
          body,
        };
      },
    }),
    updatePizzaItem: build.mutation<PizzaItem, Partial<PizzaItem>>({
      query(data) {
        const { id, ...body } = data;
        return {
          url: `cart/${id}`,
          method: 'PUT',
          body,
        };
      },
    }),
    deletePizzaItem: build.mutation<{ success: boolean; id: number }, number>({
      query(id) {
        return {
          url: `cart/${id}`,
          method: 'DELETE',
        };
      },
    }),
  }),
});

export const {
  endpoints,
  useAddPizzaItemMutation,
  useGetAllPizzaItemsQuery,
  useGetCartPizzaItemsQuery,
  useUpdatePizzaItemMutation,
  useDeletePizzaItemMutation,
} = pizzaApi;
