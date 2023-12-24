import { useEffect, useRef, useState } from 'react'
import styles from './sort.module.css'

export default function Sort() {
  const sortingList = {
    popular: 'популярности',
    price: 'цене',
    alphabet: 'алфавиту',
  }

  const sortingKeys = Object.keys(sortingList) as Array<keyof typeof sortingList>

  const [currentSort, setCurrentSort] = useState(0)
  const [isOpenModal, setIsOpenModal] = useState(false)
  const modalRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const handleClickOutside = (evt: MouseEvent) => {
      const currentElement = modalRef.current?.contains(evt.target as HTMLElement)

      if (!modalRef.current) {
        return
      }

      if (!currentElement) {
        setIsOpenModal(false)
      }
    }

    document.addEventListener('click', handleClickOutside, true)

    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  return (
    <div className={styles.sort}>
      Сортировка по: <label htmlFor='sort'>{sortingList[sortingKeys[currentSort]]}</label>
      <input id='sort' onChange={() => setIsOpenModal(!isOpenModal)} checked={isOpenModal} type='checkbox' />
      <ul ref={modalRef} className={styles.sortList}>
        {sortingKeys.map((key, index) => (
          <li key={index}>
            <label htmlFor={key}>{sortingList[key]}</label>
            <input
              type='radio'
              defaultChecked={index === currentSort}
              onClick={() => setCurrentSort(index)}
              name='typeSort'
              id={key}
              value={key}
            />
          </li>
        ))}
      </ul>
    </div>
  )
}
