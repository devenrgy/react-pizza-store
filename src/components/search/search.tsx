import styles from './search.module.scss';
import { useSearchParams } from 'react-router-dom';
import { FormEvent, useRef } from 'react';

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const ref = useRef<HTMLFormElement>(null);

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const { q: searchValue } = Object.fromEntries(new FormData(evt.currentTarget));

    setSearchParams(() => {
      if (searchValue) {
        searchParams.set('q', searchValue as string);
        return searchParams;
      }
      searchParams.delete('q');
      return searchParams;
    });
  };

  return (
    <search className={styles.search}>
      <form ref={ref} onSubmit={handleSubmit} className={styles.form}>
        <label>
          <input
            autoComplete={'off'}
            className={styles.input} name={'q'} type='search'
            placeholder={'Поиск пиццы...'}/>
          <button onClick={() => ref.current?.reset()} className={styles.clear}></button>
        </label>

        <button className={styles.btn}></button>
      </form>
    </search>
  );
}