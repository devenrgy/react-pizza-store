import {
  isRouteErrorResponse,
  useNavigate,
  useRouteError,
} from 'react-router-dom';

import { Button } from 'components/button';

import styles from './error-page.module.scss';

export default function ErrorPage() {
  const navigate = useNavigate();
  const error = useRouteError() as Error;

  if (!isRouteErrorResponse(error)) {
    return null;
  }

  console.error(error.data);

  return (
    <section className={styles.errorPage}>
      <div>
        <h1 className={styles.title}>Ууупс... Что-то пошло не так...</h1>
        <img src='/images/error-page.png' width={256} alt='Стикер с удивленной пиццей' />
        <Button variant='accent' size='large' onClick={() => navigate('/')}>
          На главную
        </Button>
      </div>
    </section>
  );
}
