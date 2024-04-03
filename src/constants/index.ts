export const CATEGORIES = [
  {
    path: '',
    name: 'Все',
  },
  {
    path: 'meat',
    name: 'Мясные',
  },
  {
    path: 'vegan',
    name: 'Вегетарианские',
  },
  {
    path: 'grill',
    name: 'Гриль',
  },
  {
    path: 'hot',
    name: 'Острые',
  },
  {
    path: 'closed',
    name: 'Закрытые',
  },
] as const;

export const PIZZA_DOUGH = ['тонкое', 'традиционное'] as const;

export const PIZZA_SIZES = [26, 30, 40] as const;

export const SORT_LIST: Record<string, string> = {
  rating: 'рейтингу',
  price: 'возрастанию цены',
  '-price': 'убыванию цены',
  title: 'алфавиту',
};