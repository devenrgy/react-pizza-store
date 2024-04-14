import { AnimatePresence, motion } from 'framer-motion';

import { PizzaCard } from 'components/pizza-list/pizza-card';

import { PizzaItem } from 'types';

interface Props {
  items: PizzaItem[];
}

export default function PizzaList({ items }: Props) {
  return (
    <motion.ul className='grid place-items-center grid-cols-4 mb-12' layout layoutRoot>
      <AnimatePresence mode={'wait'}>
        {items.map((item) => (
          <PizzaCard key={item.id} {...item} />
        ))}
      </AnimatePresence>
    </motion.ul>
  );
}
