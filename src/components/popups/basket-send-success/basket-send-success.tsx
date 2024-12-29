type BasketSendSuccessProps = {
  onContinueShopping: () => void;
}

function BasketSendSuccess({ onContinueShopping }: BasketSendSuccessProps): JSX.Element {
  const handlerContinueShopping = () => {
    onContinueShopping();
  };

  return (
    <>
      <p className="title title--h4">Спасибо за покупку</p>
      <svg className="modal__icon" width="80" height="78" aria-hidden="true">
        <use xlinkHref="#icon-review-success"></use>
      </svg>
      <div className="modal__buttons">
        <button
          className="btn btn--purple modal__btn modal__btn--fit-width"
          type="button"
          onClick={() => handlerContinueShopping()}
        >
            Вернуться к покупкам
        </button>
      </div>
      <button
        className="cross-btn"
        type="button"
        aria-label="Закрыть попап"
        onClick={() => handlerContinueShopping()}
      >
        <svg width="10" height="10" aria-hidden="true">
          <use xlinkHref="#icon-close"></use>
        </svg>
      </button>
    </>
  );
}

export default BasketSendSuccess;
