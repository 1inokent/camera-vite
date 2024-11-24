import { memo, useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { splitDescription } from '../../utils/utils';

type ProductTabsProps = {
  vendorCode: string;
  category: string;
  type: string;
  level: string;
  description: string;
}

function ProductTabsMemonizated ({ vendorCode, category, type, level, description }: ProductTabsProps): JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();

  const [isOpenDescription, setIsOpenDescription] = useState(false);
  const [isOpenCharacteristics, setIsOpenCharacteristics] = useState(true);

  const { firstSentence, remainingDescription } = splitDescription(description);

  const toggleDescription = useCallback(() => {
    setIsOpenDescription(true);
    setIsOpenCharacteristics(false);
    navigate('#description');
  }, [navigate]);
  const toggleCharacteristics = useCallback(() => {
    setIsOpenCharacteristics(true);
    setIsOpenDescription(false);
    navigate('#characteristics');
  }, [navigate]);

  useEffect(() => {
    const currentHash = location.hash;

    if (currentHash === '#description') {
      setIsOpenDescription(true);
      setIsOpenCharacteristics(false);
    } else if (currentHash === '#characteristics') {
      setIsOpenCharacteristics(true);
      setIsOpenDescription(false);
    }
  }, [location.hash]);

  return (
    <div className="tabs product__tabs">
      <div className="tabs__controls product__tabs-controls">
        <button
          className={`tabs__control ${isOpenCharacteristics ? 'is-active' : ''}`}
          type="button"
          onClick={toggleCharacteristics}
        >
  Характеристики
        </button>
        <button
          className={`tabs__control ${isOpenDescription ? 'is-active' : ''}`}
          type="button"
          onClick={toggleDescription}
        >
    Описание
        </button>
      </div>

      <div className="tabs__content">
        {
          isOpenCharacteristics &&
  <div className={`tabs__element ${isOpenCharacteristics ? 'is-active' : ''}`}>
    <ul className="product__tabs-list">
      <li className="item-list">
        <span className="item-list__title">Артикул:</span>
        <p className="item-list__text"> {vendorCode}</p>
      </li>
      <li className="item-list">
        <span className="item-list__title">Категория:</span>
        <p className="item-list__text">{category}</p>
      </li>
      <li className="item-list">
        <span className="item-list__title">Тип камеры:</span>
        <p className="item-list__text">{type}</p>
      </li>
      <li className="item-list">
        <span className="item-list__title">Уровень:</span>
        <p className="item-list__text">{level}</p>
      </li>
    </ul>
  </div>
        }

        {
          isOpenDescription &&
  <div className={`tabs__element ${isOpenDescription ? 'is-active' : ''}`}>
    <div className="product__tabs-text">
      <p>{firstSentence}</p>
      {remainingDescription && <p>{remainingDescription}</p>}
    </div>
  </div>
        }
      </div>
    </div>
  );
}

const ProductTabsMemo = memo(ProductTabsMemonizated);

export default ProductTabsMemo;
