import { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { useNavigate } from 'react-router-dom';

import { useAppSelector } from '../../store/hook';

import AddItemPopup from './catalog-add-item/catalog-add-item';
import AddItemSuccess from './catalog-add-item/add-item-success';
import BasketRemoveItem from './basket-remove-item/basket-remove-item';
import BasketSendSuccess from './basket-send-success/basket-send-success';
import FormReview from './form-review/form-review';

import { Camera } from '../../types/cameras-types/cameras-types';
import { isCameraInArray } from '../../utils/utils';
import { AppRoute } from '../../const';
import FormReviewSuccess from './form-review/form-review-success';

type ContactMePopupProps = {
  camera?: Camera;
  basketPageFlag?: boolean;
  orderSuccess?: boolean;
  addReview?: boolean;
  onClose: () => void;
  removeItem?: () => void;
}

function Popup({camera, onClose, removeItem, basketPageFlag, orderSuccess, addReview}: ContactMePopupProps):JSX.Element {
  const navigate = useNavigate();
  const modalRef = useRef<HTMLDivElement>(null);
  const basketItems = useAppSelector((state) => state.basket.basketItems);

  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [showReviewSuccess, setShowReviewSuccess] = useState(false);
  const isInBasket = camera ? isCameraInArray(camera.id, basketItems) : false;

  useEffect(() => {
    const handleEscape = (evt: KeyboardEvent) => {
      if (evt.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'auto';
    };
  }, [onClose]);

  useEffect(() => {
    const focusableElements = modalRef.current?.querySelectorAll<HTMLElement>(
      'button, input, [href], [tabindex]:not([tabindex="-1"]), textarea'
    );
    const firstElement = focusableElements?.[0];
    const lastElement = focusableElements?.[focusableElements.length - 1];

    if (firstElement) {
      firstElement.focus();
    }

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
  }, [addReview, showReviewSuccess, showSuccessPopup, orderSuccess]);

  const handlerContinueShopping = () => {
    onClose();
    if (orderSuccess) {
      navigate(AppRoute.CatalogPage);
    }
  };

  const handleShowReviewSuccess = () => {
    setShowReviewSuccess(!showReviewSuccess);
  };

  return ReactDOM.createPortal(
    <div
      className={`modal is-active ${showSuccessPopup && !basketPageFlag || showReviewSuccess || orderSuccess ? 'modal--narrow' : ''}`}
      ref={modalRef}
    >
      <div className="modal__wrapper" role="dialog" aria-modal="true">
        <div
          className="modal__overlay"
          role="presentation"
          onClick={() => handlerContinueShopping()}
        >
        </div>
        <div className="modal__content">
          {
            !basketPageFlag && !showSuccessPopup && camera && (
              <AddItemPopup
                camera={camera}
                onClose={onClose}
                onSuccess={() => setShowSuccessPopup(true)}
              />
            )
          }
          {
            showSuccessPopup && !basketPageFlag && (
              <AddItemSuccess onClose={onClose} />
            )
          }
          {
            basketPageFlag && isInBasket && !orderSuccess && camera && (
              <BasketRemoveItem
                camera={camera} onClose={onClose} removeItem={removeItem} basketItems={basketItems}
              />
            )
          }
          {
            orderSuccess && (
              <BasketSendSuccess onContinueShopping={handlerContinueShopping} />
            )
          }
          {
            addReview && !showReviewSuccess && (
              <FormReview onClose={onClose} onShowReviewSucces={handleShowReviewSuccess} />
            )
          }
          {
            showReviewSuccess && (
              <FormReviewSuccess onClose={onClose} />
            )
          }
        </div>
      </div>
    </div>,
    document.body
  );
}

export default Popup;
