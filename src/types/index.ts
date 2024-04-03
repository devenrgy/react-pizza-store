export type PizzaItem = {
  id: number;
  imageUrl: string;
  title: string;
  types: number[];
  sizes: number[];
  price: number;
  category: number;
  rating: number;
};

export type CartPizzaItem = {
  imageUrl: string,
  id?: number,
  pizzaID: number,
  title: string,
  type: string,
  size: number,
  price: number,
  quantity: number,
}

export type PizzaData = {
  meta: Meta;
  items: PizzaItem[];
}

export type PizzaParams = {
  category: string,
  sort: string,
  q: string
}

export type Meta = {
  total_items: number;
  total_pages: number;
  current_page: number;
  per_page: number;
  remaining_count: number;
}
