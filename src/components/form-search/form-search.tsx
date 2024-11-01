import { useState } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';

import { useAppSelector } from '../../store/hook';

import { Cameras } from '../../types/cameras-types/cameras-types';
import { AppRoute } from '../../const';
import { normalizeText } from '../../utils/utils';

function FormSearch(): JSX.Element {
  const products = useAppSelector((state) => state.cameras.cameras);
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Cameras>([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const query = evt.target.value;
    setSearchTerm(query);

    if (query.length >= 3) {
      const normalizedQuery = normalizeText(query);

      const result = products
        .filter((product) => normalizeText(product.name).includes(normalizedQuery));

      setFilteredProducts(result);
      setShowDropdown(true);
    } else {
      setFilteredProducts([]);
      setShowDropdown(false);
    }
  };

  const handleProductSelect = (productId: number) => {
    const path = generatePath(AppRoute.ProductPage, { id: productId.toString() });
    navigate(path);
  };

  const handleSearchReset = () => {
    setSearchTerm('');
    setFilteredProducts([]);
    setShowDropdown(false);
  };

  return (
    <>
      <div className="form-search">
        <form>

          <label>
            <svg className="form-search__icon" width="16" height="16" aria-hidden="true">
              <use xlinkHref="#icon-lens"></use>
            </svg>
            <input
              className="form-search__input"
              type="text"
              autoComplete="off"
              placeholder="Поиск по сайту"
              onChange={handleInputChange}
              value={searchTerm}
            />
          </label>

          {
            showDropdown &&
              <ul
                className="form-search__select-list"
                style={{
                  visibility: showDropdown && filteredProducts.length > 0 ? 'visible' : 'hidden',
                  opacity: 1
                }}
              >
                {
                  filteredProducts.map(
                    (product, index) => (
                      <li
                        className="form-search__select-item"
                        tabIndex={index}
                        key={product.id}
                        onClick={() => handleProductSelect(product.id)}
                      >
                        {product.name}
                      </li>
                    )
                  )
                }
              </ul>
          }

        </form>
        {
          searchTerm.length > 0 &&
            <button
              className="form-search__reset"
              type="reset"
              style={{ display: 'block' }}
              onClick={handleSearchReset}
            >
              <svg width="10" height="10" aria-hidden="true">
                <use xlinkHref="#icon-close"></use>
              </svg>
              <span className="visually-hidden">Сбросить поиск</span>
            </button>
        }
      </div>

      <a className="header__basket-link" href="#">
        <svg width="16" height="16" aria-hidden="true">
          <use xlinkHref="#icon-basket"></use>
        </svg>
      </a>
    </>
  );
}

export default FormSearch;
