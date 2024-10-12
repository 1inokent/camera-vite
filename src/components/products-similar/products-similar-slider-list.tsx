import { useState } from 'react';
import { Cameras } from '../../types/cameras-types/cameras-types';
import CameraCard from '../cameras-components/camera-card';

const ITEMS_PER_PAGE = 3;

type ProductSimilarListProps = {
  camerasSimilar: Cameras;
}

function ProductSimilarList({camerasSimilar}: ProductSimilarListProps): JSX.Element {
  const [activeIndex, setActiveIndex] = useState(0);
  const totalItems = camerasSimilar.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const handleNext = () => {
    if (activeIndex < totalPages - 1) {
      setActiveIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      setActiveIndex((prevIndex) => prevIndex - 1);
    }
  };

  const getActiveClass = (index: number) => {
    const start = activeIndex * ITEMS_PER_PAGE;
    return index >= start && index < start + ITEMS_PER_PAGE;
  };

  return (
    <>
      <div
        className="product-similar__slider-list"
        style={{
          display: 'flex',
          transition: 'transform 0.5s ease',
        }}
      >
        {
          camerasSimilar.map((camera, index) => (
            <CameraCard camera={camera} key={camera.id} isActive={getActiveClass(index)} />
          ))
        }
      </div>

      <button
        className="slider-controls slider-controls--prev"
        type="button"
        aria-label="Предыдущий слайд"
        disabled={activeIndex === 0}
        onMouseDown={handlePrev}
      >
        <svg width="7" height="12" aria-hidden="true">
          <use xlinkHref="#icon-arrow"></use>
        </svg>
      </button>

      <button
        className="slider-controls slider-controls--next"
        type="button"
        aria-label="Следующий слайд"
        disabled={activeIndex === totalPages - 1}
        onMouseDown={handleNext}
      >
        <svg width="7" height="12" aria-hidden="true">
          <use xlinkHref="#icon-arrow"></use>
        </svg>
      </button>
    </>
  );
}

export default ProductSimilarList;
