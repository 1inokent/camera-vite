import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../store/hook';

import { clearBasket, updateQuantity } from '../../store/slices/basket-slice/basket-slice';

import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import BasketCard from '../../components/basket-components/basket-card';

// import { formatPrice } from '../../utils/utils';
import { AppRoute, PageNames } from '../../const';
import BasketSummaryOrder from '../../components/basket-components/basket-summary-order';

function BasketPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const { basketItems } = useAppSelector((state) => state.basket);
  const errorMessage = useAppSelector((state) => state.error.message);

  const [openPopupId, setOpenPopupId] = useState<number | null>(null);

  const handleDecreaseQuantity = (id: number, quantity: number) => {
    if (quantity > 1) {
      dispatch(updateQuantity({id, quantity: quantity - 1}));
    }
  };

  const handleIncreaseQuantity = (id: number, quantity: number) => {
    if (quantity < 9) {
      dispatch(updateQuantity({id, quantity: quantity + 1}));
    }
  };

  const handleInputChange = (id: number, value: string) => {
    const parsedValue = parseInt(value, 10);
    if (!isNaN(parsedValue) && parsedValue >= 1 && parsedValue <= 9) {
      dispatch(updateQuantity({ id, quantity: parsedValue }));
    }
  };

  const handleClearBasket = (id: number) => {
    dispatch(clearBasket(id));
    setOpenPopupId(null);
  };

  const handleOpenPopup = (id: number) => {
    setOpenPopupId(id);
  };

  const handleClosePopup = () => {
    setOpenPopupId(null);
  };


  if (errorMessage && !basketItems) {
    return (
      <>
        <h2>{errorMessage}</h2>
        <Link to={AppRoute.CatalogPage}>
          <p style={{ color: 'blue', textDecoration: 'underline'}}>Вернуться на главную</p>
        </Link>
      </>
    );
  }

  // const totalPrice = basketItems.reduce((accumulator, currentItem) => {
  //   const priceCameras = currentItem.price * currentItem.quantity;
  //   return accumulator + priceCameras;
  // }, 0);

  return (
    <div className="wrapper">
      <Header />
      <main>
        <div className="page-content">

          <Breadcrumbs productName={PageNames.Basket} />

          <section className="basket">
            <div className="container">
              <h1 className="title title--h2">Корзина</h1>
              {
                basketItems.length === 0 ?
                  <div style={{ margin: '50px' }}>
                    <h3>В корзине нет товара</h3>
                    <Link to={AppRoute.CatalogPage}>
                      <h4 style={{ color: 'blue', textDecoration: 'underline'}}>
                        Вернуться в каталог
                      </h4>
                    </Link>
                  </div> :
                  <ul className="basket__list">
                    {
                      basketItems.map((basketItem) =>
                        (
                          <BasketCard
                            key={basketItem.id}
                            basketItem={basketItem}
                            onClearBasket={handleClearBasket}
                            onDecreaseQuantity={handleDecreaseQuantity}
                            onIncreaseQuantity={handleIncreaseQuantity}
                            onInputChange={handleInputChange}
                            onOpen={() => handleOpenPopup(basketItem.id)}
                            onClose={handleClosePopup}
                            isPopupOpen={openPopupId === basketItem.id}
                          />
                        )
                      )
                    }
                  </ul>
              }

              <div className="basket__summary">
                <div className="basket__promo">
                  <p className="title title--h4">Если у вас есть промокод на скидку, примените его в этом поле</p>
                  <div className="basket-form">
                    <form action="#">
                      <div className="custom-input">
                        <label><span className="custom-input__label">Промокод</span>
                          <input
                            type="text"
                            name="promo"
                            placeholder="Введите промокод"
                          />
                        </label>
                        <p className="custom-input__error">Промокод неверный</p>
                        <p className="custom-input__success">Промокод принят!</p>
                      </div>
                      <button
                        className="btn"
                        type="submit"
                      >
                      Применить
                      </button>
                    </form>
                  </div>
                </div>
                <BasketSummaryOrder basketItems={basketItems} />
                {/* <div className="basket__summary-order">
                  <p className="basket__summary-item">
                    <span className="basket__summary-text">Всего:</span>
                    <span className="basket__summary-value">{formatPrice(totalPrice)} ₽</span>
                  </p>
                  <p className="basket__summary-item">
                    <span className="basket__summary-text">Скидка:</span>
                    <span className="basket__summary-value basket__summary-value--bonus">0 ₽</span>
                  </p>
                  <p className="basket__summary-item">
                    <span
                      className="basket__summary-text basket__summary-text--total"
                    >К оплате:
                    </span>
                    <span
                      className="basket__summary-value basket__summary-value--total"
                    >{formatPrice(totalPrice)} ₽
                    </span>
                  </p>
                  <button
                    className="btn btn--purple"
                    type="submit"
                    disabled={basketItems.length === 0}
                  >
                  Оформить заказ
                  </button>
                </div> */}

              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default BasketPage;
