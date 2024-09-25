import { useEffect } from 'react';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { fetchCamerasAction } from '../../store/slices/cameras-slice';
import SpinnerLoader from '../../components/spinner-loader/spinner-loader';
import CameraList from '../../components/cameras-components/cameras-list';

function CatalogPage(): JSX.Element {
  const dispatch = useAppDispatch();
  const { cameras, error, isLoading } = useAppSelector((state) => state.cameras);

  useEffect(() => {
    dispatch(fetchCamerasAction());
  }, [dispatch]);

  if (isLoading) {
    return <SpinnerLoader />;
  }

  if (error) {
    return <h1>error</h1>;
  }

  return (
    <div className="wrapper">
      <Header />

      <main>
        <div className="banner">
          <picture>
            <source type="image/webp" srcSet="img/content/banner-bg.webp, img/content/banner-bg@2x.webp 2x" />
            <img
              src="img/content/banner-bg.jpg"
              srcSet="img/content/banner-bg@2x.jpg 2x"
              width="1280"
              height="280"
              alt="баннер"
            />
          </picture>
          <p className="banner__info">
            <span className="banner__message">Новинка!</span>
            <span className="title title--h1">Cannonball&nbsp;Pro&nbsp;MX&nbsp;8i</span>
            <span className="banner__text">Профессиональная камера от&nbsp;известного производителя</span>
            <a className="btn" href="#">Подробнее</a>
          </p>
        </div>

        <div className="page-content">

          <div className="breadcrumbs">
            <div className="container">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <a className="breadcrumbs__link" href="index.html">Главная
                    <svg width="5" height="8" aria-hidden="true">
                      <use xlinkHref="#icon-arrow-mini"></use>
                    </svg>
                  </a>
                </li>
                <li className="breadcrumbs__item"><span className="breadcrumbs__link breadcrumbs__link--active">Каталог</span>
                </li>
              </ul>
            </div>
          </div>

          <section className="catalog">
            <div className="container">
              <h1 className="title title--h2">Каталог фото - и видеотехники</h1>
              <div className="page-content__columns">
                <div className="catalog__aside">
                  <img src="img/banner.png" />
                </div>

                <div className="catalog__content">
                  <CameraList cameras={cameras} />
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

export default CatalogPage;
