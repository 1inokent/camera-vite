import { useState } from 'react';
import { generatePath, Link } from 'react-router-dom';


import Rating from '../rating/rating';
import Popup from '../popups/popup';

import { Camera } from '../../types/cameras-types/cameras-types';
import { formatPrice, isCameraInArray } from '../../utils/utils';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../store/hook';

type CameraCardProps = {
  camera: Camera;
  isActive?: boolean;
}

function CameraCard({camera, isActive = false}: CameraCardProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const { basketItems } = useAppSelector((state) => state.basket);

  const basketItemsQuantity = camera ? isCameraInArray(camera.id, basketItems) : 0;

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const {
    id,
    previewImgWebp,
    previewImgWebp2x,
    previewImg,
    previewImg2x,
    category,
    name,
    rating,
    reviewCount,
    price
  } = camera;

  const correctName = id === 1 ? name : `${category} ${name}`;

  return (
    <div className={`product-card ${isActive ? 'is-active' : ''}`} role='cardWrapper'>
      <div className="product-card__img">
        <picture>
          <source type="image/webp" srcSet={`/${previewImgWebp}, ${previewImgWebp2x}`} />
          <img
            src={`/${previewImg}`}
            srcSet={`/${previewImg2x}`}
            width="280"
            height="240"
            alt={correctName}
          />
        </picture>
      </div>

      <div
        className="product-card__info"
        style={{ display: 'block' }}
      >

        <Rating rating={rating} reviewCount={reviewCount} />

        <p className="product-card__title" role='name'>
          {correctName}
        </p>

        <p className="product-card__price" role='price'>
          <span className="visually-hidden">Цена:</span>
          {formatPrice(price)} ₽
        </p>
      </div>

      <div className="product-card__buttons">
        {
          basketItemsQuantity >= 1 ?
            <div className="product-card__buttons">
              <Link
                className="btn btn--purple-border product-card__btn product-card__btn--in-cart"
                to={AppRoute.BasketPage}
              >
                <svg width="16" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-basket"></use>
                </svg>
                В корзине
              </Link>
            </div> :
            <button
              className="btn btn--purple product-card__btn"
              role='button'
              type="button"
              onClick={togglePopup}
            >
          Купить
            </button>
        }
        <Link className="btn btn--transparent" to={generatePath(AppRoute.ProductPage, {id: id.toString()})}>
        Подробнее
        </Link>
      </div>
      {isOpen && <Popup camera={camera} onClose={togglePopup} />}
    </div>
  );
}

export default CameraCard;
