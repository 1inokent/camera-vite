import React from 'react';
import { Link, generatePath } from 'react-router-dom';

import Popup from '../popups/popup';

import { BasketItem } from '../../types/basket-types/basket-types';

import { AppRoute } from '../../const';
import { formatPrice } from '../../utils/utils';

type BasketCardProps = {
  basketItem: BasketItem;
  onDecreaseQuantity: (id: number, quantity: number) => void;
  onIncreaseQuantity: (id: number, quantity: number) => void;
  onInputChange: (id: number, value: string) => void;
  onClearBasket: (id: number) => void;
  onOpen: () => void;
  onClose: () => void;
  isPopupOpen: boolean;
}

function BasketCard({
  basketItem,
  onDecreaseQuantity,
  onIncreaseQuantity,
  onInputChange,
  onClearBasket,
  onOpen,
  onClose,
  isPopupOpen
}: BasketCardProps): JSX.Element {

  const {
    id,
    previewImgWebp,
    previewImgWebp2x,
    previewImg,
    previewImg2x,
    name,
    category,
    vendorCode,
    type,
    level,
    price,
    quantity
  } = basketItem;

  const correctName = id === 1 ? name : `${category} ${name}`;
  const priceSelectedCamera = quantity * price;

  return (
    <React.Fragment key={id}>
      <li className='basket-item' key={id}>
        <div className="basket-item__img">
          <Link to={generatePath(AppRoute.ProductPage, {id: id.toString()})}>
            <picture>
              <source
                type="image/webp"
                srcSet={`/${previewImgWebp}, /${previewImgWebp2x}`}
              />
              <img
                src={`/${previewImg}`}
                srcSet={`/${previewImg2x}`}
                width="140"
                height="120"
                alt={correctName}
              />
            </picture>
          </Link>
        </div>

        <div className="basket-item__description">
          <p className="basket-item__title">
            <Link to={generatePath(AppRoute.ProductPage, {id: id.toString()})}>
              {correctName}
            </Link>
          </p>
          <ul className="basket-item__list">
            <li className="basket-item__list-item">
              <span className="basket-item__article">Артикул:</span>
              <span className="basket-item__number">{vendorCode}</span>
            </li>
            <li className="basket-item__list-item">{type} {category}</li>
            <li className="basket-item__list-item">{level} уровень</li>
          </ul>
        </div>
        <p className="basket-item__price">
          <span className="visually-hidden">Цена:</span>
          {formatPrice(price)} ₽
        </p>

        <div className="quantity">
          <button
            className="btn-icon btn-icon--prev"
            aria-label="уменьшить количество товара"
            onClick={() => onDecreaseQuantity(id, quantity)}
            disabled={quantity === 1}
          >
            <svg width="7" height="12" aria-hidden="true">
              <use xlinkHref="#icon-arrow"></use>
            </svg>
          </button>
          <label className="visually-hidden" htmlFor="counter1"></label>
          <input
            type="number"
            id={`counter-${id}`}
            value={quantity}
            min="1" max="99"
            aria-label="количество товара"
            onChange={(e) => onInputChange(id, e.target.value)}
          />
          <button
            className="btn-icon btn-icon--next"
            aria-label="увеличить количество товара"
            onClick={() => onIncreaseQuantity(id, quantity)}
            disabled={quantity === 9}
          >
            <svg width="7" height="12" aria-hidden="true">
              <use xlinkHref="#icon-arrow"></use>
            </svg>
          </button>
        </div>

        <div className="basket-item__total-price">
          <span className="visually-hidden">Общая цена:</span>
          {formatPrice(priceSelectedCamera)} ₽
        </div>
        <button
          className="cross-btn"
          type="button"
          aria-label="Удалить товар"
          onClick={onOpen}
        >
          <svg width="10" height="10" aria-hidden="true">
            <use xlinkHref="#icon-close"></use>
          </svg>
        </button>
      </li>

      {
        isPopupOpen &&
        <Popup
          camera={basketItem}
          onClose={onClose}
          removeItem={() => onClearBasket(basketItem.id)}
          basketPageFlag
        />
      }
    </React.Fragment>);
}

export default BasketCard;
