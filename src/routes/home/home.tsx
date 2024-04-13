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
  const { data, isLoading } = useGetPizzaItemsQuery({
    category,
    sort: sort ?? 'rating',
    page: page ?? '1',
    q: q ?? '',
  });

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
          <div>
            <h1 className={styles.title}>{currentCategory} пиццы</h1>
            <PizzaList items={data.items} />
          </div>
        ) : (
          <div className={styles.notFound}>
            <h1 className={styles.title}>Не удалось найти «{q?.toLocaleLowerCase()}» пиццу...</h1>

            <p>Почему бы вам не попробовать поискать что-то другое?</p>

            <img src='/images/not-found.png' width={256} alt='Пицца не найдена' />

            <Button onClick={handleNotFoundPizza} size='large' variant='outline'>
              Назад
            </Button>
          </div>
        )}

        {data && data.meta.total_pages > 1 && (
          <Pagination currentPage={data.meta.current_page} totalPages={data.meta.total_pages} />
        )}
      </section>
    </div>
  );
}
