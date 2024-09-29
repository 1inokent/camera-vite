import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../store/hook';
import { fetchCameraAction } from '../../store/slices/camera-slice';
import { setError } from '../../store/slices/error-slice';

import Rating from '../../components/rating/rating';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import SpinnerLoader from '../../components/spinner-loader/spinner-loader';

import { AppRoute } from '../../const';
import { formattedPrice, splitDescription } from '../../utils';

function ProdutcPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const { camera, error, isLoading } = useAppSelector((state) => state.camera);
  const { id } = useParams<{ id: string }>();

  const [isOpenDescription, setIsOpenDescription] = useState(false);
  const [isOpenCharacteristics, setIsOpenCharacteristics] = useState(true);

  const toggleDescription = () => {
    setIsOpenDescription(true);
    setIsOpenCharacteristics(false);
  };
  const toggleCharacteristics = () => {
    setIsOpenCharacteristics(true);
    setIsOpenDescription(false);
  };

  useEffect(() => {
    const abortController = new AbortController();
    let isMounted = true;

    const fetchData = async () => {
      try {
        if (isMounted) {
          if (id) {
            await dispatch(fetchCameraAction({ signal: abortController.signal, id }));
          }
        }
      } catch (err) {
        if (isMounted) {
          const errMessage = err instanceof Error ? err.message : 'Ошибка загрузки камер';
          dispatch(setError(errMessage));
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
      abortController.abort();
    };
  }, [dispatch, id]);

  if (isLoading || !camera) {
    return <SpinnerLoader />;
  }

  if (error) {
    <>
      <p>{error}</p>
      <Link to={AppRoute.CatalogPage}>
        <p style={{ color: 'blue', textDecoration: 'underline'}}>Нет данных камеры</p>
      </Link>
    </>;
  }

  const {
    previewImg,
    previewImg2x,
    previewImgWebp,
    previewImgWebp2x,
    name,
    category,
    rating,
    reviewCount,
    price,
    vendorCode,
    type,
    level,
    description
  } = camera;

  const correctName = Number(id) === 1 ? name : `${category} ${name}`;
  const { firstSentence, remainingDescription } = splitDescription(description);

  return (
    <div className="wrapper">
      <Header />

      <section className="product">
        <div className="container">
          <div className="product__img">
            <picture>
              <source
                type="image/webp"
                srcSet={`/${previewImgWebp}, ${previewImgWebp2x}`}
              />
              <img
                src={`/${previewImg}`}
                srcSet={`/${previewImg2x}`}
                width="560"
                height="480"
                alt={name}
              />
            </picture>
          </div>
          <div className="product__content">
            <h1 className="title title--h3">{correctName}</h1>

            <Rating rating={rating} reviewCount={reviewCount} />

            <p className="product__price"><span className="visually-hidden">Цена:</span>
              {formattedPrice(price)} ₽
            </p>

            <div className="tabs product__tabs">
              <div className="tabs__controls product__tabs-controls">
                <button
                  className={`tabs__control ${isOpenCharacteristics ? 'is-active' : ''}`}
                  type="button"
                  onClick={toggleCharacteristics}
                >
                  Характеристики
                </button>
                <button
                  className={`tabs__control ${isOpenDescription ? 'is-active' : ''}`}
                  type="button"
                  onClick={toggleDescription}
                >
                    Описание
                </button>
              </div>
              <div className="tabs__content">

                {
                  isOpenCharacteristics &&
                  <div className={`tabs__element ${isOpenCharacteristics ? 'is-active' : ''}`}>
                    <ul className="product__tabs-list">
                      <li className="item-list">
                        <span className="item-list__title">Артикул:</span>
                        <p className="item-list__text"> {vendorCode}</p>
                      </li>
                      <li className="item-list">
                        <span className="item-list__title">Категория:</span>
                        <p className="item-list__text">{category}</p>
                      </li>
                      <li className="item-list">
                        <span className="item-list__title">Тип камеры:</span>
                        <p className="item-list__text">{type}</p>
                      </li>
                      <li className="item-list">
                        <span className="item-list__title">Уровень:</span>
                        <p className="item-list__text">{level}</p>
                      </li>
                    </ul>
                  </div>
                }

                {
                  isOpenDescription &&
                  <div className={`tabs__element ${isOpenDescription ? 'is-active' : ''}`}>
                    <div className="product__tabs-text">
                      <p>{firstSentence}</p>
                      {remainingDescription && <p>{remainingDescription}</p>}
                    </div>
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default ProdutcPage;
