import { CategoriesList } from 'components/categories-list'
import { Sort } from 'components/sort'
import styles from './pizza-menu.module.css'

export default function PizzaMenu() {
  return (
    <>
      <nav className={styles.nav}>
        <CategoriesList />
        <Sort />
      </nav>
      <div className={styles.pizzaMenu}>Pizza Menu</div>
    </>
  )
}
