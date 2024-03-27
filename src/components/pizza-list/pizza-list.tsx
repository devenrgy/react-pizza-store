import styles from './pizza-list.module.scss';
import { useEffect, useState } from 'react';
import { PizzaData, PizzaParams } from 'types';
import { useSearchParams } from 'react-router-dom';
import { PizzaCard } from 'components/pizza-card';

async function getData<T>({
                            category,
                            sort = 'rating',
                            q = '',
                          }: PizzaParams): Promise<T> {
  try {
    const currentCategory = !category ? '' : `&category=${category}`;

    // res = await fetch(
    //   `https://4275eac693d4b299.mokky.dev/items/?page=${1}&sortBy=${sort}${currentCategory}&title=*${title}&limit=4`,
    // );

    const res = await fetch(
      `https://4275eac693d4b299.mokky.dev/items/?page=${1}&sortBy=${sort}${currentCategory}&title=*${q}&limit=4`,
    );

    return res.json();
  } catch (error) {
    throw new Error('Failed to fetch data');
  }
}

export default function PizzaList() {
  const [pizzaData, setPizzaData] = useState<PizzaData | null>(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const currentParams = Object.fromEntries(searchParams.entries()) as PizzaParams;

    (async () => {
      const data = await getData<PizzaData>(currentParams);
      setPizzaData(data);
    })();

  }, [searchParams]);

  return (
    <div className={styles.pizzaList}>
      <ul className={styles.list}>
        {pizzaData?.items.map((pizzaItem, i) => (
          <li key={i} className={styles.item}>
            <PizzaCard {...pizzaItem}/>
          </li>
        ))}
      </ul>
    </div>
  );
}