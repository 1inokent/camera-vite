import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../store/hook';
import { clearBasket, updateQuantity } from '../../store/slices/basket-slice/basket-slice';

import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import BasketCard from '../../components/basket-components/basket-card';
import BasketSummaryOrder from '../../components/basket-components/basket-summary-order';
import BasketPromo from '../../components/basket-components/basket-promo';
import SpinnerLoader from '../../components/spinner-loader/spinner-loader';

import { AppRoute, PageNames } from '../../const';
import Popup from '../../components/popups/popup';

function BasketPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const basketLoading = useAppSelector((state) => state.basket.loading);
  const promoLoading = useAppSelector((state) => state.coupon.loading);
  const { basketItems } = useAppSelector((state) => state.basket);

  const [openPopupId, setOpenPopupId] = useState<number | null>(null);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const handlerOrderSuccess = () => {
    setOrderSuccess(true);
  };

  const handlerDecreaseQuantity = (id: number, quantity: number) => {
    if (quantity > 1) {
      dispatch(updateQuantity({id, quantity: quantity - 1}));
    }
  };

  const handlerIncreaseQuantity = (id: number, quantity: number) => {
    if (quantity < 9) {
      dispatch(updateQuantity({id, quantity: quantity + 1}));
    }
  };

  const handlerInputChange = (id: number, value: string) => {
    const parsedValue = parseInt(value, 10);
    if (!isNaN(parsedValue) && parsedValue >= 1 && parsedValue <= 9) {
      dispatch(updateQuantity({ id, quantity: parsedValue }));
    }
  };

  const handlerClearBasket = (id: number) => {
    dispatch(clearBasket(id));
    setOpenPopupId(null);
  };

  const handlerOpenPopup = (id: number) => {
    setOpenPopupId(id);
  };

  const handlerClosePopup = () => {
    setOpenPopupId(null);
  };

  if (basketLoading || promoLoading) {
    return <SpinnerLoader />;
  }

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
                            onClearBasket={handlerClearBasket}
                            onDecreaseQuantity={handlerDecreaseQuantity}
                            onIncreaseQuantity={handlerIncreaseQuantity}
                            onInputChange={handlerInputChange}
                            onOpen={() => handlerOpenPopup(basketItem.id)}
                            onClose={handlerClosePopup}
                            isPopupOpen={openPopupId === basketItem.id}
                          />
                        )
                      )
                    }
                  </ul>
              }

              <div className="basket__summary">
                <BasketPromo />
                <BasketSummaryOrder
                  basketItems={basketItems}
                  orderSuccess={handlerOrderSuccess}
                  loading={basketLoading}
                />
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
      {orderSuccess && <Popup orderSuccess onClose={() => setOrderSuccess(false)} />}
    </div>
  );
}

export default BasketPage;
