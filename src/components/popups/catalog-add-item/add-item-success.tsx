import { useNavigate } from 'react-router-dom';
import { AppRoute } from '../../../const';

type AddItemSuccessProps = {
  onClose: () => void;
}

function AddItemSuccess({onClose}: AddItemSuccessProps):JSX.Element {
  const navigate = useNavigate();

  const handlerContinueShopping = () => {
    navigate(AppRoute.CatalogPage);
    onClose();
  };

  return (
    <>
      <p className="title title--h4">
        Товар успешно добавлен в корзину
      </p>
      <svg className="modal__icon" width="86" height="80" aria-hidden="true">
        <use xlinkHref="#icon-success"></use>
      </svg>

      <div className="modal__buttons">
        <a
          className="btn btn--transparent modal__btn"
          href="#"
          onClick={() => handlerContinueShopping()}
        >
          Продолжить покупки
        </a>

        <button
          className="btn btn--purple modal__btn modal__btn--fit-width"
          onClick={() => navigate(AppRoute.BasketPage)}
        >
          Перейти в корзину
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

export default AddItemSuccess;
