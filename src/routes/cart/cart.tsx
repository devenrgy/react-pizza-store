import { FaTrashCan } from 'react-icons/fa6';
import { LuArrowLeft } from 'react-icons/lu';
import { RiShoppingCartLine } from 'react-icons/ri';
import { Link } from 'react-router-dom';

import {
  useDeleteAllPizzaItemsMutation,
  useDeletePizzaItemMutation,
  useGetCartPizzaItemsQuery,
  useUpdatePizzaItemMutation,
} from 'store/services/pizzaApi';

import { Button } from 'components/button';
import { CartItem } from 'components/cart-item';

import styles from './cart.module.scss';

export default function Cart() {
  const { data, isLoading } = useGetCartPizzaItemsQuery();
  const [updateCartPizzaItem] = useUpdatePizzaItemMutation();
  const [deletePizzaItem] = useDeletePizzaItemMutation();
  const [deleteAllPizzaItems] = useDeleteAllPizzaItemsMutation();
  const totalPrice = data?.reduce((acc, item) => acc + item.price * item.quantity, 0);
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
    <section className={styles.cart}>
      {isLoading ? (
        <p>Загрузка</p>
      ) : data?.length ? (
        <div className={styles.content}>
          <div className={styles.header}>
            <div>
              <RiShoppingCartLine size={30} />
              <h1 className={styles.title}>Корзина</h1>
            </div>
            <button onClick={handleRemoveAllPizzaItems}>
              <FaTrashCan size={20} />
              Очистить корзину
            </button>
          </div>

          <ul className={styles.list}>
            {data.map((item) => (
              <CartItem
                key={item.id}
                {...item}
                incrementPizzaItem={handleIncrementPizzaItem}
                decrementPizzaItem={handleDecrementPizzaItem}
                removePizzaItem={handleRemovePizzaItem}
              />
            ))}
          </ul>

          <div className={styles.info}>
            <p>
              Всего пицц: <span>{totalPizzas} шт.</span>
            </p>
            <p>
              Сумма заказа: <span>{totalPrice} ₽</span>
            </p>
          </div>

          <div className={styles.controls}>
            <Link to={'/'}>
              <Button size={'large'} variant={'primary'}>
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
        <div className={styles.emptyCart}>
          <h1 className={styles.title}>Корзина пустая</h1>
          <p>Подумайте, какое волшебство вы можете сюда положить...</p>
          <img src='/images/empty-cart.png' width={256} alt='Корзина пустая' />
          <Link to={'/'}>
            <Button size='large' variant='outline'>
              Назад
            </Button>
          </Link>
        </div>
      )}
    </section>
  );
}
