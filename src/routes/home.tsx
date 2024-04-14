import { ThreeDots } from 'react-loader-spinner';

import useQueryParams from 'hooks/useQueryParams';

import { useGetPizzaItemsQuery } from 'store/services/pizzaApi';

import Button from 'components/button';
import Navbar from 'components/navbar';
import Pagination from 'components/pagination';
import { PizzaList } from 'components/pizza-list';
import Sort from 'components/sort';

import { CATEGORIES } from 'consts';

export default function Home() {
  const [currentParams, setQueryParams] = useQueryParams();
  const { category, sort, page, q } = currentParams;
  const currentCategory =
    CATEGORIES.find((item) => item.path === category)?.name ?? 'Все';
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
    <div>
      <div className='mb-7 flex items-center justify-between'>
        <Navbar currentCategory={category} setQueryParams={setQueryParams} />
        <Sort currentSort={sort} setQueryParams={setQueryParams} />
      </div>

      <section className='grid min-h-[650px] grid-rows-[1fr_min-content] has-[.notFound]:min-h-[auto] has-[.notFound]:grid-rows-[1fr]'>
        {isLoading ? (
          <div className='mt-32 flex justify-center'>
            <ThreeDots
              visible={true}
              height='80'
              width='80'
              color='#7f1d1d'
              radius='9'
              ariaLabel='three-dots-loading'
            />
          </div>
        ) : data?.items.length ? (
          <div>
            <h1 className='text-3xl font-bold mb-8'>{currentCategory} пиццы</h1>
            <PizzaList items={data.items} />
          </div>
        ) : (
          <div className='notFound mt-24 max-w-[800px] justify-self-center text-center'>
            <h1 className='mb-5 text-3xl font-bold'>
              {q
                ? `Не удалось найти «${q?.toLocaleLowerCase()}» пиццу...`
                : 'Не удалось загрузить данные...'}
            </h1>

            {q && (
              <p className='mb-12 text-lg'>
                Почему бы вам не попробовать поискать что-то другое?
              </p>
            )}

            <img
              className='absolute bottom-20 right-20'
              src='/images/not-found.avif'
              width={256}
              alt='Пицца не найдена'
            />

            <Button
              className='mx-auto'
              onClick={handleNotFoundPizza}
              size='large'
              variant='outline'
            >
              Назад
            </Button>
          </div>
        )}

        {data && data.meta.total_pages > 1 && (
          <Pagination
            currentPage={data.meta.current_page}
            totalPages={data.meta.total_pages}
          />
        )}
      </section>
    </div>
  );
}
