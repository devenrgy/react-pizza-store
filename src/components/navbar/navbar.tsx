import cn from 'lib/utils.ts';

import { CATEGORIES } from 'constants';

import styles from './navbar.module.scss';

interface Props {
  currentCategory: string,
  setQueryParams: (key: string, param: string) => void
}

export default function Navbar({ currentCategory = '', setQueryParams }: Props) {
  return (
    <nav>
      <ul className={styles.list}>
        {CATEGORIES.map(({ name, path }, i) => (
          <li key={i}>
            <button
              onClick={() => setQueryParams('category', path)}
              className={cn(styles.button, currentCategory === path && styles.active)}>
              {name}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}