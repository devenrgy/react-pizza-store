import { Link } from 'react-router-dom';
import styles from './header.module.scss';

import { LuShoppingCart } from 'react-icons/lu';

import { RootState } from 'store';
import { useSelector } from 'react-redux';
import { Search } from 'components/search';

export default function Header() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const totalAmount = cartItems.reduce((acc, item) => acc + item.price, 0);
  const cartQuantity = 0;

  return (
    <header className={styles.header}>
      <Link className={styles.logo} to='/'>
        <img src='/icons/logo.svg' alt='Логотип Pizza Store' width={50} height={50}/>

        <div>
          <p className={styles.title}>Pizza Store</p>
          <p className={styles.slogan}>ваш кусочек пиццы в раю</p>
        </div>
      </Link>

      <Search/>

      <Link to='/cart' className={styles.cartBtn}>
        {cartQuantity ? <>
          <span>{totalAmount} ₽</span>
          <span className={styles.cartSeparator}></span>
          <span className={styles.cartQuantity}>
          <LuShoppingCart size={18}/>
            {cartQuantity}
        </span></> : 'Корзина'}
      </Link>
    </header>
  );
}