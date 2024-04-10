import { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa6';

import { motion } from 'framer-motion';
import { useDebouncedCallback } from 'use-debounce';

import {
  useAddPizzaItemMutation,
  useGetCartPizzaItemsQuery,
  useUpdatePizzaItemMutation,
} from 'store/services/pizzaApi';

import { Button } from 'components/button';

import { PIZZA_DOUGH, PIZZA_SIZES } from 'consts';

import cn from 'lib/utils.ts';

import { PizzaItem } from 'types';

import styles from './pizza-card.module.scss';

interface Props extends PizzaItem {}

export default function PizzaCard({ title, imageUrl, types, sizes, price, id }: Props) {
  const { data: cartItems } = useGetCartPizzaItemsQuery();
  const [updateCartPizzaItem] = useUpdatePizzaItemMutation();
  const [addCartPizzaItem] = useAddPizzaItemMutation();
  const [activeType, setActiveType] = useState(0);
  const [activeSize, setActiveSize] = useState(0);

  const identicalProducts = cartItems?.filter((item) => item.pizzaID === id);
  const identicalProductsQuantity = identicalProducts?.reduce((acc, item) => acc + item.quantity, 0) ?? 0;
  const currentItem = cartItems?.find(
    (item) => item.pizzaID === id && item.type === PIZZA_DOUGH[activeType] && item.size === PIZZA_SIZES[activeSize]
  );
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

  const handleAddToCart = () => {
    setQuantityAll(quantityAll + 1);
    setQuantity(quantity + 1);
    sendRequest();
  };

  return (
    <motion.li
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{
        duration: 0.3,
        ease: 'easeInOut',
      }}
      className={styles.pizzaCard}
    >
      <img src={imageUrl} onLoad={() => console.log('hi')} width={260} height={260} alt={`Пицца ${title}`} />

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

        <Button icon={<FaPlus />} onClick={handleAddToCart} variant={'outline'} counter={quantityAll}>
          Добавить
        </Button>
      </div>
    </motion.li>
  );
}
