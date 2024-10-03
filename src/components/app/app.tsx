import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import CatalogPage from '../../pages/catalog-page/catalog-page';
import ProdutcPage from '../../pages/product-page/produdct-page';
import NotFoundScreen from '../not-found-screen/not-found-screen';

function App(): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={AppRoute.CatalogPage}>
          <Route index element={<CatalogPage />} />
          <Route path={AppRoute.ProductPage} element={<ProdutcPage />} />
          <Route path='*' element={<NotFoundScreen />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
