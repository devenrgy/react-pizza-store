import styles from './pizza-list.module.scss';
import { Button } from 'components/button';
import { Counter } from 'components/counter';
import { FaPlus } from 'react-icons/fa6';
import { useEffect, useState } from 'react';
import { PizzaData, PizzaParams } from 'types';
import { useSearchParams } from 'react-router-dom';

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
        {pizzaData?.items.map(({ title, imageUrl, price }, i) => (
          <li key={i} className={styles.item}>
            <img src={imageUrl} alt='title' width={260} height={260}/>
            <h2>{title}</h2>

            <ul className={styles.controls}>
              <li>
                <button className={styles.active}>тонкое</button>
                <button>традиционное</button>
              </li>

              <li>
                <button className={styles.active}>26 см.</button>
                <button>30 см.</button>
                <button>40 см.</button>
              </li>
            </ul>

            <div className={styles.addTo}>
              <p className={styles.price}>от {price} ₽</p>

              <Button type={'outline'}>
                <FaPlus/>
                Добавить
                <Counter value={2}/>
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}