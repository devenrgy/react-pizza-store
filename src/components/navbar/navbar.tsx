import styles from './navbar.module.scss';
import { CATEGORIES } from 'constants';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <ul className={styles.list}>
        {CATEGORIES.map(({ name, path }, i) => (
          <li key={i}>
            <Link to={{ search: path && `category=${path}` }}>
              {name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}