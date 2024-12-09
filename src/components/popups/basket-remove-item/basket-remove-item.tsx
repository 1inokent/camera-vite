import { Camera } from '../../../types/cameras-types/cameras-types';

type BasketRemoveItemProps = {
  camera: Camera;
  onClose: () => void;
  removeItem?: () => void;
}

function BasketRemoveItem({camera, onClose, removeItem}: BasketRemoveItemProps): JSX.Element {
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
  } = camera;

  const correctName = id === 1 ? name : `${category} ${name}`;

  return (
    <>
      <p className="title title--h4">Удалить этот товар?</p>
      <div className="basket-item basket-item--short">
        <div className="basket-item__img">
          <picture>
            <source type="image/webp" srcSet={`/${previewImgWebp}, ${previewImgWebp2x}`} />
            <img
              src={`/${previewImg}`}
              srcSet={`/${previewImg2x}`}
              width="140"
              height="120"
              alt={correctName}
            />
          </picture>
        </div>
        <div className="basket-item__description">
          <p className="basket-item__title">
            {correctName}
          </p>
          <ul className="basket-item__list">
            <li className="basket-item__list-item">
              <span className="basket-item__article">Артикул: </span>
              <span className="basket-item__number">{vendorCode}</span>
            </li>
            <li className="basket-item__list-item">{type} {category}</li>
            <li className="basket-item__list-item">{level} уровень</li>
          </ul>
        </div>
      </div>

      <div className="modal__buttons">
        <button
          className="btn btn--purple modal__btn modal__btn--half-width"
          type="button"
          onClick={removeItem}
        >
            Удалить
        </button>
        <a
          className="btn btn--transparent modal__btn modal__btn--half-width"
          href="#"
          onClick={onClose}
        >
          Продолжить покупки
        </a>
      </div>

      <button className="cross-btn" type="button" aria-label="Закрыть попап">
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg>
      </button>
    </>
  );
}

export default BasketRemoveItem;
