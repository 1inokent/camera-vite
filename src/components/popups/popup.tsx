import { useEffect, useRef, useState } from 'react';

import { Camera } from '../../types/cameras-types/cameras-types';
import AddItemPopup from './catalog-add-item/catalog-add-item';
import { useAppSelector } from '../../store/hook';
import { isCameraInArray } from '../../utils/utils';
import AddItemSuccess from './catalog-add-item/add-item-success';
import BasketRemoveItem from './basket-remove-item/basket-remove-item';

type ContactMePopupProps = {
  camera: Camera;
  basketPageFlag?: boolean;
  onClose: () => void;
  removeItem?: () => void;
}

function Popup({camera, onClose, removeItem, basketPageFlag}: ContactMePopupProps):JSX.Element {
  const modalRef = useRef<HTMLDivElement>(null);
  const basketItems = useAppSelector((state) => state.basket.basketItems);

  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
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
  }, [isInBasket, onClose]);

  return (
    <div
      className={`modal is-active ${showSuccessPopup && !basketPageFlag ? 'modal--narrow' : ''}`}
      ref={modalRef}
    >
      <div className="modal__wrapper" role='popupName'>
        <div className="modal__overlay" onClick={onClose} role="presentation"></div>
        <div className="modal__content">
          {
            !basketPageFlag && !showSuccessPopup && (
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
            basketPageFlag && isInBasket && (
              <BasketRemoveItem camera={camera} onClose={onClose} removeItem={removeItem} />
            )
          }
        </div>
      </div>
    </div>
  );
}

export default Popup;
