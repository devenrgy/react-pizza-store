import { useSearchParams } from 'react-router-dom';

import styles from './home.module.scss';

import { Navbar } from 'components/navbar';
import { Sort } from 'components/sort';
import { PizzaList } from 'components/pizza-list';

import { PizzaParams } from 'types';

import { CATEGORIES } from 'constants';

import { useGetPizzaItemsQuery } from 'store/services/pizzaApi';

export default function Home() {
  const [searchParams] = useSearchParams();
  const currentParams = Object.fromEntries(searchParams.entries()) as PizzaParams;
  const { category } = currentParams;
  const currentCategory = CATEGORIES.find(item => item.path === category)?.name ?? 'Все';
  const {
    data,
    isLoading,
  } = useGetPizzaItemsQuery(currentParams);

  return (
    <div className={styles.home}>
      <div className={styles.categories}>
        <Navbar/>
        <Sort/>
      </div>

      <section>
        <h1 className={styles.title}>
          {currentCategory} пиццы
        </h1>

        {isLoading && <p>Loading...</p>}

        {data && <PizzaList items={data.items}/>}
      </section>
    </div>
  );
}

