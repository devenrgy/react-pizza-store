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
      <ul className='flex gap-2'>
        {CATEGORIES.map(({ name, path }, i) => (
          <li key={i}>
            <Button
              onClick={() => handleCurrentCategory(path)}
              variant={currentCategory === path ? 'primary' : 'accent'}
              size='large'
              className={cn(currentCategory === path && 'pointer-events-none')}
            >
              {name}
            </Button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
