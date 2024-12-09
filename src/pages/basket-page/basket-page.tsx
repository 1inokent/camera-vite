import { useAppDispatch, useAppSelector } from '../../store/hook';

import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';

import { formatPrice } from '../../utils/utils';
import { AppRoute, PageNames } from '../../const';
import { Link } from 'react-router-dom';
import { clearBasket, updateQuantity } from '../../store/slices/basket-slice/basket-slice';
import Popup from '../../components/popups/popup';
import { useState } from 'react';

function BasketPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const { basketItems } = useAppSelector((state) => state.basket);
  const errorMessage = useAppSelector((state) => state.error.message);

  const [isOpen, setIsOpen] = useState(false);

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
    setIsOpen(!isOpen);
    dispatch(clearBasket(id));
  };

  const togglePopup = () => {
    setIsOpen(!isOpen);
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

  const totalPrice = basketItems.reduce((accumulator, currentItem) => {
    const priceCameras = currentItem.price * currentItem.quantity;
    return accumulator + priceCameras;
  }, 0);

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
                      <h4 style={{ color: 'blue', textDecoration: 'underline'}}>Вернуться в каталог</h4>
                    </Link>
                  </div> :
                  <ul className="basket__list">
                    {
                      basketItems.map((basketItem) => {
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
                          price,
                          quantity
                        } = basketItem;
                        const correctName = id === 1 ? name : `${category} ${name}`;
                        const priceSelectedCamera = quantity * price;

                        return (
                          <>
                            <li className='basket-item' key={id}>
                              <div className="basket-item__img">
                                <picture>
                                  <source
                                    type="image/webp"
                                    srcSet={`/${previewImgWebp}, /${previewImgWebp2x}`}
                                  />
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
                                <p className="basket-item__title">{correctName}</p>
                                <ul className="basket-item__list">
                                  <li className="basket-item__list-item">
                                    <span className="basket-item__article">Артикул:</span>
                                    <span className="basket-item__number">{vendorCode}</span>
                                  </li>
                                  <li className="basket-item__list-item">{type} {category}</li>
                                  <li className="basket-item__list-item">{level} уровень</li>
                                </ul>
                              </div>
                              <p className="basket-item__price">
                                <span className="visually-hidden">Цена:</span>
                                {formatPrice(price)} ₽
                              </p>

                              <div className="quantity">
                                <button
                                  className="btn-icon btn-icon--prev"
                                  aria-label="уменьшить количество товара"
                                  onClick={() => handleDecreaseQuantity(id, quantity)}
                                  disabled={quantity === 1}
                                >
                                  <svg width="7" height="12" aria-hidden="true">
                                    <use xlinkHref="#icon-arrow"></use>
                                  </svg>
                                </button>
                                <label className="visually-hidden" htmlFor="counter1"></label>
                                <input
                                  type="number"
                                  id={`counter-${id}`}
                                  value={quantity}
                                  min="1" max="99"
                                  aria-label="количество товара"
                                  onChange={(e) => handleInputChange(id, e.target.value)}
                                />
                                <button
                                  className="btn-icon btn-icon--next"
                                  aria-label="увеличить количество товара"
                                  onClick={() => handleIncreaseQuantity(id, quantity)}
                                  disabled={quantity === 9}
                                >
                                  <svg width="7" height="12" aria-hidden="true">
                                    <use xlinkHref="#icon-arrow"></use>
                                  </svg>
                                </button>
                              </div>

                              <div className="basket-item__total-price">
                                <span className="visually-hidden">Общая цена:</span>
                                {formatPrice(priceSelectedCamera)} ₽
                              </div>
                              <button
                                className="cross-btn"
                                type="button"
                                aria-label="Удалить товар"
                                onClick={togglePopup}
                              >
                                <svg width="10" height="10" aria-hidden="true">
                                  <use xlinkHref="#icon-close"></use>
                                </svg>
                              </button>
                            </li>

                            {
                              isOpen &&
                            <Popup
                              camera={basketItem}
                              onClose={togglePopup}
                              removeItem={() => handleClearBasket(basketItem.id)}
                              basketPage
                            />
                            }
                          </>);
                      }
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

                <div className="basket__summary-order">
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
                </div>

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
