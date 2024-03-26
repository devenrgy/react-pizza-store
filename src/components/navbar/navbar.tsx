import styles from './navbar.module.scss';
import { CATEGORIES } from 'constants';
import cn from 'lib/utils.ts';
import { useSearchParams } from 'react-router-dom';

export default function Navbar() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentCategory = searchParams.get('category') ?? '';

  const handleClick = (nextCategory: string) => {
    if (nextCategory === currentCategory) return;

    setSearchParams(() => {
      if (nextCategory) {
        searchParams.set('category', nextCategory);
        searchParams.sort();
        return searchParams;
      }
      searchParams.delete('category');
      return searchParams;
    });
  };

  return (
    <nav className={styles.navbar}>
      <ul className={styles.list}>
        {CATEGORIES.map(({ name, path }, i) => (
          <li key={i}>
            <button
              onClick={() => handleClick(path)}
              className={cn(styles.button, currentCategory === path && styles.active)}>
              {name}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}