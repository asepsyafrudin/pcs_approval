import React, { useEffect, useState } from "react";
import Pagination from "react-bootstrap/Pagination";
import "./pagination.css";

function PaginationTable(props) {
  const { totalPage, maxPagesShow, onChangePage } = props;
  const [currentPage, setCurrentPage] = useState(1);
  const [startPage, setStartPage] = useState(1);
  const [endPage, setEndPage] = useState(1);

  useEffect(() => {
    if (totalPage <= maxPagesShow) {
      setStartPage(1);
      setEndPage(totalPage);
    } else {
      let maxPageBeforeCurrentPage = Math.floor(maxPagesShow / 2);
      let maxPageAfterCurrentPage = Math.ceil(maxPagesShow / 2) - 1;
      if (currentPage <= maxPageBeforeCurrentPage) {
        setStartPage(1);
        setEndPage(maxPagesShow);
      } else if (currentPage + maxPageAfterCurrentPage >= totalPage) {
        setStartPage(totalPage - maxPagesShow + 1);
        setEndPage(totalPage);
      } else {
        setStartPage(currentPage - maxPageBeforeCurrentPage);
        setEndPage(currentPage + maxPageAfterCurrentPage);
      }
    }
  }, [currentPage, startPage, endPage, totalPage, maxPagesShow]);

  //function page

  const handleCurrentPage = (el) => {
    setCurrentPage(parseInt(el.target.innerText));
    onChangePage(parseInt(el.target.innerText));
  };
  const handleFirstPage = () => {
    setCurrentPage(1);
    onChangePage(1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      onChangePage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < endPage) {
      setCurrentPage(currentPage + 1);
      onChangePage(currentPage + 1);
    }
  };

  const handleLastPage = () => {
    setCurrentPage(totalPage);
    onChangePage(totalPage);
  };

  let paginationArray = [];
  if (totalPage !== 0) {
    for (let index = startPage; index <= endPage; index++) {
      paginationArray.push(
        <Pagination.Item
          active={currentPage === index ? true : false}
          value={index}
          key={index}
          onClick={handleCurrentPage}
        >
          {index}
        </Pagination.Item>
      );
    }
  }

  return (
    <div className="pagination">
      <Pagination>
        <Pagination.First onClick={handleFirstPage} />
        <Pagination.Prev onClick={handlePreviousPage} />
        {paginationArray}
        <Pagination.Next onClick={handleNextPage} />
        <Pagination.Last onClick={handleLastPage} />
      </Pagination>
    </div>
  );
}

export default PaginationTable;
