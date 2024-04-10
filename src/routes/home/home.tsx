import { useEffect, useRef, useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';

import useQueryParams from 'hooks/useQueryParams';

import { useGetPizzaItemsQuery } from 'store/services/pizzaApi';

import { Button } from 'components/button';
import { Navbar } from 'components/navbar';
import { Pagination } from 'components/pagination';
import { PizzaList } from 'components/pizza-list';
import { Sort } from 'components/sort';

import { CATEGORIES } from 'consts';

import styles from './home.module.scss';

export default function Home() {
  const [currentParams, setQueryParams] = useQueryParams();
  const { category, sort, page, q } = currentParams;
  const currentCategory = CATEGORIES.find((item) => item.path === category)?.name ?? 'Все';
  const { data, isFetching } = useGetPizzaItemsQuery({
    category,
    sort: sort ?? 'rating',
    page: page ?? '1',
    q: q ?? '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const isFirstLoading = useRef(true);

  useEffect(() => {
    if (!isFetching) {
      setTimeout(() => {
        setIsLoading(false);
        isFirstLoading.current = false;
      }, 500);
    } else {
      setIsLoading(true);
    }
  }, [isFetching]);

  const handleNotFoundPizza = () => {
    setQueryParams('q', '');
  };

  return (
    <div className={styles.home}>
      <div className={styles.categories}>
        <Navbar currentCategory={category} setQueryParams={setQueryParams} />
        <Sort currentSort={sort} setQueryParams={setQueryParams} />
      </div>

      <section className={styles.section}>
        <h1 className={styles.title}>{currentCategory} пиццы</h1>

        {isLoading ? (
          <ThreeDots
            visible={true}
            height='80'
            width='80'
            color='#dc2f02'
            radius='9'
            ariaLabel='three-dots-loading'
            wrapperStyle={{}}
            wrapperClass={styles.loader}
          />
        ) : data?.items.length ? (
          <>
            <PizzaList items={data.items} />
          </>
        ) : (
          <div className={styles.notFound}>
            <h3>
              Извините, но этот вариант пиццы временно отсутствует. <br /> Почему бы не попробовать что-то другое из
              нашего разнообразного меню?
            </h3>
            <Button onClick={handleNotFoundPizza} size='large' variant='outline'>
              Назад
            </Button>
          </div>
        )}

        {!isFirstLoading.current && !!data?.meta.total_pages && (
          <Pagination currentPage={data.meta.current_page} totalPages={data.meta.total_pages} />
        )}
      </section>
    </div>
  );
}
