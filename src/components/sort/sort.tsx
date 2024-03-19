import { useSearchParams } from 'react-router-dom';
import styles from './sort.module.scss';
import cn from 'lib/utils';

export default function Sort() {
  const sortList: Record<string, string> = {
    rating: 'популярности',
    price: 'по цене',
    title: 'по алфавиту',
  };

  const [searchParams, setSearchParams] = useSearchParams();
  const currentSort = searchParams.get('sortBy') ?? 'rating';

  const handleClick = (activeSort: string) => {
    setSearchParams({ ...Object.fromEntries(searchParams), sortBy: activeSort });
  };

  return (
    <div className={styles.sort}>
      <label htmlFor='sortCheckbox'>Сортировка по: <button>{sortList[currentSort]}</button></label>
      <input id='sortCheckbox' className={styles.checkbox} type='checkbox'/>

      <ul className={styles.menu}>
        {Object.entries(sortList).map(([value, name], i) => (
          <li key={i} className={styles.item}>
            <button onClick={() => handleClick(value)}
                    title={name}
                    className={cn(styles.button, currentSort === value && styles.active)}>{name}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}