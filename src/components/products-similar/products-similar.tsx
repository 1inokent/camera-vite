import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import ProductSimilarSliderList from './products-similar-slider-list';
import { fetchCamerasSimilarAction } from '../../store/slices/cameras-similar-slice';
import { clearError, setError } from '../../store/slices/error-slice';
import { useParams } from 'react-router-dom';

function ProductSimilar(): JSX.Element | null {
  const dispatch = useAppDispatch();
  const {camerasSimilar, isLoading} = useAppSelector((state) => state.camerasSimilar);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const abortController = new AbortController();
    let isMounted = true;

    const fetchData = async () => {
      try {
        if (isMounted && id) {
          dispatch(clearError());
          await dispatch(fetchCamerasSimilarAction({ signal: abortController.signal, id }));
        }
      } catch (err) {
        if (isMounted && !(err === 'Запрос был отменён')) {
          const errMessage = typeof err === 'string' ? err : 'Ошибка загрузки камер';
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

  if (!isLoading && !camerasSimilar.length) {
    return null;
  }

  return (
    <div className="page-content__section">
      <section className="product-similar">
        <div className="container">
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

export default ProductSimilar;
