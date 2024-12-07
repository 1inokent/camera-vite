import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { useAppSelector } from '../../store/hook';

import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import SpinnerLoader from '../../components/spinner-loader/spinner-loader';
import CamerasList from '../../components/cameras-components/cameras-list';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import Banner from '../../components/banner/banner';
import CatalogSort from '../../components/catalog-sort/catalog-sort';
import CatalogFilter from '../../components/catalog-filter/catalog-filter';
import PaginationCatalog from '../../components/pagination-catalog/pagination-catalog';

import { Filters } from '../../types/filters-types/filter-types';
import { CameraCategory } from '../../types/cameras-types/cameras-types';
import { AppRoute, ITEMS_PER_PAGE } from '../../const';
import { filterCamerasByParams, sortingCameras } from '../../utils/sorting-filtering-utils';

const urlParams = new URLSearchParams(location.search);
const initialFilters = {
  minPrice: urlParams.get('minPrice') ? Number(urlParams.get('minPrice')) : undefined,
  maxPrice: urlParams.get('maxPrice') ? Number(urlParams.get('maxPrice')) : undefined,
  category: urlParams.get('category') as CameraCategory,
  level: urlParams.get('level')?.split(','),
  cameraType: urlParams.get('cameraType')?.split(','),
};
const initialCurrentPage = urlParams.get('page') ? Number(urlParams.get('page')) : 1;
const initialSortType = urlParams.get('sortType') as 'price' | 'rating' || 'price';
const initialSortOrder = urlParams.get('sortOrder') as 'asc' | 'desc' || 'asc';

function CatalogPage(): JSX.Element {
  const [searchParams, setSearchParams] = useSearchParams();

  const { cameras, isLoading } = useAppSelector((state) => state.cameras);
  const errorMessage = useAppSelector((state) => state.error.message);

  const [sortType, setSortType] = useState<'price' | 'rating'>(initialSortType);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>(initialSortOrder);
  const [filters, setFilters] = useState<Filters>(initialFilters);
  const [currentMinPrice, setCurrentMinPrice] = useState<number>();
  const [currentMaxPrice, setCurrentMaxPrice] = useState<number>();
  const [currentPage, setCurrentPage] = useState<number>(initialCurrentPage);

  const partiallyFilteredCameras = useMemo(() => {
    if (cameras) {
      return filterCamerasByParams(cameras, {
        ...filters,
        minPrice: undefined,
        maxPrice: undefined,
      });
    }

    return [];
  }, [cameras, filters]);

  const filteredCameras = useMemo(
    () => (cameras ? filterCamerasByParams(cameras, filters) : []),
    [cameras, filters]
  );

  const sortedCameras = useMemo(
    () => (filteredCameras ? sortingCameras(filteredCameras, sortType, sortOrder) : []),
    [filteredCameras, sortType, sortOrder]
  );

  const totalPages = Math.ceil(sortedCameras.length / ITEMS_PER_PAGE);
  const paginatedCameras = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return sortedCameras.slice(start, end);
  }, [currentPage, sortedCameras]);

  const updateQueryParams = (key: string, value: string | number | undefined) => {
    if (value !== undefined && value !== '') {
      searchParams.set(key, value.toString());
    } else {
      searchParams.delete(key);
    }

    setSearchParams(searchParams);
  };

  const handleFilterChange = (newFilters: Filters) => {
    Object.entries(newFilters).forEach(([key, value]: [string, string | number | Array<number | string> | undefined | null]) => {
      if(!value){
        searchParams.delete(key);
        return;
      }

      if (Array.isArray(value) && !value.length){
        searchParams.delete(key);
        return;
      }

      if (Array.isArray(value)) {
        searchParams.set(key, value.join(','));
        return;
      }

      searchParams.set(key, value.toString());
    });

    setCurrentPage(1);
    searchParams.set('page', '1');
    setSearchParams(searchParams);
    setFilters((prevFilters) => ({ ...prevFilters, ...newFilters }));
  };

  const handleSortTypeChange = (type: 'price' | 'rating') => {
    updateQueryParams('sortType', type);
    setSortType(type);
  };

  const handleSortOrderChange = (order: 'asc' | 'desc') => {
    updateQueryParams('sortOrder', order);
    setSortOrder(order);
  };

  const handlePageChange = (page: number) => {
    updateQueryParams('page', page);
    setCurrentPage(page);
  };

  useEffect(() => {
    if (partiallyFilteredCameras.length > 0) {
      let minPrice = partiallyFilteredCameras[0].price;
      let maxPrice = partiallyFilteredCameras[0].price;

      partiallyFilteredCameras.forEach((camera) => {
        if (camera.price < minPrice) {
          minPrice = camera.price;
        }

        if (camera.price > maxPrice) {
          maxPrice = camera.price;
        }
      });

      setCurrentMinPrice(minPrice);
      setCurrentMaxPrice(maxPrice);
    }
  }, [partiallyFilteredCameras]);

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

  if (!cameras) {
    <SpinnerLoader />;
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
                    maxPrice={currentMaxPrice}
                    minPrice={currentMinPrice}
                    filters={initialFilters}
                    onFilterChange={handleFilterChange}
                  />
                </div>

                <div className="catalog__content">
                  <CatalogSort
                    sortType={sortType}
                    sortOrder={sortOrder}
                    onSortTypeChange={(type) => handleSortTypeChange(type)}
                    onSortOrderChange={(order) => handleSortOrderChange(order)}
                  />
                  <CamerasList loading={isLoading} cameras={paginatedCameras} />
                  <PaginationCatalog
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={(page) => handlePageChange(page)}
                  />
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
