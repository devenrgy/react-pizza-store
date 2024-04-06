import styles from './pagination.module.scss';
import ReactPaginate from 'react-paginate';
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from 'react-icons/io';

interface Props {
  currentPage: number,
  totalPages: number
  setQueryParams: (key: string, param: string) => void
}

export default function Pagination({ currentPage = 1, totalPages, setQueryParams }: Props) {
  const handleChangePage = ({ selected }: { selected: number }) => {
    setQueryParams('page', (selected + 1).toString());
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
      breakLabel="..."
      nextLabel={<IoMdArrowRoundForward size={30}/>}
      onPageChange={handleChangePage}
      forcePage={currentPage - 1}
      pageCount={totalPages}
      previousLabel={<IoMdArrowRoundBack size={30}/>}
    />
  );
}