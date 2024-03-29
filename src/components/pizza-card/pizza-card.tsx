import styles from './pizza-card.module.scss';
import { PIZZA_DOUGH, PIZZA_SIZES } from 'constants';
import cn from 'lib/utils.ts';
import { Button } from 'components/button';
import { FaPlus } from 'react-icons/fa6';
import { Counter } from 'components/counter';
import { PizzaItem } from 'types';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'store/store.ts';
import { add } from 'features/cart/cartSlice.ts';


export default function PizzaCard({ title, imageUrl, types, sizes, price, id }: PizzaItem) {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const currentItemQuantites = cartItems.reduce((acc, item) => item.id === id ? acc + item.quantity : acc, 0);
  const dispatch = useDispatch();

  const [activeType, setActiveType] = useState(0);
  const [activeSize, setActiveSize] = useState(0);

  return (
    <div className={styles.pizzaCard}>
      <img src={imageUrl} alt='title' width={260} height={260}/>
      <h2>{title}</h2>

      <ul className={styles.controls}>
        <li>
          {PIZZA_DOUGH.map((dough, i) => (
            <button
              className={cn(types[activeType] === i && styles.active)}
              key={i}
              disabled={!types.includes(i)}
              onClick={() => setActiveType(i)}
            >
              {dough}
            </button>
          ))}
        </li>

        <li>
          {PIZZA_SIZES.map((size, i) => (
            <button
              className={cn(sizes[activeSize] === size && styles.active)}
              key={i}
              disabled={!sizes.includes(size)}
              onClick={() => setActiveSize(sizes.indexOf(size))}
            >
              {size} см.
            </button>
          ))}
        </li>
      </ul>

      <div className={styles.addTo}>
        <p className={styles.price}>от {price} ₽</p>

        <Button onClick={() => dispatch(add({
          id,
          imageUrl,
          title,
          type: PIZZA_DOUGH[activeType],
          size: PIZZA_SIZES[activeSize],
          price,
          quantity: 1,
        }))} type={'outline'}>
          <FaPlus/>
          Добавить
          {!!currentItemQuantites && <Counter value={currentItemQuantites}/>}
        </Button>
      </div>
    </div>
  );
}