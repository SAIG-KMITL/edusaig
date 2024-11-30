import { motion } from "framer-motion";
import React from "react";

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  maxPageButtons?: number;
}

const Pagination: React.FC<PaginationProps> = ({
  totalItems,
  itemsPerPage,
  currentPage,
  onPageChange,
  maxPageButtons = 5,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const getPageNumbers = () => {
    const halfMaxButtons = Math.floor(maxPageButtons / 2);
    let startPage = Math.max(1, currentPage - halfMaxButtons);
    const endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

    if (endPage - startPage + 1 < maxPageButtons) {
      startPage = Math.max(1, endPage - maxPageButtons + 1);
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );
  };

  const pageNumbers = getPageNumbers();

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.95 },
  };

  const renderPageButton = (page: number, label?: string) => (
    <motion.button
      key={page}
      onClick={() => onPageChange(page)}
      disabled={currentPage === page}
      variants={buttonVariants}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      transition={{ duration: 0.2 }}
      className={`relative px-4 py-2 mx-1 rounded-xl border-2 font-medium
        ${
          currentPage === page
            ? "bg-gradient-to-r from-electricViolet to-darkMagenta text-white border-electricViolet"
            : "bg-white/10 backdrop-blur-sm text-silver border-white/20 hover:border-electricViolet"
        }
        transition-all duration-300 cursor-pointer min-w-[40px]
        ${currentPage === page ? "shadow-lg" : "hover:shadow-md"}
      `}
    >
      {label || page}
      {currentPage === page && (
        <motion.div
          layoutId="activePage"
          className="absolute inset-0 bg-gradient-to-r from-electricViolet to-darkMagenta rounded-xl -z-10"
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.button>
  );

  const renderNavigationButton = (
    direction: "prev" | "next",
    disabled: boolean
  ) => (
    <motion.button
      onClick={() =>
        onPageChange(direction === "prev" ? currentPage - 1 : currentPage + 1)
      }
      disabled={disabled}
      variants={buttonVariants}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      transition={{ duration: 0.2 }}
      className={`px-4 py-2 mx-1 rounded-xl border-2 
        bg-white/10 backdrop-blur-sm text-silver border-white/20
        hover:border-electricViolet hover:shadow-md
        transition-all duration-300
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-white/20
        disabled:hover:shadow-none
      `}
    >
      {direction === "prev" ? (
        <span className="sr-only">Previous</span>
      ) : (
        <span className="sr-only">Next</span>
      )}
      {direction === "prev" ? "←" : "→"}
    </motion.button>
  );

  return (
    <motion.nav
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex justify-center items-center mt-4 p-2"
    >
      {renderNavigationButton("prev", currentPage === 1)}

      <div className="flex items-center">
        {pageNumbers[0] > 1 && (
          <>
            {renderPageButton(1)}
            {pageNumbers[0] > 2 && (
              <span className="mx-2 text-silver/60">•••</span>
            )}
          </>
        )}

        {pageNumbers.map((page) => renderPageButton(page))}

        {pageNumbers[pageNumbers.length - 1] < totalPages && (
          <>
            {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
              <span className="mx-2 text-silver/60">•••</span>
            )}
            {renderPageButton(totalPages)}
          </>
        )}
      </div>

      {renderNavigationButton("next", currentPage === totalPages)}
    </motion.nav>
  );
};

export default Pagination;
