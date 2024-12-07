import { useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';

import { formatPrice } from '../../utils/utils';

import { useAppDispatch } from '../../store/hook';

import { Camera } from '../../types/cameras-types/cameras-types';
import { addToBasket } from '../../store/slices/basket-slice/basket-slice';

type ContactMePopupProps = {
  content: Camera;
  onClose: () => void;
}

type PopupInputProps = {
  userTel: string;
}

function ContactMePopup({content, onClose}: ContactMePopupProps):JSX.Element {
  const dispatch = useAppDispatch();
  const modalRef = useRef<HTMLDivElement>(null);

  const { setFocus } = useForm<PopupInputProps>();

  useEffect(() => {
    const handleEscape = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    setFocus('userTel');
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto';
    };
  }, [onClose, setFocus]);

  useEffect(() => {
    const focusableElements = modalRef.current?.querySelectorAll<HTMLElement>(
      'button, input, [href], [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements?.[0];
    const lastElement = focusableElements?.[focusableElements.length - 1];

    const handleTabKey = (event: KeyboardEvent) => {
      if (!focusableElements || focusableElements.length === 0) {
        return;
      }

      if (event.key === 'Tab') {
        if (event.shiftKey && document.activeElement === firstElement) {
          lastElement?.focus();
          event.preventDefault();
        } else if (!event.shiftKey && document.activeElement === lastElement) {
          firstElement?.focus();
          event.preventDefault();
        }
      }
    };

    window.addEventListener('keydown', handleTabKey);

    return () => {
      window.removeEventListener('keydown', handleTabKey);
    };
  }, []);

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
  } = content;

  const correctName = id === 1 ? name : `${category} ${name}`;

  const handleAddToBasket = () => {
    dispatch(addToBasket(content));
  };

  return (
    <div className="modal is-active" ref={modalRef}>
      <div className="modal__wrapper" role='popupName'>
        <div className="modal__overlay" onClick={onClose} role="presentation"></div>
        <div className="modal__content">
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
              onClick={handleAddToBasket}
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
        </div>
      </div>
    </div>
  );
}

export default ContactMePopup;
