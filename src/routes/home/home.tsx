import styles from './home.module.scss';

import { Navbar } from 'components/navbar';
import { Sort } from 'components/sort';
import { PizzaList } from 'components/pizza-list';

import { CATEGORIES } from 'constants';

import useQueryParams from 'hooks/useQueryParams';

import { useGetPizzaItemsQuery } from 'store/services/pizzaApi';

export default function Home() {
  const [currentParams, setQueryParams] = useQueryParams();
  const { category, sort } = currentParams;
  const currentCategory = CATEGORIES.find(item => item.path === category)?.name ?? 'Все';
  const {
    data,
    isLoading,
  } = useGetPizzaItemsQuery(currentParams);

  return (
    <div className={styles.home}>
      <div className={styles.categories}>
        <Navbar currentCategory={category} setQueryParams={setQueryParams}/>
        <Sort currentSort={sort} setQueryParams={setQueryParams}/>
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

