import { FaTrashCan } from 'react-icons/fa6';
import { LuArrowLeft } from 'react-icons/lu';
import { RiShoppingCartLine } from 'react-icons/ri';
import { ThreeDots } from 'react-loader-spinner';
import { Link } from 'react-router-dom';

import { AnimatePresence } from 'framer-motion';

import {
  useDeleteAllPizzaItemsMutation,
  useDeletePizzaItemMutation,
  useGetCartPizzaItemsQuery,
  useUpdatePizzaItemMutation,
} from 'store/services/pizzaApi';

import Button from 'components/button';
import CartItem from 'components/cart-item';

export default function Cart() {
  const { data, isLoading } = useGetCartPizzaItemsQuery();
  const [updateCartPizzaItem] = useUpdatePizzaItemMutation();
  const [deletePizzaItem] = useDeletePizzaItemMutation();
  const [deleteAllPizzaItems] = useDeleteAllPizzaItemsMutation();
  const totalPrice = data?.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const totalPizzas = data?.reduce((acc, item) => acc + item.quantity, 0);

  const handleIncrementPizzaItem = (id: number, quantity: number) => {
    updateCartPizzaItem({ id, quantity: quantity + 1 });
  };

  const handleDecrementPizzaItem = (id: number, quantity: number) => {
    updateCartPizzaItem({ id, quantity: quantity - 1 });
  };

  const handleRemovePizzaItem = (id: number) => {
    deletePizzaItem(id);
  };

  const handleRemoveAllPizzaItems = () => {
    deleteAllPizzaItems();
  };

  return (
    <section className='text-lg sm:mt-24'>
      {isLoading ? (
        <div className='mt-24 flex justify-center'>
          <ThreeDots
            visible={true}
            height='80'
            width='80'
            color='#7f1d1d'
            radius='9'
            ariaLabel='three-dots-loading'
          />
        </div>
      ) : data?.length ? (
        <div className='mx-auto max-w-[830px]'>
          <div className=' flex items-center justify-between border-b border-neutral-800 pb-8'>
            <div className='flex items-center gap-5'>
              <RiShoppingCartLine size={30} />
              <h1 className='m-0 text-3xl font-bold'>Корзина</h1>
            </div>
            <button
              className='flex gap-3 p-3 text-base text-neutral-400 duration-300 active:text-neutral-300 lg:hover:text-neutral-300'
              onClick={handleRemoveAllPizzaItems}
            >
              <FaTrashCan size={20} />
              <span className='hidden'>Очистить корзину</span>
            </button>
          </div>

          <ul className='space-y-10 overflow-y-scroll pb-[240px] scrollbar-thin scrollbar-track-transparent scrollbar-thumb-red-900 sm:grid sm:max-h-[600px] sm:min-h-[300px] sm:content-start sm:gap-7'>
            <AnimatePresence mode='popLayout'>
              {data.map((item) => (
                <CartItem
                  key={item.id}
                  {...item}
                  incrementPizzaItem={handleIncrementPizzaItem}
                  decrementPizzaItem={handleDecrementPizzaItem}
                  removePizzaItem={handleRemovePizzaItem}
                />
              ))}
            </AnimatePresence>
          </ul>

          <div className='fixed bottom-0 left-0 right-0 bg-neutral-900 px-3 py-8'>
            <div className='mb-10 space-y-4 text-center sm:mb-10 sm:flex sm:justify-between sm:text-2xl'>
              <p>
                Всего пицц: <span className='font-bold'>{totalPizzas} шт.</span>
              </p>
              <p>
                Сумма заказа:{' '}
                <span className='font-bold text-red-900'>{totalPrice} ₽</span>
              </p>
            </div>
            <div className='flex justify-between gap-3'>
              <Link to={'/'}>
                <Button size={'large'} variant={'outline'}>
                  <LuArrowLeft size={20} />
                  Назад
                </Button>
              </Link>
              <Button size={'large'} variant={'primary'}>
                Оплатить
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className='text-center'>
          <h1 className='mb-5 text-3xl font-bold'>Корзина пустая</h1>
          <p className='mb-12 leading-normal'>
            Подумайте, какое волшебство вы можете сюда положить...
          </p>
          <Link to={'/'}>
            <Button className='mx-auto mb-10' size='large' variant='outline'>
              Назад
            </Button>
          </Link>
          <img
            className='mx-auto'
            src='/images/empty-cart.avif'
            width={256}
            alt='Корзина пустая'
          />
        </div>
      )}
    </section>
  );
}
