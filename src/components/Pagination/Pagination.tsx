import styles from "./Pagination.module.scss";
import type { PaginationProps } from "../../configs/interfaces.ts";
import ThemeContext from "../../context/themeContext";
import { useContext } from "react";
import clsx from "clsx";

export default function Pagination({
  totalPages,
  currentPage,
  onPageChange,
}: PaginationProps) {
  const theme = useContext(ThemeContext);

  const getPages = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }

    let startPage = Math.max(2, currentPage - 1);
    let endPage = Math.min(totalPages - 1, currentPage + 1);

    if (currentPage <= 2) {
      startPage = 2;
      endPage = 3;
    }

    if (currentPage >= totalPages - 1) {
      startPage = totalPages - 2;
      endPage = totalPages - 1;
    }

    pages.push(1);

    if (startPage > 2) {
      pages.push("...");
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    if (endPage < totalPages - 1) {
      pages.push("...");
    }

    pages.push(totalPages);

    return pages;
  };

  const pages = getPages();

  return (
    <div className={styles.pagination}>
      <button
        className={clsx(styles.arrow, {
          [styles.light]: theme === "light",
          [styles.dark]: theme === "dark",
        })}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        &lt;
      </button>

      <div className={styles.pages}>
        {pages.map((page, index) =>
          page === "..." ? (
            <span key={`dots-${index}`} className={styles.dots}>
              ...
            </span>
          ) : (
            <button
              key={page}
              className={clsx(styles.pageButton, {
                [styles.active]: page === currentPage && theme === "light",
                [styles.activeDark]: page === currentPage && theme === "dark",
                [styles.dark]: theme === "dark",
              })}
              onClick={() => onPageChange(Number(page))}
            >
              {page}
            </button>
          )
        )}
      </div>

      <button
        className={clsx(styles.arrow, {
          [styles.light]: theme === "light",
          [styles.dark]: theme === "dark",
        })}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        &gt;
      </button>
    </div>
  );
}
