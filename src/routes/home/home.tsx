import styles from './home.module.scss';

import { Navbar } from 'components/navbar';
import { Sort } from 'components/sort';

export default function Home() {

  return (
    <div className={styles.home}>
      <div className={styles.categories}>
        <Navbar/>
        <Sort/>
      </div>

      <section>

      </section>
    </div>
  );
}

