import { CategoriesList } from 'components/categories-list'
import styles from './pizza-menu.module.css'

export default function PizzaMenu() {
  return (
    <>
      <nav className={styles.nav}>
        <CategoriesList />
      </nav>
      <div className={styles.pizzaMenu}>Pizza Menu</div>
    </>
  )
}
