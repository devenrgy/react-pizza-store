import styles from './search.module.scss';
import { useSearchParams } from 'react-router-dom';

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const { q: searchValue } = Object.fromEntries(new FormData(evt.currentTarget));

    setSearchParams({ ...Object.fromEntries(searchParams), q: searchValue as string });
  };

  return (
    <search className={styles.search}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>
          <input autoComplete={'off'} className={styles.input} name={'q'} type='search'
                 placeholder={'Поиск пиццы...'}/>
        </label>

        <button className={styles.btn}></button>
      </form>
    </search>
  );
}