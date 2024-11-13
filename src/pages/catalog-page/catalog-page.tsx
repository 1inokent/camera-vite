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
import CatalogFilter from '../../components/catalog-filter/catalog-filter';

import { AppRoute } from '../../const';
import { filterCamerasByParams, sortingCameras } from '../../utils/sorting-filtering-utils';
import { Filters } from '../../types/filters-types/filter-types';


function CatalogPage(): JSX.Element {
  const { cameras, isLoading } = useAppSelector((state) => state.cameras);
  const errorMessage = useAppSelector((state) => state.error.message);

  const [sortType, setSortType] = useState<'price' | 'rating'>('price');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const [filters, setFilters] = useState<Filters>({});

  const handleFilterChange = (newFilters: Filters) => {
    setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
  };

  const filteredCameras = cameras ? filterCamerasByParams(cameras, filters) : [];
  const sortedCameras = filteredCameras ? sortingCameras(filteredCameras, sortType, sortOrder) : [];
  const minPrice = sortedCameras.length > 0 ?
    sortedCameras.reduce((min, camera) => (camera.price < min ? camera.price : min), sortedCameras[0].price)
    : 0;
  const maxPrice = sortedCameras.length > 0 ?
    sortedCameras.reduce((max, camera) => (camera.price > max ? camera.price : max), sortedCameras[0].price)
    : 0;

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
                  <CatalogFilter
                    maxPrice={maxPrice}
                    minPrice={minPrice}
                    onFilterChange={handleFilterChange}
                  />
                </div>

                <div className="catalog__content">
                  <CatalogSort
                    sortType={sortType}
                    sortOrder={sortOrder}
                    onSortTypeChange={setSortType}
                    onSortOrderChange={setSortOrder}
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
