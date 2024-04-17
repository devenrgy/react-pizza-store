import { LuShoppingCart } from 'react-icons/lu';
import { Link, useLocation } from 'react-router-dom';

import { useGetCartPizzaItemsQuery } from 'store/services/pizzaApi';

import { Search } from 'components/header/search';

import cn from 'lib/utils';

export default function Header() {
  const { data: cartItems } = useGetCartPizzaItemsQuery();
  const { pathname } = useLocation();
  const isCartPage = pathname == '/cart';

  const totalAmount = cartItems?.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const cartQuantity = cartItems?.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header
      className={cn(
        'mb-10 flex flex-col flex-wrap items-center gap-10 border-b border-neutral-800 pb-10 lg:flex-row lg:flex-nowrap xl:gap-20',
        { 'hidden md:flex md:items-start': isCartPage }
      )}
    >
      <Link
        className={cn(
          'flex flex-col items-center gap-5 text-center lg:flex-row lg:text-left',
          { 'md:flex-row md:text-left': isCartPage }
        )}
        to='/'
      >
        <img
          src='/icons/logo.svg'
          alt='Логотип Pizza Store'
          width={50}
          height={50}
        />

        <div>
          <p className='text-2xl font-extrabold uppercase'>Pizza Store</p>
          <p className='text-neutral-400'>ваш кусочек пиццы в&nbsp;раю</p>
        </div>
      </Link>

      {!isCartPage && (
        <>
          <Search className='w-full flex-grow lg:w-auto' />
          <Link
            to='/cart'
            className='flex min-w-[150px] items-center justify-center gap-4 rounded-full bg-red-900 px-6 py-4 font-bold duration-300 hover:bg-red-800 xl:ml-auto '
          >
            {cartQuantity ? (
              <>
                <span>{totalAmount} ₽</span>
                <span className='h-6 w-[1px] bg-white opacity-30'></span>
                <span className='flex items-center gap-2'>
                  <LuShoppingCart size={18} />
                  {cartQuantity}
                </span>
              </>
            ) : (
              'Корзина'
            )}
          </Link>
        </>
      )}
    </header>
  );
}
