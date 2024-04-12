import { Link } from 'react-router-dom';

import { Button } from 'components/button';

import styles from './cart.module.scss';

export default function Cart() {
  return (
    <section className={styles.cart}>
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
    </section>
  );
}
