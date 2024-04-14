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
      <ul className='flex flex-wrap gap-5 sm:flex sm:flex-wrap sm:gap-2'>
        {CATEGORIES.map(({ name, path }, i) => (
          <li className='flex-1 [&:nth-child(3)]:w-full' key={i}>
            <Button
              onClick={() => handleCurrentCategory(path)}
              variant={currentCategory == path ? 'primary' : 'accent'}
              size='large'
              className={cn(
                { 'pointer-events-none': currentCategory == path },
                'w-full min-w-max'
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
