type PaginationCatalogProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

function PaginationCatalog({currentPage, totalPages, onPageChange}: PaginationCatalogProps): JSX.Element | null {
  if (totalPages <= 1) {
    return null;
  }

  const maxPagesToShow = 3;
  const currentBlock = Math.ceil(currentPage / maxPagesToShow);
  const startPage = (currentBlock - 1) * maxPagesToShow + 1;
  const endPage = Math.min(startPage + maxPagesToShow - 1, totalPages);

  const pages = [];
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
                onClick={() => onPageChange(startPage - 1)}
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
                onClick={() => onPageChange(endPage + 1)}
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
