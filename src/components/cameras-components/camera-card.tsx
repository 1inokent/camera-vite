import { useState } from 'react';
import { Camera } from '../../types/cameras-types/cameras-types';

import Rating from '../rating/rating';
import ContactMePopup from '../popups/contact-me-popup';

import { formattedPrice } from '../../utils';

type CameraCardProps = {
  camera: Camera;
}

function CameraCard({camera}: CameraCardProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

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
    <div className="product-card">
      <div className="product-card__img">
        <picture>
          <source type="image/webp" srcSet={`${previewImgWebp}, ${previewImgWebp2x}`} />
          <img
            src={previewImg}
            srcSet={previewImg2x}
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

        <p className="product-card__title">
          {correctName}
        </p>

        <p className="product-card__price">
          <span className="visually-hidden">Цена:</span>
          {formattedPrice(price)} ₽
        </p>
      </div>

      <div className="product-card__buttons">
        <button
          className="btn btn--purple product-card__btn"
          type="button"
          onClick={togglePopup}
        >
          Купить
        </button>
        <a className="btn btn--transparent" href="#">Подробнее
        </a>
      </div>
      {isOpen && <ContactMePopup content={camera} onClose={togglePopup} />}
    </div>
  );
}

export default CameraCard;
