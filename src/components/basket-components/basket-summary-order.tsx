import { useAppDispatch, useAppSelector } from '../../store/hook';
import { clearBasket, sendOrderAction, setBasketSendLoader, } from '../../store/slices/basket-slice/basket-slice';
import { clearError, setError } from '../../store/slices/error-slice/error-slice';
import { BasketItems } from '../../types/basket-types/basket-types';
import { calculateTotalPrice, calculateTotalQuantity, calculateDiscountPercentage } from '../../utils/basket-utils';
import { formatPrice } from '../../utils/utils';

type BasketSummaryOrderProps = {
  basketItems: BasketItems;
  orderSuccess: () => void;
  loading: boolean;
}

function BasketSummaryOrder({ basketItems, orderSuccess, loading }: BasketSummaryOrderProps): JSX.Element {
  const dispatch = useAppDispatch();
  const errorMessage = useAppSelector((state) => state.error.message);

  const totalPrice = calculateTotalPrice(basketItems);
  const totalQuantity = calculateTotalQuantity(basketItems);
  const discountPercentage = calculateDiscountPercentage(totalQuantity, totalPrice);
  const discountAmount = (totalPrice * discountPercentage) / 100;
  const finalPrice = totalPrice - discountAmount;

  const handleOrder = async () => {
    dispatch(setBasketSendLoader(true));
    dispatch(clearError());

    try {
      const orderData = {
        camerasIds: basketItems.map((item) => item.id),
        coupon: null,
      };
      await dispatch(sendOrderAction(orderData)).unwrap();
      orderSuccess();
      dispatch(clearBasket());
    } catch (err) {
      const errMessage = typeof err === 'string' ? err : 'Ошибка отправки камер';
      dispatch(setError(errMessage));
    } finally {
      dispatch(setBasketSendLoader(false));
    }
  };

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
            ${discountAmount > 0 ? 'basket__summary-value--bonus' : ''}`
          }
        >
          {formatPrice(discountAmount)} ₽
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
          void handleOrder();
        }}
      >
        {loading ? 'Отправка...' : 'Оформить заказ'}
      </button>

      {errorMessage && <h3>{errorMessage}</h3>}
    </div>
  );
}

export default BasketSummaryOrder;


