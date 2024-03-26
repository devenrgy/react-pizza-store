import { useSearchParams } from 'react-router-dom';
import { TiArrowSortedUp } from 'react-icons/ti';

import styles from './sort.module.scss';
import cn from 'lib/utils';
import { useEffect, useRef } from 'react';

export default function Sort() {
  const sortList: Record<string, string> = {
    rating: 'популярности',
    price: 'по цене',
    title: 'по алфавиту',
  };

  const [searchParams, setSearchParams] = useSearchParams();
  const currentSort = searchParams.get('sort') ?? 'rating';
  const ref = useRef<HTMLDivElement>(null);

  const handleClick = (nextSort: string) => {
    if (nextSort === currentSort) return;

    setSearchParams({ ...Object.fromEntries(searchParams), sort: nextSort });
  };

  useEffect(() => {
    const handleClickOutside = ({ target }: MouseEvent) => {
      if (!ref?.current?.contains(target as Node)) {
        const sortPopup = document.querySelector<HTMLInputElement>('#sortCheckbox');

        if (sortPopup) {
          sortPopup.checked = false;
        }
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