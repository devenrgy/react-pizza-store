import styles from './search.module.scss';

export default function Search() {
  return (
    <search className={styles.search}>
      <form className={styles.form}>
        <label>
          <input autoComplete={'off'} className={styles.input} name={'q'} type='search'
                 placeholder={'Найти любимую пиццу...'}/>
        </label>

        <button className={styles.btn}>
        </button>
      </form>
    </search>
  );
}