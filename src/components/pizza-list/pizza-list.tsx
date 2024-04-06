import { AnimatePresence, motion } from 'framer-motion';

import { PizzaCard } from 'components/pizza-list/pizza-card';

import { PizzaItem } from 'types';

import styles from './pizza-list.module.scss';

interface Props {
  items: PizzaItem[],
}

export default function PizzaList({ items }: Props) {
  return (
    <motion.ul className={styles.list} layout layoutRoot>
      <AnimatePresence mode={'wait'} initial={false}>
        {items.map((item) => (
          <PizzaCard key={item.id} {...item}/>
        ))}
      </AnimatePresence>
    </motion.ul>
  );
}