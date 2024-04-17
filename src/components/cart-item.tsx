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
      className='mx-auto w-full border-neutral-800 pt-7 text-xl font-bold md:col-span-2 md:grid md:grid-cols-subgrid md:items-center [&+&]:border-t'
      transition={{
        duration: 0.3,
        ease: 'easeInOut',
      }}
    >
      <div className='mb-8 space-y-5 md:mb-0 md:flex md:max-w-[500px] md:items-center md:gap-4 md:space-y-0'>
        <img
          className='clip-circle-small mx-auto md:mx-0'
          src={imageUrl}
          width='80'
          height='80'
          alt={`Пицца ${title}`}
        />
        <div className='text-center md:text-left'>
          <h3 className='text-balance'>{title}</h3>
          <p className='text-lg font-normal text-neutral-400'>
            {type} тесто, {size} см.
          </p>
        </div>
      </div>
      <div className='flex items-center justify-between md:gap-5'>
        <div className='flex items-center gap-3'>
          <button
            className={cn(
              'visible flex aspect-square h-8 items-center justify-center rounded-full border-2 border-red-900 text-red-900 duration-300 hover:bg-red-900 hover:text-white',
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
              'visible flex aspect-square h-8 items-center justify-center rounded-full border-2 border-red-900 text-red-900 duration-300 hover:bg-red-900 hover:text-white',
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
          className='flex aspect-square h-8 items-center justify-center rounded-full border-2 border-red-900 text-red-900 duration-300 hover:bg-red-900 hover:text-white'
          onClick={() => removePizzaItem(id!)}
        >
          <IoClose size={20} />
        </button>
      </div>
    </motion.li>
  );
}
