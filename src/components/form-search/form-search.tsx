import { useEffect, useRef, useState } from 'react';
import { generatePath, useNavigate } from 'react-router-dom';

import { useAppSelector } from '../../store/hook';

import { Cameras } from '../../types/cameras-types/cameras-types';
import { AppRoute } from '../../const';
import { normalizeText } from '../../utils/utils';

function FormSearch(): JSX.Element {
  const products = useAppSelector((state) => state.cameras.cameras);
  const navigate = useNavigate();
  const listRef = useRef<HTMLUListElement | null>(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Cameras>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  useEffect(() => {
    const handleClickOutside = (evt: MouseEvent) => {
      const target = evt.target as HTMLElement;
      if (!target.closest('.form-search')) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (listRef.current && selectedIndex >= 0) {
      const selectedItem = listRef.current.children[selectedIndex] as HTMLElement;
      selectedItem.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }, [selectedIndex]);

  const updateFilteredProducts = (query: string) => {
    const normalizedQuery = normalizeText(query);
    const result = products.filter((product) =>
      normalizeText(product.name).includes(normalizedQuery)
    );

    setFilteredProducts(result);
    setShowDropdown(result.length > 0);
    setSelectedIndex(-1);
  };

  const resetSearch = () => {
    setFilteredProducts([]);
    setShowDropdown(false);
    setSelectedIndex(-1);
  };

  const handleInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const query = evt.target.value;
    setSearchTerm(query);

    if (query.length >= 3) {
      updateFilteredProducts(query);
    } else {
      resetSearch();
    }
  };


  const handleProductSelect = (productId: number) => {
    const path = generatePath(AppRoute.ProductPage, { id: productId.toString() });
    navigate(path);
  };

  const handleSearchReset = () => {
    setSearchTerm('');
    resetSearch();
  };

  const handleKeyDown = (evt: React.KeyboardEvent<HTMLElement>) => {
    if (!showDropdown || filteredProducts.length === 0) {
      return;
    }

    switch (evt.key) {
      case 'ArrowDown':
        evt.preventDefault();
        setSelectedIndex((prevIndex) => (prevIndex < filteredProducts.length - 1 ? prevIndex + 1 : prevIndex));
        break;
      case 'ArrowUp':
        evt.preventDefault();
        setSelectedIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : prevIndex));
        break;
      case 'Tab':
        evt.preventDefault();
        setSelectedIndex((prevIndex) => (prevIndex < filteredProducts.length - 1 ? prevIndex + 1 : prevIndex));
        break;
      case 'Enter':
        if (selectedIndex >= 0) {
          evt.preventDefault();
          handleProductSelect(filteredProducts[selectedIndex].id);
        }
        break;
      case 'Escape':
        resetSearch();
        setShowDropdown(false);
        setSearchTerm('');
        break;
    }
  };

  const renderDropdownItems = () => filteredProducts.map((product, index) => (
    <li
      key={product.id}
      className="form-search__select-item"
      style={{
        backgroundColor: selectedIndex === index ? '#7575e2' : '',
        color: selectedIndex === index ? '#fff' : '#333333',
      }}
      tabIndex={0}
      onClick={() => handleProductSelect(product.id)}
      onFocus={() => setSelectedIndex(index)}
    >
      {product.name}
    </li>
  ));

  return (
    <div className="form-search">
      <form onKeyDown={handleKeyDown}>

        <label>
          <svg className="form-search__icon" width="16" height="16" aria-hidden="true">
            <use xlinkHref="#icon-lens"></use>
          </svg>
          <input
            className="form-search__input"
            type="text"
            autoComplete="off"
            placeholder="Поиск по сайту"
            value={searchTerm}
            onChange={handleInputChange}
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
                ref={listRef}
              >
                {renderDropdownItems()}
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
  );
}

export default FormSearch;
