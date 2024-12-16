import { BasketItems } from '../../types/basket-types/basket-types';
import { calculateTotalPrice, calculateTotalQuantity, calculateDiscountPercentage } from '../../utils/basket-utils';
import { formatPrice } from '../../utils/utils';

type BasketSummaryOrderProps = {
  basketItems: BasketItems;
}

function BasketSummaryOrder({ basketItems }: BasketSummaryOrderProps): JSX.Element {
  const totalPrice = calculateTotalPrice(basketItems);
  const totalQuantity = calculateTotalQuantity(basketItems);
  const discountPercentage = calculateDiscountPercentage(totalQuantity, totalPrice);
  const discountAmount = (totalPrice * discountPercentage) / 100;
  const finalPrice = totalPrice - discountAmount;

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
        >К оплате:
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
      >
                  Оформить заказ
      </button>
    </div>
  );
}

export default BasketSummaryOrder;
