import { useRef, useState } from 'react';
import { TiArrowSortedUp } from 'react-icons/ti';

import useClickOutside from 'hooks/useClickOutside.ts';

import { SORT_LIST } from 'consts';

import cn from 'lib/utils';

interface Props {
  currentSort: string;
  setQueryParams: (key: string, param: string) => void;
}

export default function Sort({
  currentSort = 'rating',
  setQueryParams,
}: Props) {
  const [menuVisibility, setMenuVisibility] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleSelectSort = (nextSort: string) => {
    setQueryParams('sort', nextSort);

    setMenuVisibility(false);
  };

  useClickOutside(ref, () => setMenuVisibility(false));

  return (
    <div ref={ref} className='group relative flex items-center'>
      <TiArrowSortedUp className='group-has-[:checked]:rotate-180' />
      <label
        className='flex cursor-pointer select-none items-center gap-2 p-1 text-sm font-bold'
        htmlFor='sort'
      >
        Сортировка по:{' '}
        <span className='text-red-900 underline decoration-dotted underline-offset-4'>
          {SORT_LIST[currentSort]}
        </span>
      </label>

      <input
        onChange={() => setMenuVisibility(!menuVisibility)}
        checked={menuVisibility}
        id='sort'
        className='peer hidden'
        type='checkbox'
      />

      <div className='invisible absolute right-0 top-[115%] z-10 grid grid-rows-[0fr] rounded-xl border border-neutral-800 bg-neutral-950/70 py-1 shadow backdrop-blur-md duration-300 peer-checked:visible peer-checked:grid-rows-[1fr]'>
        <ul className='overflow-hidden'>
          {Object.entries(SORT_LIST).map(([value, name], i) => (
            <li key={i}>
              <button
                onClick={() => handleSelectSort(value)}
                title={name}
                className={cn(
                  'w-full px-5 py-3 text-left text-sm duration-300 active:bg-red-900/40 lg:hover:bg-red-900/40',
                  { 'pointer-events-none bg-red-900/60': currentSort == value }
                )}
              >
                {name}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
