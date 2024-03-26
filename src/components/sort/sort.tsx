import { useSearchParams } from 'react-router-dom';
import { TiArrowSortedUp } from 'react-icons/ti';

import styles from './sort.module.scss';
import cn from 'lib/utils';
import { useEffect, useRef } from 'react';

export default function Sort() {
  const sortList: Record<string, string> = {
    rating: 'рейтингу',
    price: 'возрастанию цены',
    '-price': 'убыванию цены',
    title: 'алфавиту',
  };

  const [searchParams, setSearchParams] = useSearchParams();
  const currentSort = searchParams.get('sort') ?? 'rating';
  const ref = useRef<HTMLDivElement>(null);

  const handleCloseSort = () => {
    const sortPopup = document.querySelector<HTMLInputElement>('#sortCheckbox');

    if (sortPopup) {
      sortPopup.checked = false;
    }
  };

  const handleClick = (nextSort: string) => {
    if (nextSort === currentSort) return;

    setSearchParams({ ...Object.fromEntries(searchParams), sort: nextSort });

    handleCloseSort();
  };

  useEffect(() => {
    const handleClickOutside = ({ target }: MouseEvent) => {
      if (!ref?.current?.contains(target as Node)) {
        handleCloseSort();
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div ref={ref} className={styles.sort}>
      <TiArrowSortedUp className={styles.arrow}/>
      <label htmlFor='sortCheckbox'>Сортировка по: <button>{sortList[currentSort]}</button></label>
      <input id='sortCheckbox' className={styles.checkbox} type='checkbox'/>

      <div className={styles.wrapper}>
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

    </div>
  );
}