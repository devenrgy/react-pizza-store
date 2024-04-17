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
    CATEGORIES.find((item) => item.path == category)?.name ?? 'Все';
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
      {!q && (
        <div className='mb-7 flex flex-col gap-5 xl:flex-row'>
          <Navbar currentCategory={category} setQueryParams={setQueryParams} />
          <Sort
            className='md:ml-auto'
            currentSort={sort}
            setQueryParams={setQueryParams}
          />
        </div>
      )}
      <section className='has-[.notFound]:min-h-[auto] has-[.notFound]:grid-rows-[1fr]'>
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
            {!q && (
              <h1 id='top' className='mb-8 text-3xl font-bold'>
                {currentCategory}
              </h1>
            )}
            <PizzaList items={data.items} />
          </div>
        ) : (
          <div className='notFound mt-12 flex w-full flex-col items-center justify-self-center text-center sm:mt-24'>
            <h1 className='mb-5 text-balance text-3xl font-bold'>
              {q
                ? `Не удалось найти «${q?.toLocaleLowerCase()}»`
                : 'Не удалось загрузить данные...'}
            </h1>

            {q && (
              <p className='mb-12 text-balance text-lg'>
                Почему&nbsp;бы вам не&nbsp;попробовать поискать что-то другое?
              </p>
            )}

            <img
              className='bottom-20 right-20 order-1 lg:absolute'
              src='/images/not-found.avif'
              width={256}
              alt='Пицца не найдена'
            />

            <Button
              className='mx-auto mb-10'
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
