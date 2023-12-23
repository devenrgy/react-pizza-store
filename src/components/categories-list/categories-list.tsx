import { useState } from 'react'
import styles from './categories-list.module.css'

export default function CategoriesList() {
  const categories = {
    all: 'Все',
    meat: 'Мясные',
    vegetarian: 'Вегетарианская',
    grill: 'Гриль',
    hot: 'Острые',
    closed: 'Закрытые',
  }

  const categoriesKeys = Object.keys(categories) as Array<keyof typeof categories>

  const [current, setCurrent] = useState(0)

  return (
    <ul className={styles.categoriesList} role='list'>
      {categoriesKeys.map((key, index) => (
        <li key={index}>
          <label tabIndex={0} htmlFor={key}>
            {categories[key]}
          </label>
          <input
            type='radio'
            name='currentPizzaCategories'
            onClick={() => setCurrent(index)}
            defaultChecked={index === current}
            id={key}
            value={key}
          />
        </li>
      ))}
    </ul>
  )
}
