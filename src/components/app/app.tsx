import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { useEffect } from 'react';

import CatalogPage from '../../pages/catalog-page/catalog-page';
import ProductPage from '../../pages/product-page/product-page';
import BasketPage from '../../pages/basket-page/basket-page';
import NotFoundScreen from '../not-found-screen/not-found-screen';

import { useAppDispatch } from '../../store/hook';
import { fetchCamerasAction } from '../../store/slices/cameras-slice/cameras-slice';
import { clearError, setError } from '../../store/slices/error-slice/error-slice';

import { AppRoute } from '../../const';

function App(): JSX.Element {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const abortController = new AbortController();
    const fetchData = async () => {
      try {
        dispatch(clearError());
        await dispatch(fetchCamerasAction({ signal: abortController.signal }));
      } catch (err) {
        if (!(err === 'Запрос был отменён')) {
          const errMessage = typeof err === 'string' ? err : 'Ошибка загрузки камер';
          dispatch(setError(errMessage));
        }
      }
    };

    fetchData();

    return () => {
      abortController.abort();
    };

  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.CatalogPage}>
          <Route index element={<CatalogPage />} />
          <Route path={AppRoute.ProductPage} element={<ProductPage />} />
          <Route path={AppRoute.BasketPage} element={<BasketPage />} />
          <Route path='*' element={<NotFoundScreen />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
