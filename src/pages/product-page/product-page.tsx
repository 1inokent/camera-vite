import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../store/hook';
import { fetchCameraAction } from '../../store/slices/camera-slice';
import { setError } from '../../store/slices/error-slice';

import Rating from '../../components/rating/rating';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import SpinnerLoader from '../../components/spinner-loader/spinner-loader';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import ProductReviews from '../../components/product-reviews/product-reviews';
import ProductTabsMemonizated from '../../components/product-tabs-memo/product-tabs-memo';

import { AppRoute } from '../../const';
import { formattedPrice } from '../../utils';
import ProductSimilar from '../../components/products-similar/products-similar';
import { fetchCamerasSimilarAction } from '../../store/slices/cameras-similar-slice';

function ProductPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const { camera, error, isLoading } = useAppSelector((state) => state.camera);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const abortController = new AbortController();
    let isMounted = true;

    const fetchData = async () => {
      try {
        if (isMounted) {
          if (id) {
            await dispatch(fetchCameraAction({ signal: abortController.signal, id }));
            await dispatch(fetchCamerasSimilarAction({ signal: abortController.signal, id }));
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
      <h2>{error}</h2>
      <Link to={AppRoute.CatalogPage}>
        <p style={{ color: 'blue', textDecoration: 'underline'}}>Вернуться на главную</p>
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

          <ProductSimilar />
          <ProductReviews />

        </div>
      </main>

      <Footer />
    </div>
  );
}

export default ProductPage;
