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
    <section className='mt-24 text-lg'>
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
        <div className='mx-auto mt-24 max-w-[830px]'>
          <div className='flex items-center justify-between border-b border-neutral-800 pb-8'>
            <div className='flex items-center gap-5'>
              <RiShoppingCartLine size={30} />
              <h1 className='m-0 text-3xl font-bold'>Корзина</h1>
            </div>
            <button
              className='flex gap-3 text-base text-neutral-400 duration-300 hover:text-neutral-300'
              onClick={handleRemoveAllPizzaItems}
            >
              <FaTrashCan size={20} />
              Очистить корзину
            </button>
          </div>

          <ul className='scrollbar-thumb-red-900 scrollbar-track-transparent scrollbar-thin scrollbar- mb-10 grid max-h-[600px] min-h-[300px] content-start gap-7 overflow-y-scroll'>
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

          <div className='mb-10 flex justify-between text-2xl'>
            <p>
              Всего пицц: <span className='font-bold'>{totalPizzas} шт.</span>
            </p>
            <p>
              Сумма заказа:{' '}
              <span className='font-bold text-red-900'>{totalPrice} ₽</span>
            </p>
          </div>

          <div className='flex justify-between'>
            <Link to={'/'}>
              <Button size={'large'} variant={'outline'}>
                <LuArrowLeft size={20} />
                Вернуться назад
              </Button>
            </Link>
            <Button size={'large'} variant={'primary'}>
              Оплатить сейчас
            </Button>
          </div>
        </div>
      ) : (
        <div className='text-center'>
          <h1 className='mb-5 text-3xl font-bold'>Корзина пустая</h1>
          <p className='mb-12 leading-normal'>
            Подумайте, какое волшебство вы можете сюда положить...
          </p>
          <img
            className='absolute bottom-20 right-20'
            src='/images/empty-cart.avif'
            width={256}
            alt='Корзина пустая'
          />
          <Link to={'/'}>
            <Button className='mx-auto' size='large' variant='outline'>
              Назад
            </Button>
          </Link>
        </div>
      )}
    </section>
  );
}
