import { useEffect, useMemo, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../store/hook';

import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import SpinnerLoader from '../../components/spinner-loader/spinner-loader';
import CameraList from '../../components/cameras-components/cameras-list';
import Breadcrumbs from '../../components/breadcrumbs/breadcrumbs';
import Banner from '../../components/banner/banner';
import CatalogSort from '../../components/catalog-sort/catalog-sort';
import CatalogFilter from '../../components/catalog-filter/catalog-filter';
import Pagination from '../../components/pagination/pagination';

import { Filters } from '../../types/filters-types/filter-types';
import { AppRoute, ITEMS_PER_PAGE } from '../../const';
import { filterCamerasByParams, sortingCameras } from '../../utils/sorting-filtering-utils';
import { CameraCategory } from '../../types/cameras-types/cameras-types';

function CatalogPage(): JSX.Element {
  const navigate = useNavigate();
  const location = useLocation();
  const { cameras, isLoading } = useAppSelector((state) => state.cameras);
  const errorMessage = useAppSelector((state) => state.error.message);

  const [sortType, setSortType] = useState<'price' | 'rating'>('price');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [filters, setFilters] = useState<Filters>({});
  const [currentMinPrice, setCurrentMinPrice] = useState<number | undefined>(undefined);
  const [currentMaxPrice, setCurrentMaxPrice] = useState<number | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState<number>(1);

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
    const params = new URLSearchParams(location.search);

    if (value !== undefined && value !== '') {
      params.set(key, value.toString());
    } else {
      params.delete(key);
    }

    navigate(`?${params.toString()}`);
  };

  const handleFilterChange = (newFilters: Filters) => {
    const params = new URLSearchParams(location.search);

    Object.entries(newFilters).forEach(([key, value]) => {
      if (value) {
        params.set(key, value.toString());
      } else {
        (
          params.delete(key)
        );
      }
    });

    navigate(`?${params.toString()}`);
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
    if (sortedCameras.length > 0) {
      const newMinPrice = sortedCameras.reduce((min, camera) => (camera.price < min ? camera.price : min), sortedCameras[0].price);
      const newMaxPrice = sortedCameras.reduce((max, camera) => (camera.price > max ? camera.price : max), sortedCameras[0].price);
      setCurrentMinPrice(newMinPrice);
      setCurrentMaxPrice(newMaxPrice);
    }
  }, [sortedCameras]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const sortTypeParam = params.get('sortType') as 'price' | 'rating';
    const sortOrderParam = params.get('sortOrder') as 'asc' | 'desc';
    const pageParam = parseInt(params.get('page') || '1', 10);
    const filtersFromUrl = {} as Filters;

    if (sortTypeParam) {
      setSortType(sortTypeParam);
    }
    if (sortOrderParam) {
      setSortOrder(sortOrderParam);
    }
    if (pageParam) {
      setCurrentPage(pageParam);
    }

    params.forEach((value, key) => {
      if (key === 'minPrice' || key === 'maxPrice') {
        filtersFromUrl[key] = parseFloat(value);
      } else if (key === 'category') {
        filtersFromUrl[key] = value as CameraCategory;
      } else if (key === 'level' || key === 'cameraType') {
        filtersFromUrl[key] = value.split(',');
      }
    });
    setFilters(filtersFromUrl);
  }, [location.search]);

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
                    maxPrice={currentMaxPrice}
                    minPrice={currentMinPrice}
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
                  <CameraList cameras={paginatedCameras} />
                  <Pagination
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
