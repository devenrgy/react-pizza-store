import Button from 'components/button';

import { CATEGORIES } from 'consts';

import cn from 'lib/utils.ts';

interface Props {
  currentCategory: string;
  setQueryParams: (key: string, param: string) => void;
}

export default function Navbar({
  currentCategory = '',
  setQueryParams,
}: Props) {
  const handleCurrentCategory = (path: string) => {
    setQueryParams('page', '1');
    setQueryParams('category', path);
    setQueryParams('q', '');
  };

  return (
    <nav>
      <ul className='grid grid-cols-2 gap-5 sm:grid-cols-3 lg:flex lg:flex-wrap'>
        {CATEGORIES.map(({ name, path }, i) => (
          <li
            className='[&:nth-child(3n+3)]:col-span-2 sm:[&:nth-child(3n+3)]:col-span-1'
            key={i}
          >
            <Button
              onClick={() => handleCurrentCategory(path)}
              variant={currentCategory == path ? 'primary' : 'accent'}
              size='medium'
              className={cn(
                { 'pointer-events-none': currentCategory == path },
                'w-full px-7 py-4'
              )}
            >
              {name}
            </Button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
