import { AnimatePresence } from 'framer-motion';

import { PizzaCard } from 'components/pizza-list/pizza-card';

import { PizzaItem } from 'types';

interface Props {
  items: PizzaItem[];
}

export default function PizzaList({ items }: Props) {
  return (
    <ul className='mb-12 space-y-10 md:grid md:grid-cols-2 md:gap-10 md:space-y-0 xl:grid-cols-3 xl:gap-10 2xl:grid-cols-4 2xl:gap-0'>
      <AnimatePresence mode='wait'>
        {items.map((item) => (
          <PizzaCard key={item.id} {...item} />
        ))}
      </AnimatePresence>
    </ul>
  );
}
