import styles from './Pagination.module.scss';
import type { PaginationProps } from '../../configs/interfaces.ts';
import ThemeContext from '../../context/themeContext';
import { useContext } from 'react';
import clsx from 'clsx';

export default function Pagination({ totalPages, currentPage, onPageChange }: PaginationProps) {
   const theme = useContext(ThemeContext);
  const getPages = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }

    return pages;
  };

  const pages = getPages();

  return (
    <div className={styles.pagination}>
    
      <button
         className={clsx(
    styles.arrow,
    { 
      [styles.light]: theme === 'light',
      [styles.dark]: theme === 'dark'
    }
  )}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        &lt;
      </button>

    
      <div className={styles.pages}>
        {pages.map((page, index) =>
          page === '...' ? (
            <span key={`dots-${index}`} className={styles.dots}>...</span>
          ) : (
            <button
              key={page}
              className={clsx(
                styles.pageButton,
                { 
                  [styles.active]: page === currentPage,
                  [styles.dark]: theme === 'dark'
                }
              )}
              onClick={() => onPageChange(page as number)}
            >
              {page}
            </button>
          )
        )}
      </div>

     
      <button
         className={clsx(
    styles.arrow,
    { 
      [styles.light]: theme === 'light',
      [styles.dark]: theme === 'dark'
    }
  )}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        &gt;
      </button>
    </div>
  );
}




