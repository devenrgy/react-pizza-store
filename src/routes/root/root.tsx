import { Outlet } from 'react-router-dom';

import { Header } from 'components/header';

import styles from './root.module.scss';

export default function Root() {
  return (
    <div className={styles.root}>
      <video preload='none' className={styles.video} autoPlay muted loop>
        <source src='/video/bg.mp4' type='video/mp4' />
      </video>

      <div className={styles.wrapper}>
        <Header />

        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
