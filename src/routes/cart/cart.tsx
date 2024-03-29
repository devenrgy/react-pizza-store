import styles from './cart.module.scss';

export default function Cart() {
  return (
    <div className={styles.cart}>
      <section>
        <div>
          <h1 className={styles.title}>
            Корзина
          </h1>

          <button>Очистить корзину</button>
        </div>


      </section>
    </div>
  );
}

