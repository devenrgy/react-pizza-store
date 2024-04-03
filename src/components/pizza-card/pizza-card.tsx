import { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa6';

import { useDebouncedCallback } from 'use-debounce';

import {
  useAddPizzaItemMutation,
  useGetCartPizzaItemsQuery,
  useUpdatePizzaItemMutation,
} from 'store/services/pizzaApi.ts';

import { Button } from 'components/button';
import { Counter } from 'components/counter';

import cn from 'lib/utils.ts';

import { PizzaItem } from 'types';

import { PIZZA_DOUGH, PIZZA_SIZES } from 'constants';

import styles from './pizza-card.module.scss';

export default function PizzaCard({ title, imageUrl, types, sizes, price, id }: PizzaItem) {
  const { data: cartItems } = useGetCartPizzaItemsQuery();
  const [updateCartPizzaItem] = useUpdatePizzaItemMutation();
  const [addCartPizzaItem] = useAddPizzaItemMutation();
  const [activeType, setActiveType] = useState(0);
  const [activeSize, setActiveSize] = useState(0);

  const identicalProducts = cartItems?.filter(item => item.pizzaID === id);
  const identicalProductsQuantity = identicalProducts?.reduce((acc, item) => acc + item.quantity, 0) ?? 0;
  const currentItem = cartItems?.find(item => item.pizzaID === id && item.type === PIZZA_DOUGH[activeType] && item.size === PIZZA_SIZES[activeSize]);
  const currentItemQuantity = currentItem?.quantity ?? 0;
  const [quantityAll, setQuantityAll] = useState(0);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    setQuantityAll(identicalProductsQuantity);
    setQuantity(currentItemQuantity);
  }, [identicalProductsQuantity, currentItemQuantity]);

  const sendRequest = useDebouncedCallback(() => {
    if (currentItem && currentItemQuantity) {
      updateCartPizzaItem({ id: currentItem.id, quantity });
      return;
    }

    addCartPizzaItem({
      imageUrl,
      pizzaID: id,
      title,
      type: PIZZA_DOUGH[activeType],
      size: PIZZA_SIZES[activeSize],
      price,
      quantity: quantity,
    });
  }, 300);

  const handleClickAddToCart = () => {
    setQuantityAll(quantityAll + 1);
    setQuantity(quantity + 1);
    sendRequest();
  };

  return (
    <div className={styles.pizzaCard}>
      <img src={imageUrl} alt="title" width={260} height={260}/>
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

        <Button onClick={handleClickAddToCart} type={'outline'}>
          <FaPlus/>
          Добавить
          {!!quantityAll && <Counter value={quantityAll}/>}
        </Button>
      </div>
    </div>
  );
}