import { Link } from 'react-router-dom'
import LogoIcon from 'assets/logo.svg?react'
import CartIcon from 'assets/cart.svg?react'
import styles from './header.module.css'

export default function Header() {
  return (
    <header className={styles.header}>
      <Link className={styles.logo} to={'/'}>
        <LogoIcon width={50} height={50} />

        <p>
          <span>Pizza Store</span> <br />
          самая вкусная пицца во&nbsp;вселенной
        </p>
      </Link>

      <Link className={styles.cartBtn} to={'/cart'}>
        <span>520&nbsp;&#8381;</span>
        <hr />
        <div>
          <CartIcon width={20} height={20} />
          <span>3</span>
        </div>
      </Link>
    </header>
  )
}
