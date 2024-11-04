import { useAppSelector } from '../../store/hook';
import { Link } from 'react-router-dom';
import { useState } from 'react';

import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import SpinnerLoader from '../../components/spinner-loader/spinner-loader';
import CameraList from '../../components/cameras-components/cameras-list';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import Banner from '../../components/banner/banner';
import CatalogSort from '../../components/catalog-sort/catalog-sort';

import { AppRoute } from '../../const';
import { sortingCameras } from '../../utils/sorting-filtering-utils';


function CatalogPage(): JSX.Element {
  const { cameras, isLoading } = useAppSelector((state) => state.cameras);
  const errorMessage = useAppSelector((state) => state.error.message);

  const [sortType, setSortType] = useState<'price' | 'rating'>('price');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const handleSortTypeChange = (type: 'price' | 'rating') => setSortType(type);
  const handleSortOrderChange = (order: 'asc' | 'desc') => setSortOrder(order);

  const sortedCameras = sortingCameras(cameras, sortType, sortOrder);

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
                  <CatalogSort
                    sortType={sortType}
                    sortOrder={sortOrder}
                    onSortTypeChange={handleSortTypeChange}
                    onSortOrderChange={handleSortOrderChange}
                  />
                  <CameraList cameras={sortedCameras} />
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
