import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from '../../store/hook';
import { clearBasket, setBasketSendLoader, } from '../../store/slices/basket-slice/basket-slice';
import { clearError, setError } from '../../store/slices/error-slice/error-slice';
import { resetOrderState, sendOrderAction } from '../../store/slices/order-slice/order-slice';
import { clearCoupon } from '../../store/slices/cupon-slice/cupon-slice';

import { BasketItems } from '../../types/basket-types/basket-types';

import { formatPrice } from '../../utils/utils';
import {
  calculateTotalPrice,
  calculateTotalQuantity,
  calculateDiscountPercentage
} from '../../utils/basket-utils';

type BasketSummaryOrderProps = {
  basketItems: BasketItems;
  orderSuccess: () => void;
  loading: boolean;
}

function BasketSummaryOrder({ basketItems, orderSuccess, loading }: BasketSummaryOrderProps): JSX.Element {
  const dispatch = useAppDispatch();
  const couponDiscount = useAppSelector((state) => state.coupon.discount);

  const totalPrice = calculateTotalPrice(basketItems);
  const totalQuantity = calculateTotalQuantity(basketItems);
  const discountPercentage = calculateDiscountPercentage(totalQuantity, totalPrice);
  const discountAmount = (totalPrice * discountPercentage) / 100;

  const promoDiscountAmount = couponDiscount ? (totalPrice * couponDiscount) / 100 : 0;
  const finalDiscountAmount = discountAmount + promoDiscountAmount;
  const finalPrice = totalPrice - finalDiscountAmount;

  const handlerOrder = async () => {
    dispatch(setBasketSendLoader(true));
    dispatch(clearError());

    try {
      const orderData = {
        camerasIds: basketItems.map((item) => item.id),
        coupon: null,
      };
      await dispatch(sendOrderAction(orderData)).unwrap();
      dispatch(clearBasket());
      orderSuccess();
      dispatch(clearCoupon());
    } catch (err) {
      const errMessage = typeof err === 'string' ? err : 'Ошибка отправки камер';
      dispatch(setError(errMessage));
    } finally {
      dispatch(setBasketSendLoader(false));
    }
  };

  useEffect(() => () => {
    dispatch(resetOrderState());
  }, [dispatch]);

  return (
    <div className="basket__summary-order">
      <p className="basket__summary-item">
        <span className="basket__summary-text">Всего:</span>
        <span className="basket__summary-value">{formatPrice(totalPrice)} ₽</span>
      </p>
      <p className="basket__summary-item">
        <span className="basket__summary-text">Скидка:</span>
        <span
          className={
            `basket__summary-value
            ${discountAmount > 0 || couponDiscount ? 'basket__summary-value--bonus' : ''}`
          }
        >
          {formatPrice(finalDiscountAmount)} ₽
        </span>
      </p>
      <p className="basket__summary-item">
        <span
          className="basket__summary-text basket__summary-text--total"
        >
          К оплате:
        </span>
        <span
          className="basket__summary-value basket__summary-value--total"
        >{formatPrice(finalPrice)} ₽
        </span>
      </p>
      <button
        className="btn btn--purple"
        type="submit"
        disabled={basketItems.length === 0}
        onClick={() => {
          void handlerOrder();
        }}
      >
        {loading ? 'Отправка...' : 'Оформить заказ'}
      </button>

    </div>
  );
}

export default BasketSummaryOrder;


