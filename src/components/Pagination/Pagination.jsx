import './Pagination.css';

function Pagination({
  currentPage,
  totalPages,
  pageSize,
  onPageChange,
  onPageSizeChange,
  pageSizeOptions,
}) {
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className="pagination">
      <div className="page-size">
        <label>
          Rows per page
          <select
            value={pageSize}
            onChange={(event) => onPageSizeChange(event.target.value)}
          >
            {pageSizeOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div className="page-controls">
        <button
          type="button"
          onClick={() => onPageChange(Math.max(1, currentPage - 1))}
          disabled={currentPage === 1}
        >
          Prev
        </button>
        {pages.map((page) => (
          <button
            key={page}
            type="button"
            className={page === currentPage ? 'active' : ''}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ))}
        <button
          type="button"
          onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Pagination;
