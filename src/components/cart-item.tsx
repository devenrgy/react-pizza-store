import { FaMinus, FaPlus } from 'react-icons/fa6';
import { IoClose } from 'react-icons/io5';

import { motion } from 'framer-motion';

import cn from 'lib/utils';

import { CartPizzaItem } from 'types';

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
      className='mx-auto w-full border-neutral-800 pt-7 text-xl font-bold sm:col-span-4 sm:grid sm:grid-cols-subgrid sm:items-center [&+&]:border-t'
      transition={{
        duration: 0.3,
        ease: 'easeInOut',
      }}
    >
      <div className='mb-3 space-y-3 sm:flex sm:max-w-[500px] sm:items-center sm:gap-4'>
        <img
          className='mx-auto'
          src={imageUrl}
          width='80'
          height='80'
          alt={`Пицца ${title}`}
        />
        <div className='text-center'>
          <h3>{title}</h3>
          <p className='text-lg font-normal text-neutral-400'>
            {type} тесто, {size} см.
          </p>
        </div>
      </div>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-3'>
          <button
            className={cn(
              'visible flex aspect-square h-8 items-center justify-center rounded-full border-2 border-red-900 text-red-900 duration-300 active:bg-red-900 active:text-white lg:hover:bg-red-900 lg:hover:text-white',
              {
                'pointer-events-none invisible opacity-0': quantity < 2,
              }
            )}
            onClick={() => decrementPizzaItem(id!, quantity)}
          >
            <FaMinus size={16} />
          </button>
          {quantity} шт.
          <button
            className={cn(
              'visible flex aspect-square h-8 items-center justify-center rounded-full border-2 border-red-900 text-red-900 duration-300 active:bg-red-900 active:text-white lg:hover:bg-red-900 lg:hover:text-white',
              {
                'pointer-events-none invisible opacity-0': quantity > 4,
              }
            )}
            onClick={() => incrementPizzaItem(id!, quantity)}
          >
            <FaPlus size={16} />
          </button>
        </div>
        <p>{price * quantity} ₽</p>
        <button
          className='flex aspect-square h-8 items-center justify-center rounded-full border-2 border-red-900 text-red-900 duration-300 active:bg-red-900 active:text-white lg:hover:bg-red-900 lg:hover:text-white'
          onClick={() => removePizzaItem(id!)}
        >
          <IoClose size={20} />
        </button>
      </div>
    </motion.li>
  );
}
