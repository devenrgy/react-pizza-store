import { FaMinus, FaPlus } from 'react-icons/fa6';
import { IoClose } from 'react-icons/io5';

import { motion } from 'framer-motion';

import cn from 'lib/utils';

import { CartPizzaItem } from 'types';

import styles from './cart-item.module.scss';

interface Props extends CartPizzaItem {
  incrementPizzaItem: (pizzaID: number, quantity: number) => void;
  decrementPizzaItem: (pizzaID: number, quantity: number) => void;
  removePizzaItem: (pizzaID: number) => void;
}

export default function CartItem({
  imageUrl,
  price,
  quantity,
  size,
  title,
  type,
  id,
  incrementPizzaItem,
  decrementPizzaItem,
  removePizzaItem,
}: Props) {
  return (
    <motion.li
      layout
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -200, opacity: 0 }}
      className={styles.cartItem}
      transition={{
        duration: 0.3,
        ease: 'easeInOut',
      }}
    >
      <div className={styles.description}>
        <img src={imageUrl} width='80' height='80' alt='some text' />
        <div>
          <h3>{title}</h3>
          <p>
            {type} тесто, {size} см.
          </p>
        </div>
      </div>
      <div className={styles.counter}>
        <button className={cn(quantity < 2 && styles.hidden)} onClick={() => decrementPizzaItem(id!, quantity)}>
          <FaMinus size={16} />
        </button>
        {quantity} шт.
        <button className={cn(quantity > 4 && styles.hidden)} onClick={() => incrementPizzaItem(id!, quantity)}>
          <FaPlus size={16} />
        </button>
      </div>
      <p className={styles.price}>{price} ₽</p>
      <button className={styles.remove} onClick={() => removePizzaItem(id!)}>
        <IoClose size={20} />
      </button>
    </motion.li>
  );
}
