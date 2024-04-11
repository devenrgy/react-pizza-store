import { Link } from 'react-router-dom';
import { LuShoppingCart } from 'react-icons/lu';

import { useGetCartPizzaItemsQuery } from 'store/services/pizzaApi';

import { Search } from 'components/header/search';

import styles from './header.module.scss';

export default function Header() {
  const { data: cartItems } = useGetCartPizzaItemsQuery();

  const totalAmount = cartItems?.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const cartQuantity = cartItems?.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className={styles.header}>
      <Link className={styles.logo} to='/'>
        <img src='/icons/logo.svg' alt='Логотип Pizza Store' width={50} height={50} />

        <div>
          <p className={styles.title}>Pizza Store</p>
          <p className={styles.slogan}>ваш кусочек пиццы в раю</p>
        </div>
      </Link>

      <Search />

      <Link to='/cart' className={styles.cartBtn}>
        {cartQuantity ? (
          <>
            <span>{totalAmount} ₽</span>
            <span className={styles.cartSeparator}></span>
            <span className={styles.cartQuantity}>
              <LuShoppingCart size={18} />
              {cartQuantity}
            </span>
          </>
        ) : (
          'Корзина'
        )}
      </Link>
    </header>
  );
}
