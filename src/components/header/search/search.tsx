import { useForm } from 'react-hook-form';
import { IoClose, IoSearch } from 'react-icons/io5';

import useQueryParams from 'hooks/useQueryParams.ts';

type SearchForm = {
  search: string;
};

export default function Search() {
  const [currentParams, setQueryParams] = useQueryParams();
  const { q } = currentParams;
  const { register, handleSubmit, resetField, setFocus } =
    useForm<SearchForm>();

  const handleSubmitForm = ({ search }: SearchForm) => {
    setQueryParams('q', search);
    setQueryParams('page', '1');
  };

  const handleResetSearch = () => {
    resetField('search');
    setQueryParams('q', '');
    setFocus('search');
  };

  return (
    <search className='group relative max-w-[400px] duration-300'>
      <form autoComplete='off' onSubmit={handleSubmit(handleSubmitForm)}>
        <label className='peer'>
          <input
            {...register('search')}
            className='relative z-10 h-14 w-full appearance-none rounded-full border-2 border-neutral-800 bg-neutral-950 pl-5 pr-10 text-lg placeholder-neutral-500 outline-none duration-300 focus:border-red-900 [&:not(:placeholder-shown)]:w-[calc(100%_-_64px)] [&:not(:placeholder-shown)]:rounded-r-none'
            defaultValue={q}
            type='search'
            placeholder='Поиск пиццы...'
          />
          <button
            type='button'
            onClick={handleResetSearch}
            className='invisible absolute right-16 top-1/2 z-10 flex -translate-y-1/2 items-center justify-center p-1 text-white opacity-0 duration-300 group-has-[input:not(:placeholder-shown)]:visible group-has-[input:not(:placeholder-shown)]:opacity-100'
          >
            <IoClose size={30} />
          </button>
        </label>

        <button
          type='submit'
          className='invisible absolute right-0 top-0 flex h-14 w-16 items-center justify-center rounded-r-full bg-red-900 opacity-0 duration-300 group-has-[input:not(:placeholder-shown)]:visible group-has-[input:not(:placeholder-shown)]:opacity-100'
        >
          <IoSearch className='relative right-2' size={30} />
        </button>
      </form>
    </search>
  );
}
