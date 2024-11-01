import { useAppSelector } from '../../store/hook';


import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import SpinnerLoader from '../../components/spinner-loader/spinner-loader';
import CameraList from '../../components/cameras-components/cameras-list';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import { AppRoute } from '../../const';
import { Link } from 'react-router-dom';
import Banner from '../../components/banner/banner';

function CatalogPage(): JSX.Element {
  const { cameras, isLoading } = useAppSelector((state) => state.cameras);
  const errorMessage = useAppSelector((state) => state.error.message);

  if (isLoading) {
    return <SpinnerLoader />;
  }

  if (errorMessage && !cameras) {
    return (
      <Link to={AppRoute.CatalogPage}>
        <h2>{errorMessage}</h2>
        <p style={{ color: 'blue', textDecoration: 'underline'}}>Вернуться на главную</p>
      </Link>
    );
  }

  if (!cameras) {
    return (
      <Link to={AppRoute.CatalogPage}>
        <h2>Нет данных для камер</h2>
        <p style={{ color: 'blue', textDecoration: 'underline'}}>Вернуться на главную</p>
      </Link>
    );
  }

  return (
    <div className="wrapper">
      <Header />

      <main>
        <Banner />

        <div className="page-content">

          <Breadcrumbs />

          <section className="catalog">
            <div className="container">

              {errorMessage && <p>{errorMessage}</p>}

              <h1 className="title title--h2">Каталог фото - и видеотехники</h1>
              <div className="page-content__columns">
                <div className="catalog__aside">
                  <img src="/img/banner.png" />
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
