import { PizzaCard } from 'components/pizza-list/pizza-card';

import { PizzaItem } from 'types';

import styles from './pizza-list.module.scss';

interface Props {
  items: PizzaItem[],
}

export default function PizzaList({ items }: Props) {
  return (
    <ul className={styles.list}>
      {items.map((item, i) => (
        <li key={i} className={styles.item}>
          <PizzaCard {...item}/>
        </li>
      ))}
    </ul>
  );
}