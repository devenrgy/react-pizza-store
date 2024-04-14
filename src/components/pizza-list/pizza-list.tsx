import { AnimatePresence } from 'framer-motion';

import { PizzaCard } from 'components/pizza-list/pizza-card';

import { PizzaItem } from 'types';

interface Props {
  items: PizzaItem[];
}

export default function PizzaList({ items }: Props) {
  return (
    <ul className='mb-12 place-items-center space-y-10 xl:grid-cols-4'>
      <AnimatePresence mode={'wait'}>
        {items.map((item) => (
          <PizzaCard key={item.id} {...item} />
        ))}
      </AnimatePresence>
    </ul>
  );
}
