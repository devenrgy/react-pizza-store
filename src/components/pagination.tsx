import { IoMdArrowRoundBack, IoMdArrowRoundForward } from 'react-icons/io';
import ReactPaginate from 'react-paginate';

import useQueryParams from 'hooks/useQueryParams';

interface Props {
  currentPage: number;
  totalPages: number;
}

export default function Pagination({ currentPage, totalPages }: Props) {
  const [, setCurrentPage] = useQueryParams();
  const handleChangePage = ({ selected }: { selected: number }) => {
    setCurrentPage('page', (selected + 1).toString());
    const textElement = document.getElementById('top');
    if (textElement) {
      window.scrollTo({ behavior: 'smooth', top: textElement.offsetTop - 15 });
    }

    // window.scrollTo({ top: 0 });
  };

  return (
    <ReactPaginate
      className='flex select-none items-center justify-center gap-5'
      pageLinkClassName='duration-300 rounded-full aspect-square h-10 flex items-center justify-center bg-neutral-800 hover:scale-110 hover:bg-neutral-700'
      activeLinkClassName='scale-125 bg-red-900 pointer-events-none'
      previousLinkClassName='duration-300 rounded-full aspect-square h-10 flex justify-center items-center opacity-100 hover:bg-neutral-700'
      nextLinkClassName='duration-300 rounded-full aspect-square h-10 flex justify-center items-center opacity-100 hover:bg-neutral-700'
      breakLinkClassName='duration-300 rounded-full aspect-square h-10 flex items-center justify-center bg-neutral-800 hover:bg-neutral-700'
      disabledClassName='opacity-30 pointer-events-none'
      breakLabel='...'
      nextLabel={<IoMdArrowRoundForward size={30} />}
      onPageChange={handleChangePage}
      forcePage={currentPage - 1}
      pageCount={totalPages}
      previousLabel={<IoMdArrowRoundBack size={30} />}
    />
  );
}
