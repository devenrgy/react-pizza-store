import { useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa6';

import { motion } from 'framer-motion';
import { useDebouncedCallback } from 'use-debounce';

import {
  useAddPizzaItemMutation,
  useGetCartPizzaItemsQuery,
  useUpdatePizzaItemMutation,
} from 'store/services/pizzaApi';

import Button from 'components/button';

import { PIZZA_DOUGH, PIZZA_SIZES } from 'consts';

import cn from 'lib/utils.ts';

import { PizzaItem } from 'types';

interface Props extends PizzaItem {}

export default function PizzaCard({
  title,
  imageUrl,
  types,
  sizes,
  price,
}: Props) {
  const { data: cartItems } = useGetCartPizzaItemsQuery();
  const [updateCartPizzaItem] = useUpdatePizzaItemMutation();
  const [addCartPizzaItem] = useAddPizzaItemMutation();
  const [activeType, setActiveType] = useState(0);
  const [activeSize, setActiveSize] = useState(0);

  const identicalProducts = cartItems?.filter((item) => item.title == title);
  const identicalProductsQuantity =
    identicalProducts?.reduce((acc, item) => acc + item.quantity, 0) ?? 0;
  const currentItem = identicalProducts?.find(
    (item) =>
      item.type == PIZZA_DOUGH[activeType] &&
      item.size == PIZZA_SIZES[activeSize]
  );
  const currentItemQuantity = currentItem?.quantity ?? 0;
  const [quantityAll, setQuantityAll] = useState(0);
  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    setQuantityAll(identicalProductsQuantity);
    setQuantity(currentItemQuantity);
  }, [identicalProductsQuantity, currentItemQuantity]);

  const sendRequest = useDebouncedCallback(() => {
    if (currentItem) {
      updateCartPizzaItem({ id: currentItem.id, quantity });
    } else {
      addCartPizzaItem({
        imageUrl,
        title,
        type: PIZZA_DOUGH[activeType],
        size: PIZZA_SIZES[activeSize],
        price,
        quantity,
      });
    }
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
      transition={{
        duration: 0.3,
        ease: 'easeInOut',
      }}
      className='row-span-4 mx-auto grid w-[280px] grid-rows-subgrid gap-0'
    >
      <img
        className='clip-circle mx-auto mb-2 block aspect-square'
        src={imageUrl}
        width={260}
        height={260}
        alt={`Пицца ${title}`}
      />

      <h2 className='mb-5 break-words text-center text-xl font-extrabold'>
        {title}
      </h2>

      <ul className='mb-5 space-y-3 rounded-xl bg-neutral-800 p-2'>
        <li className='flex'>
          {PIZZA_DOUGH.map((dough, i) => (
            <button
              className={cn(
                'flex-1 rounded px-5 py-3 text-sm font-bold duration-300 hover:bg-black/30 disabled:pointer-events-none disabled:opacity-30',
                {
                  'pointer-events-none bg-neutral-950 shadow':
                    types[activeType] == i,
                }
              )}
              key={i}
              disabled={!types.includes(i)}
              onClick={() => setActiveType(i)}
            >
              {dough}
            </button>
          ))}
        </li>

        <li className='flex'>
          {PIZZA_SIZES.map((size, i) => (
            <button
              className={cn(
                'flex-1 rounded px-5 py-3 text-sm font-bold duration-300 hover:bg-black/30 disabled:pointer-events-none disabled:opacity-30',
                {
                  'pointer-events-none bg-neutral-950 shadow':
                    sizes[activeSize] == size,
                }
              )}
              key={i}
              disabled={!sizes.includes(size)}
              onClick={() => setActiveSize(sizes.indexOf(size))}
            >
              {size} см.
            </button>
          ))}
        </li>
      </ul>

      <div className='flex items-center justify-between'>
        <p className='text-xl font-bold'>от {price} &#8381;</p>

        <Button
          icon={<FaPlus />}
          onClick={handleAddToCart}
          variant={'outline'}
          counter={quantityAll}
        >
          Добавить
        </Button>
      </div>
    </motion.li>
  );
}
