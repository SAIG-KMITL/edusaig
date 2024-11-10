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

  const renderPageButton = (page: number, label?: string) => (
    <button
      key={page}
      onClick={() => onPageChange(page)}
      disabled={currentPage === page}
      className={`px-3 py-2 mx-1 rounded-xl border-2 ${
        currentPage === page
          ? "bg-blue-500 text-white border-blue-500"
          : "bg-white text-gray-800 border-gray-200 hover:bg-blue-500 hover:text-white hover:border-blue-500"
      } cursor-pointer`}
    >
      {label || page}
    </button>
  );

  return (
    <nav className="flex justify-center items-center mt-4">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-3 py-2 mx-1 rounded-xl border-2 bg-white text-gray-800 border-gray-200 hover:bg-blue-500 hover:text-white hover:border-blue-500 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        &lt;
      </button>

      {pageNumbers[0] > 1 && (
        <>
          {renderPageButton(1)}
          {pageNumbers[0] > 2 && <span className="mx-2">...</span>}
        </>
      )}

      {pageNumbers.map((page) => renderPageButton(page))}

      {pageNumbers[pageNumbers.length - 1] < totalPages && (
        <>
          {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
            <span className="mx-2">...</span>
          )}
          {renderPageButton(totalPages)}
        </>
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-3 py-2 mx-1 rounded-xl border-2 bg-white text-gray-800 border-gray-200 hover:bg-blue-500 hover:text-white hover:border-blue-500 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        &gt;
      </button>
    </nav>
  );
};

export default Pagination;
