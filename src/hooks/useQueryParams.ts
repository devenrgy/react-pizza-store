import { useSearchParams } from 'react-router-dom';
import { PizzaParams } from 'types';

export default function useQueryParams(): [PizzaParams, (key: string, param: string) => void] {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentParams = Object.fromEntries(searchParams.entries()) as PizzaParams;

  const handleSetParams = (key: string, param: string) => {
    setSearchParams(() => {
      if (param) {
        searchParams.set(key, param);
        return searchParams;
      }
      searchParams.delete(key);
      return searchParams;
    });
  };

  return [currentParams, handleSetParams];
}