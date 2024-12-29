import { useAppDispatch } from '../../../store/hook';
import { addToBasket } from '../../../store/slices/basket-slice/basket-slice';
import { Camera } from '../../../types/cameras-types/cameras-types';
import { formatPrice } from '../../../utils/utils';

type AddItemPopupProps = {
  camera: Camera;
  onClose: () => void;
  onSuccess?: () => void;
}

function AddItemPopup({camera, onClose, onSuccess}: AddItemPopupProps): JSX.Element {
  const dispatch = useAppDispatch();

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
    price
  } = camera;

  const correctName = id === 1 ? name : `${category} ${name}`;

  const handlerAddToBasket = () => {
    dispatch(addToBasket(camera));
    if (onSuccess) {
      onSuccess();
    }
  };

  return (
    <>
      <p className="title title--h4">Добавить товар в корзину</p>

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
          <p className="basket-item__price">
            <span className="visually-hidden">Цена:</span>
            {formatPrice(price)} ₽
          </p>
        </div>
      </div>

      <div className="modal__buttons">
        <button
          className="btn btn--purple modal__btn modal__btn--fit-width"
          type="submit"
          onClick={handlerAddToBasket}
        >
          <svg width="24" height="16" aria-hidden="true">
            <use xlinkHref="#icon-add-basket"></use>
          </svg>
      Добавить в корзину
        </button>
      </div>

      <button
        className="cross-btn"
        type="button"
        aria-label="Закрыть попап"
        onClick={onClose}
      >
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg>
      </button>
    </>
  );
}

export default AddItemPopup;
