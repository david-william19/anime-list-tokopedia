import styled from '@emotion/styled';
import React, { useEffect, useState } from 'react';

interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (pageNumber: number) => void;
  pageLimit?: number;
}

const PaginationWrapper = styled.nav`
  ul {
    display: inline-block;
    list-style: none;
    padding: 0;
    margin: 20px 0;
    width: 100%;
    text-align: center;
  }

  li {
    display: inline-block;
  }

  button {
    color: #333;
    background-color: #fff;
    border: 1px solid #ccc;
    padding: 8px 12px;
    margin: 2px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #f0f0f0;
    }
  }

  .active button {
    background-color: #ff4400;
    color: #fff;
    border: 1px solid #ff4400;
  }

  .disabled button {
    pointer-events: none;
    opacity: 0.6;
  }
`;

const Pagination: React.FC<PaginationProps> = ({ totalItems, itemsPerPage, onPageChange, pageLimit = 5 }) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (pageNumber: number) => {
    console.log("page: ", pageNumber)
    setCurrentPage(pageNumber);
    onPageChange(pageNumber);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const startPage = Math.max(1, currentPage - Math.floor(pageLimit / 2));
    const endPage = Math.min(totalPages, startPage + pageLimit - 1);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <li key={i} className={i === currentPage ? 'active' : ''}>
          <button onClick={() => handlePageChange(i)}>{i}</button>
        </li>
      );
    }
    return pageNumbers;
    }

    useEffect(() => {
        if (totalItems > 0) {
          setCurrentPage((prevPage) => Math.min(prevPage, totalPages));
        }
      }, [totalItems, totalPages]);

  return (
    <PaginationWrapper>
      <ul className="pagination">
        <li>
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            &laquo;
          </button>
        </li>
        {renderPageNumbers()}
        <li>
          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            &raquo;
          </button>
        </li>
      </ul>
    </PaginationWrapper>
  );
};

export default Pagination;
