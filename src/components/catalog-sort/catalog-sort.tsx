type CatalogSortProps = {
  sortType: 'price' | 'rating';
  sortOrder: 'asc' | 'desc';
  onSortTypeChange: (type: 'price' | 'rating') => void;
  onSortOrderChange: (order: 'asc' | 'desc') => void;
};

function CatalogSort({ sortType, sortOrder, onSortTypeChange, onSortOrderChange }: CatalogSortProps): JSX.Element {
  return (
    <div className="catalog-sort">
      <form action="#">
        <div className="catalog-sort__inner">
          <p className="title title--h5">Сортировать:</p>

          <div className="catalog-sort__type">
            <div className="catalog-sort__btn-text">
              <input
                type="radio"
                id="sortPrice"
                name="sort"
                checked={sortType === 'price'}
                onChange={() => onSortTypeChange('price')}
              />
              <label htmlFor="sortPrice">по цене</label>
            </div>

            <div className="catalog-sort__btn-text">
              <input
                type="radio"
                id="sortPopular"
                name="sort"
                checked={sortType === 'rating'}
                onChange={() => onSortTypeChange('rating')}
              />
              <label htmlFor="sortPopular">по популярности</label>
            </div>
          </div>

          <div className="catalog-sort__order">
            <div className="catalog-sort__btn catalog-sort__btn--up">
              <input
                type="radio"
                id="up"
                name="sort-icon"
                aria-label="По возрастанию"
                checked={sortOrder === 'asc'}
                onChange={() => onSortOrderChange('asc')}
              />
              <label htmlFor="up">
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-sort"></use>
                </svg>
              </label>
            </div>

            <div className="catalog-sort__btn catalog-sort__btn--down">
              <input
                type="radio"
                id="down"
                name="sort-icon"
                aria-label="По убыванию"
                checked={sortOrder === 'desc'}
                onChange={() => onSortOrderChange('desc')}
              />
              <label htmlFor="down">
                <svg width="16" height="14" aria-hidden="true">
                  <use xlinkHref="#icon-sort"></use>
                </svg>
              </label>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default CatalogSort;
