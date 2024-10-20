import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../store/hook';
import { fetchCameraAction } from '../../store/slices/camera-slice/camera-slice';
import { clearError, setError } from '../../store/slices/error-slice/error-slice';

import Rating from '../../components/rating/rating';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import SpinnerLoader from '../../components/spinner-loader/spinner-loader';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import ProductReviews from '../../components/product-reviews/product-reviews';
import ProductTabsMemonizated from '../../components/product-tabs-memo/product-tabs-memo';

import { AppRoute } from '../../const';
import { formattedPrice } from '../../utils/utils';
import ProductSimilarSlider from '../../components/products-similar/product-similar-slider';

function ProductPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const errorMessage = useAppSelector((state) => state.error.message);
  const { camera, isLoading } = useAppSelector((state) => state.camera);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const abortController = new AbortController();
    let isMounted = true;

    const fetchData = async () => {
      try {
        if (isMounted && id) {
          dispatch(clearError());
          await dispatch(fetchCameraAction({ signal: abortController.signal, id }));
        }
      } catch (err) {
        if (isMounted && !(err === 'Запрос был отменён')) {
          const errMessage = typeof err === 'string' ? err : 'Ошибка загрузки камер';
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

  if (isLoading) {
    return <SpinnerLoader />;
  }

  if (errorMessage && !camera) {
    return (
      <>
        <h2>{errorMessage}</h2>
        <Link to={AppRoute.CatalogPage}>
          <p style={{ color: 'blue', textDecoration: 'underline'}}>Вернуться на главную</p>
        </Link>
      </>
    );
  }

  if (!camera) {
    return (
      <SpinnerLoader />
    );
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

  return (
    <div className="wrapper">
      <Header />

      <main>
        <div className="page-content">

          <Breadcrumbs productName={correctName} />

          <div className="page-content__section">
            <section className="product">
              <div className="container">
                <div className="product__img">
                  <picture>
                    <source
                      type="image/webp"
                      srcSet={`/${previewImgWebp}, /${previewImgWebp2x}`}
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

                  <button className="btn btn--purple" type="button">
                    <svg width="24" height="16" aria-hidden="true">
                      <use xlinkHref="#icon-add-basket"></use>
                    </svg>Добавить в корзину
                  </button>

                  <ProductTabsMemonizated
                    category={category}
                    description={description}
                    level={level}
                    type={type}
                    vendorCode={vendorCode}
                  />

                </div>
              </div>
            </section>
          </div>

          <ProductSimilarSlider />
          <ProductReviews />

        </div>
      </main>

      <Footer />
    </div>
  );
}

export default ProductPage;
