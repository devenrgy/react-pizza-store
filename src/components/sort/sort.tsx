import { useRef, useState } from 'react';
import { TiArrowSortedUp } from 'react-icons/ti';

import cn from 'lib/utils';

import useClickOutside from 'hooks/useClickOutside.ts';

import { SORT_LIST } from 'constants';

import styles from './sort.module.scss';

interface Props {
  currentSort: string,
  setQueryParams: (key: string, param: string) => void
}

export default function Sort({ currentSort = 'rating', setQueryParams }: Props) {
  const [menuVisibility, setMenuVisibility] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleSelectSort = (nextSort: string) => {
    setQueryParams('sort', nextSort);

    setMenuVisibility(false);
  };

  useClickOutside(ref, () => setMenuVisibility(false));

  return (
    <div ref={ref} className={styles.sort}>
      <TiArrowSortedUp className={styles.arrow}/>
      <label htmlFor="sort">Сортировка
        по: <span>{SORT_LIST[currentSort]}</span></label>

      <input onChange={() => setMenuVisibility(!menuVisibility)} checked={menuVisibility} id="sort"
             className={styles.checkbox}
             type="checkbox"/>

      <div className={styles.wrapper}>
        <ul className={styles.menu}>
          {Object.entries(SORT_LIST).map(([value, name], i) => (
            <li key={i} className={styles.item}>
              <button onClick={() => handleSelectSort(value)}
                      title={name}
                      className={cn(styles.button, currentSort === value && styles.active)}>{name}</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}