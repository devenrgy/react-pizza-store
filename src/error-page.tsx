import {
  isRouteErrorResponse,
  useNavigate,
  useRouteError,
} from 'react-router-dom';

import Button from 'components/button';

export default function ErrorPage() {
  const navigate = useNavigate();
  const error = useRouteError() as Error;

  if (!isRouteErrorResponse(error)) {
    return null;
  }

  console.error(error.data);

  return (
    <section className='flex h-screen items-center justify-center text-white'>
      <div>
        <h1 className='mb-8 text-3xl font-bold'>Ой! Что-то пошло не так!</h1>
        <img
          className='mx-auto mb-12 block'
          src='/images/error-page.avif'
          width={256}
          alt='Стикер с удивленной пиццей'
        />
        <Button
          className='mx-auto'
          variant='accent'
          size='large'
          onClick={() => navigate('/')}
        >
          На главную
        </Button>
      </div>
    </section>
  );
}
