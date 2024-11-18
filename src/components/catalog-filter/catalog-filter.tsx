import { useEffect, useState } from 'react';
import { Filters } from '../../types/filters-types/filter-types';
import { CameraCategory } from '../../types/cameras-types/cameras-types';

type CatalogFilterProps = {
  onFilterChange: (filters: Filters) => void;
  maxPrice?: number;
  minPrice?: number;
}

function CatalogFilter({ onFilterChange, maxPrice, minPrice }: CatalogFilterProps): JSX.Element {
  const [priceFrom, setPriceFrom] = useState<string | number>(minPrice || '');
  const [priceTo, setPriceTo] = useState<string | number>(maxPrice || '');
  const [category, setCategory] = useState<CameraCategory | ''>('');
  const [categoryChecked, setCategoryChecked] = useState<boolean>(false);
  const [cameraType, setCameraType] = useState<string[]>([]);
  const [cameraLevel, setCameraLevel] = useState<string[]>([]);

  useEffect(() => {
    onFilterChange({
      minPrice: priceFrom ? Number(priceFrom) : undefined,
      maxPrice: priceTo ? Number(priceTo) : undefined,
      category: category || undefined,
      cameraType: cameraType.length > 0 ? cameraType : undefined,
      level: cameraLevel.length > 0 ? cameraLevel : undefined,
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cameraLevel, cameraType, category, priceFrom, priceTo, maxPrice, minPrice]);

  const handlePriceFromChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setPriceFrom(evt.target.value);
  };

  const handlePriceToChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setPriceTo(evt.target.value);
  };

  const handlePriceFromBlur = () => {
    const fromValue = Number(priceFrom);

    if (minPrice !== undefined && maxPrice !== undefined) {
      if (fromValue < minPrice || isNaN(fromValue)) {
        setPriceFrom(minPrice);
      } else if (fromValue > maxPrice || fromValue > Number(priceTo)) {
        setPriceFrom(minPrice);
      }
    }
  };

  const handlePriceToBlur = () => {
    const toValue = Number(priceTo);

    if (minPrice !== undefined && maxPrice !== undefined) {
      if (toValue < minPrice || toValue < Number(priceFrom)) {
        setPriceTo(maxPrice);
      } else if (toValue > maxPrice || isNaN(toValue)) {
        setPriceTo(maxPrice);
      }
    }
  };

  const handleCategoryChange = (newCategory: 'Видеокамера' | 'Фотоаппарат') => {
    if (category === newCategory && categoryChecked) {
      setCategory('');
      setCategoryChecked(false);
      setCameraType([]);
    } else {
      setCategory(newCategory);
      setCategoryChecked(true);
      setCameraType(newCategory === 'Видеокамера'
        ? cameraType.filter((type) => type !== 'Моментальная' && type !== 'Плёночная')
        : cameraType);
    }
  };

  const handleTypeChange = (type: string) => {
    const updatedTypes = cameraType.includes(type)
      ? cameraType.filter((t) => t !== type)
      : [...cameraType, type];
    setCameraType(updatedTypes);
    // updateFilters();
  };

  const handleLevelChange = (level: string) => {
    const updatedLevels = cameraLevel.includes(level)
      ? cameraLevel.filter((productLevel) => productLevel !== level)
      : [...cameraLevel, level];

    setCameraLevel(updatedLevels);
  };

  const resetFilters = () => {
    setPriceFrom('');
    setPriceTo('');
    setCategory('');
    setCameraType([]);
    setCameraLevel([]);

    onFilterChange({
      minPrice: undefined,
      maxPrice: undefined,
      category: undefined,
      cameraType: undefined,
      level: undefined
    });
  };

  return (
    <div className="catalog-filter">
      <form action="#">
        <h2 className="visually-hidden">Фильтр</h2>
        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Цена, ₽</legend>
          <div className="catalog-filter__price-range">
            <div className="custom-input">
              <label>
                <input
                  type="number"
                  name="price"
                  onChange={handlePriceFromChange}
                  onBlur={handlePriceFromBlur}
                  value={priceFrom}
                  placeholder={minPrice ? minPrice.toString() : ''}
                />
              </label>
            </div>
            <div className="custom-input">
              <label>
                <input
                  type="number"
                  name="priceUp"
                  onChange={handlePriceToChange}
                  onBlur={handlePriceToBlur}
                  value={priceTo}
                  placeholder={maxPrice ? maxPrice.toString() : ''}
                />
              </label>
            </div>
          </div>
        </fieldset>

        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Категория</legend>
          <div className="custom-radio catalog-filter__item">
            <label>
              <input
                type="radio"
                name="category"
                value="Фотоаппарат"
                onChange={() => handleCategoryChange('Фотоаппарат')}
                checked={category === 'Фотоаппарат'}
              />
              <span className="custom-radio__icon"></span>
              <span className="custom-radio__label">Фотоаппарат</span>
            </label>
          </div>
          <div className="custom-radio catalog-filter__item">
            <label>
              <input
                type="radio"
                name="category"
                value='Видеокамера'
                onChange={() => handleCategoryChange('Видеокамера')}
                checked={category === 'Видеокамера'}
              />
              <span className="custom-radio__icon"></span>
              <span className="custom-radio__label">Видеокамера</span>
            </label>
          </div>
        </fieldset>

        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Тип камеры</legend>
          {['Цифровая', 'Плёночная', 'Моментальная', 'Коллекционная'].map((type) => (
            <div key={type} className="custom-checkbox catalog-filter__item">
              <label>
                <input
                  type="checkbox"
                  name={type}
                  checked={cameraType.includes(type)}
                  disabled={category === 'Видеокамера' && (type === 'Плёночная' || type === 'Моментальная')}
                  onChange={() => handleTypeChange(type)}
                />
                <span className="custom-checkbox__icon"></span>
                <span className="custom-checkbox__label">{type}</span>
              </label>
            </div>
          ))}
        </fieldset>

        <fieldset className="catalog-filter__block">
          <legend className="title title--h5">Уровень</legend>
          {['Нулевой', 'Любительский', 'Профессиональный'].map((level) => (
            <div key={level} className="custom-checkbox catalog-filter__item">
              <label>
                <input
                  type="checkbox"
                  name={level}
                  checked={cameraLevel.includes(level)}
                  onChange={() => handleLevelChange(level)}
                />
                <span className="custom-checkbox__icon"></span>
                <span className="custom-checkbox__label">{level}</span>
              </label>
            </div>
          ))}
        </fieldset>

        <button
          className="btn catalog-filter__reset-btn"
          type="reset"
          onClick={resetFilters}
        >
          Сбросить фильтры
        </button>
      </form>
    </div>
  );
}

export default CatalogFilter;
