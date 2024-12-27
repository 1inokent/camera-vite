import { useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hook';
import { sendCouponAction } from '../../store/slices/cupon-slice/cupon-slice';
import { clearError } from '../../store/slices/error-slice/error-slice';

import classNames from 'classnames';

function BasketPromo(): JSX.Element {
  const dispatch = useAppDispatch();
  const {discount, loading} = useAppSelector((state) => state.coupon);
  const errorMessage = useAppSelector((state) => state.error.message);

  const [promoCode, setPromoCode] = useState('');

  const inputClassName = classNames('custom-input', {
    'is-invalid': !!errorMessage,
    'is-valid': discount !== null && !errorMessage,
  });

  const handlerInputChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setPromoCode(evt.target.value);
  };

  const handlerSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    dispatch(clearError());

    try {
      await dispatch(sendCouponAction(promoCode.trim())).unwrap();
      setPromoCode('');
    } catch {
      return errorMessage;
    }
  };

  return (
    <div className="basket__promo">
      <p className="title title--h4">Если у вас есть промокод на скидку, примените его в этом поле</p>
      <div className="basket-form">
        <form
          action="#"
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={handlerSubmit}
        >
          <div className={inputClassName}>
            <label><span className="custom-input__label">Промокод</span>
              <input
                type="text"
                name="promo"
                placeholder="Введите промокод"
                onChange={handlerInputChange}
                disabled={loading}
              />
            </label>
            {errorMessage && <p className="custom-input__error">Промокод неверный</p>}
            {!errorMessage && discount !== null && (
              <p className="custom-input__success">Промокод принят!</p>
            )}
          </div>
          <button
            className="btn"
            type="submit"
            disabled={promoCode.trim() === ''}
          >
            {loading ? 'Применяем...' : 'Применить'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default BasketPromo;
