type PaginationCatalogProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function PaginationCatalog({currentPage, totalPages, onPageChange}: PaginationCatalogProps): JSX.Element | null {
  if (totalPages <= 1) {
    return null;
  }

  const pages = [];
  const maxPagesToShow = 3;
  const startPage = Math.max(currentPage - 1, 1);
  const endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);

  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  return (
    <div className="pagination">
      <ul className="pagination__list">
        {
          currentPage > 1 && (
            <li className="pagination__item">
              <a
                className="pagination__link pagination__link--text"
                onClick={() => onPageChange(currentPage - 1)}
              >
            Назад
              </a>
            </li>
          )
        }
        {
          pages.map((page) => (
            <li
              key={page}
              className="pagination__item"
            >
              <a
                className={`pagination__link ${page === currentPage ? 'pagination__link--active' : ''}`}
                onClick={() => onPageChange(page)}
              >
                {page}
              </a>
            </li>
          ))
        }
        {
          endPage < totalPages && (
            <li className='pagination__item'>
              <a
                className='pagination__link pagination__link--text'
                onClick={() => onPageChange(currentPage + 1)}
              >
                  Далее
              </a>
            </li>
          )
        }
      </ul>
    </div>
  );
}

export default PaginationCatalog;
