import { BasketItems } from '../types/basket-types/basket-types';

const calculateTotalPrice = (basketItems: BasketItems): number =>
  basketItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

const calculateTotalQuantity = (basketItems: BasketItems): number =>
  basketItems.reduce((acc, item) => acc + item.quantity, 0);

const calculateDiscountPercentage = (
  totalQuantity: number,
  totalPrice: number
): number => {
  let discount = 0;

  if (totalQuantity === 2) {
    discount = 3;
  } else if (totalQuantity >= 3 && totalQuantity <= 5) {
    discount = 5;
  } else if (totalQuantity >= 6 && totalQuantity <= 10) {
    discount = 10;
  } else if (totalQuantity > 10) {
    discount = 15;
  }

  if (totalPrice >= 10000 && totalPrice < 20000) {
    discount -= 1;
  } else if (totalPrice >= 20000 && totalPrice < 30000) {
    discount -= 2;
  } else if (totalPrice >= 30000) {
    discount -= 3;
  }

  return Math.max(discount, 0);
};

export {
  calculateDiscountPercentage,
  calculateTotalPrice,
  calculateTotalQuantity,
};
