import { CATEGORIES } from 'consts';

import cn from 'lib/utils.ts';

import styles from './navbar.module.scss';

interface Props {
  currentCategory: string;
  setQueryParams: (key: string, param: string) => void;
}

export default function Navbar({ currentCategory = '', setQueryParams }: Props) {
  const handleCurrentCategory = (path: string) => {
    setQueryParams('page', '1');
    setQueryParams('category', path);
    setQueryParams('q', '');
  };

  return (
    <nav>
      <ul className={styles.list}>
        {CATEGORIES.map(({ name, path }, i) => (
          <li key={i}>
            <button
              onClick={() => handleCurrentCategory(path)}
              className={cn(styles.button, currentCategory === path && styles.active)}
            >
              {name}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
