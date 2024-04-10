import { IoMdArrowRoundBack, IoMdArrowRoundForward } from 'react-icons/io';
import ReactPaginate from 'react-paginate';

import useQueryParams from 'hooks/useQueryParams';

import styles from './pagination.module.scss';

interface Props {
  currentPage: number;
  totalPages: number;
}

export default function Pagination({ currentPage, totalPages }: Props) {
  const [, setCurrentPage] = useQueryParams();
  const handleChangePage = ({ selected }: { selected: number }) => {
    setCurrentPage('page', (selected + 1).toString());
  };

  return (
    <ReactPaginate
      className={styles.pagination}
      pageLinkClassName={styles.item}
      activeLinkClassName={styles.active}
      previousLinkClassName={styles.prev}
      nextLinkClassName={styles.next}
      breakLinkClassName={styles.break}
      disabledClassName={styles.disabled}
      breakLabel='...'
      nextLabel={<IoMdArrowRoundForward size={30} />}
      onPageChange={handleChangePage}
      forcePage={currentPage - 1}
      pageCount={totalPages}
      previousLabel={<IoMdArrowRoundBack size={30} />}
    />
  );
}
