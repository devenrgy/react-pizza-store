import styles from './home.module.scss';

import { Navbar } from 'components/navbar';
import { Sort } from 'components/sort';
import { PizzaList } from 'components/pizza-list';

export default function Home() {
  return (
    <div className={styles.home}>
      <div className={styles.categories}>
        <Navbar/>
        <Sort/>
      </div>

      <section>
        <h1 className={styles.title}>
          Все пиццы
        </h1>

        <PizzaList/>
      </section>
    </div>
  );
}

