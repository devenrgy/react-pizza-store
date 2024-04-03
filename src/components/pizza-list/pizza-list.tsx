import { PizzaCard } from 'components/pizza-card';

import { PizzaItem } from 'types';

import styles from './pizza-list.module.scss';

interface PizzaListParams {
  items: PizzaItem[],
}

export default function PizzaList({ items }: PizzaListParams) {

  return (
    <div className={styles.pizzaList}>
      <ul className={styles.list}>
        {items.map((item, i) => (
          <li key={i} className={styles.item}>
            <PizzaCard {...item}/>
          </li>
        ))}
      </ul>
    </div>
  );
}