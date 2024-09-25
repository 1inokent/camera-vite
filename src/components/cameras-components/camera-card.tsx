import { Camera } from '../../types/cameras-types/cameras-types';
import { formattedPrice } from '../../utils';
import Rating from '../rating/rating';

type CameraCardProps = {
  camera: Camera;
}

function CameraCard({camera}: CameraCardProps): JSX.Element {
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
            alt={name}
          />
        </picture>
      </div>

      <div
        className="product-card__info"
        style={{ display: 'block' }}
      >

        <Rating rating={rating} reviewCount={reviewCount} />

        <p className="product-card__title">
          {id === 1 ? name : `${category} ${name}`}
        </p>

        <p className="product-card__price">
          <span className="visually-hidden">Цена:</span>
          {formattedPrice(price)} ₽
        </p>
      </div>

      <div className="product-card__buttons">
        <button className="btn btn--purple product-card__btn" type="button">Купить
        </button>
        <a className="btn btn--transparent" href="#">Подробнее
        </a>
      </div>
    </div>
  );
}

export default CameraCard;
