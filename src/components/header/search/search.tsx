import { useForm } from 'react-hook-form';

import useQueryParams from 'hooks/useQueryParams.ts';

import styles from './search.module.scss';

type SearchForm = {
  search: string;
};

export default function Search() {
  const [currentParams, setQueryParams] = useQueryParams();
  const { q } = currentParams;
  const { register, handleSubmit, resetField, setFocus } = useForm<SearchForm>();

  const handleSubmitForm = ({ search }: SearchForm) => {
    setQueryParams('q', search);
    setQueryParams('page', '1');
  };

  const handleResetSearch = () => {
    resetField('search');
    setQueryParams('q', '');
    setFocus('search');
  };

  return (
    <search className={styles.search}>
      <form onSubmit={handleSubmit(handleSubmitForm)} className={styles.form}>
        <label>
          <input
            {...register('search')}
            autoComplete={'off'}
            className={styles.input}
            value={q}
            type='search'
            placeholder={'Поиск пиццы...'}
          />
          <button type={'button'} onClick={handleResetSearch} className={styles.clear}></button>
        </label>

        <button className={styles.btn}></button>
      </form>
    </search>
  );
}
