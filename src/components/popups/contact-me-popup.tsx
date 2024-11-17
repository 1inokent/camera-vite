import { useEffect, useRef } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { formattedPrice, standardizePhoneNumber } from '../../utils/utils';

import { useAppDispatch } from '../../store/hook';
import { sendOrderCameraAction } from '../../store/slices/camera-slice/camera-slice';

import { useHookFormMask } from 'use-mask-input';
import { Camera } from '../../types/cameras-types/cameras-types';
import { PHONE_REGULAR_EXPRESSION } from '../../const';

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

  const {register, setFocus, handleSubmit, formState: { errors }} = useForm<PopupInputProps>();
  const registerWithMask = useHookFormMask(register);

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

  const onSubmit: SubmitHandler<PopupInputProps> = (data) => {
    const standardizedPhone = standardizePhoneNumber(data.userTel);
    const arrayId = [Number(id)];

    dispatch(sendOrderCameraAction({camerasIds: arrayId, tel: standardizedPhone }));
    onClose();
  };

  return (
    <div className="modal is-active" ref={modalRef}>
      <div className="modal__wrapper" role='popupName'>
        <div className="modal__overlay" onClick={onClose} role="presentation"></div>
        <div className="modal__content">
          <p className="title title--h4">Свяжитесь со мной</p>

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
                {formattedPrice(price)} ₽
              </p>
            </div>
          </div>

          <form
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="custom-input form-review__item">
              <label>
                <span className="custom-input__label">Телефон
                  <svg width="9" height="9" aria-hidden="true">
                    <use xlinkHref="#icon-snowflake"></use>
                  </svg>
                </span>
                <input
                  id='userTel'
                  type="tel"
                  placeholder="Введите ваш номер"
                  {...registerWithMask('userTel', '+7(999)999-99-99', {
                    required: 'Нужно указать номер',
                    pattern: {
                      value: PHONE_REGULAR_EXPRESSION,
                      message: 'Телефон в формате +7(9XX)XXX-XX-XX',
                    }
                  })}
                />
                {errors.userTel && (
                  <p className="custom-input__error" style={{ opacity: 1 }}>{errors.userTel.message}</p>
                )}
              </label>
            </div>

            <div className="modal__buttons" >
              <button className="btn btn--purple modal__btn modal__btn--fit-width" type="submit">
                <svg width="24" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-add-basket"></use>
                </svg>Заказать
              </button>
            </div>
          </form>

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
