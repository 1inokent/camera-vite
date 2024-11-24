import { useState } from 'react';
import { Filters } from '../../types/filters-types/filter-types';
import { CameraCategory } from '../../types/cameras-types/cameras-types';

type CatalogFilterProps = {
  onFilterChange: (filters: Filters) => void;
  filters: Filters;
  maxPrice?: number;
  minPrice?: number;
}

function CatalogFilter({ onFilterChange, filters, minPrice, maxPrice }: CatalogFilterProps): JSX.Element {
  const [priceFrom, setPriceFrom] = useState<number | null>(minPrice || null);
  const [priceTo, setPriceTo] = useState<number | null>(maxPrice || null);
  const [category, setCategory] = useState<CameraCategory | null>(filters.category || null);
  const [categoryChecked, setCategoryChecked] = useState<boolean>(false);
  const [cameraType, setCameraType] = useState<string[]>(filters.cameraType || []);
  const [cameraLevel, setCameraLevel] = useState<string[]>(filters.level || []);

  const handlePriceFromChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(evt.target.value);
    if (isNaN(value)) {
      setPriceFrom(null);
    } else {
      setPriceFrom(value);
    }
  };

  const handlePriceToChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(evt.target.value);
    if (isNaN(value)) {
      setPriceTo(null);
    } else {
      setPriceTo(value);
    }
  };

  const handlePriceFromBlur = () => {
    let value = Number(priceFrom);
    if(isNaN(value)){
      return;
    }

    if (minPrice && value < minPrice) {
      value = minPrice;
      setPriceFrom(minPrice);
    }

    if (minPrice && maxPrice && value > maxPrice){
      value = maxPrice;
      setPriceFrom(maxPrice);
    }

    if (priceTo && value >= Number(priceTo)) {
      value = priceTo;
      setPriceFrom(priceTo);
    }

    onFilterChange({
      minPrice: value,
      maxPrice: priceTo
    } as Filters);
  };

  const handlePriceToBlur = () => {
    let value = Number(priceTo);

    if(isNaN(value)){
      return;
    }

    if (maxPrice && value >= maxPrice) {
      value = maxPrice;
      setPriceTo(maxPrice);
    }

    if (maxPrice && minPrice && value < minPrice){
      value = minPrice;
      setPriceTo(minPrice);
    }

    if (priceFrom && value < Number(priceFrom)) {
      value = priceFrom;
      setPriceTo(priceFrom);
    }

    onFilterChange({
      minPrice: priceFrom,
      maxPrice: value,
    } as Filters);
  };

  const handleCategoryChange = (newCategory: 'Видеокамера' | 'Фотоаппарат') => {
    if (category === newCategory && categoryChecked) {
      setCategory(null);
      setCategoryChecked(false);
      setCameraType([]);
      onFilterChange({
        category: null,
        cameraType: []
      } as Filters);
    } else {
      setCategory(newCategory);
      setCategoryChecked(true);
      setCameraType(newCategory === 'Видеокамера'
        ? cameraType?.filter((type) => type !== 'Моментальная' && type !== 'Плёночная') || null
        : cameraType);

      onFilterChange({
        category: newCategory,
        cameraType: newCategory === 'Видеокамера'
          ? cameraType?.filter((type) => type !== 'Моментальная' && type !== 'Плёночная') || null
          : cameraType
      } as Filters);
    }
  };

  const handleTypeChange = (type: string) => {
    const values = cameraType || [];
    const updatedTypes = values.includes(type)
      ? values.filter((t) => t !== type)
      : [...values, type];
    setCameraType(updatedTypes);
    onFilterChange({
      cameraType: updatedTypes.length > 0 ? updatedTypes : undefined,
    } as Filters);
  };

  const handleLevelChange = (level: string) => {
    const values = cameraLevel || [];
    const updatedLevels = values.includes(level)
      ? values.filter((productLevel) => productLevel !== level)
      : [...values, level];

    setCameraLevel(updatedLevels);
    onFilterChange({
      level: updatedLevels.length > 0 ? updatedLevels : undefined,
    } as Filters);
  };

  const resetFilters = () => {
    setPriceFrom(null);
    setPriceTo(null);
    setCategory(null);
    setCameraType([]);
    setCameraLevel([]);

    onFilterChange({
      minPrice: null,
      maxPrice: null,
      category: null,
      cameraType: [],
      level: []
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
                  value={priceFrom || ''}
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
                  value={priceTo || ''}
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
                  checked={cameraType?.includes(type)}
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
                  checked={cameraLevel?.includes(level)}
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
