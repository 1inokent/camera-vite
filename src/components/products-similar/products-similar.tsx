import { useAppSelector } from '../../store/hook';
import ProductSimilarSliderList from './products-similar-slider-list';

function ProductSimilar(): JSX.Element | null {
  const {camerasSimilar, error, isLoading} = useAppSelector((state) => state.camerasSimilar);

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
