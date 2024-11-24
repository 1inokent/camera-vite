import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../store/hook';
import { fetchCamerasSimilarAction } from '../../store/slices/camera-similar-slice/cameras-similar-slice';
import { clearError, setError } from '../../store/slices/error-slice/error-slice';

import ProductSimilarSliderList from './product-similar-slider-list';

function ProductSimilarSlider(): JSX.Element | null {
  const dispatch = useAppDispatch();
  const {camerasSimilar, isLoading} = useAppSelector((state) => state.camerasSimilar);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const abortController = new AbortController();

    const fetchData = async () => {
      try {
        if (id) {
          dispatch(clearError());
          await dispatch(fetchCamerasSimilarAction({ signal: abortController.signal, id }));
        }
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
  }, [dispatch, id]);

  if (!isLoading && !camerasSimilar.length) {
    return null;
  }

  return (
    <div className="page-content__section">
      <section className="product-similar">
        <div className="container" role='similarTitle'>
          <h2 className="title title--h3">Похожие товары</h2>

          <div className="product-similar__slider">
            {
              isLoading ?
                <p>Загрузка...</p> :
                <ProductSimilarSliderList camerasSimilar={camerasSimilar} />
            }
          </div>
        </div>
      </section>
    </div>
  );
}

export default ProductSimilarSlider;
