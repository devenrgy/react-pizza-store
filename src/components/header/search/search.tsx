import { useRef } from 'react';
import { useSearchParams } from 'react-router-dom';

import styles from './search.module.scss';
import { useForm } from 'react-hook-form';

type FormValues = {
  search: string
}

export default function Search() {
  const { register, handleSubmit, resetField, setFocus } = useForm<FormValues>();
  const [searchParams, setSearchParams] = useSearchParams();
  const ref = useRef<HTMLFormElement>(null);

  const onSubmit = ({ search }: FormValues) => {
    setSearchParams(() => {
      if (search) {
        searchParams.set('q', search);
        return searchParams;
      }
      searchParams.delete('q');
      return searchParams;
    });
  };

  const handleClearSearch = () => {
    resetField('search');
    setSearchParams(() => {
      searchParams.delete('q');
      return searchParams;
    });
    setFocus('search');
  };

  return (
    <search className={styles.search}>
      <form ref={ref} onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <label>
          <input
            {...register('search')}
            autoComplete={'off'}
            className={styles.input}
            type="search"
            placeholder={'Поиск пиццы...'}/>
          <button type={'button'} onClick={handleClearSearch} className={styles.clear}></button>
        </label>

        <button className={styles.btn}></button>
      </form>
    </search>
  );
}