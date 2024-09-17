import React from "react";

interface PaginationProps {
  dataLength: number;
  rowsPerPage: number;
  currentPage: number;
  paginate: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  dataLength,
  rowsPerPage,
  currentPage,
  paginate,
}) => {
  const pageNumbers = Array.from({
    length: Math.ceil(dataLength / rowsPerPage),
  });

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((_, index) => (
          <li
            key={index}
            className={`page-item ${
              currentPage === index + 1 ? "active" : ""
            }`}
          >
            <button
              onClick={() => paginate(index + 1)}
              className="page-link"
            >
              {index + 1}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
