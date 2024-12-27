import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import debounce from 'lodash/debounce';

import { useAppDispatch, useAppSelector } from '../../store/hook';
import { fetchCameraReviewAction } from '../../store/slices/camera-review-slice/camera-review-slice';
import { clearError, setError } from '../../store/slices/error-slice/error-slice';

import ProductReviewsList from './product-reviews-list';
import ButtonScrollToTop from '../button-scroll-to-top/button-scroll-to-top';
import Popup from '../popups/popup';

const MIN_DISPLAYED_REVIEWS = 0;
const REVIEWS_INCREMENT = 3;
const SCROLL_THRESHOLD = 5;
const SCROLL_DEBOUNCE_DELAY = 500;

function ProductReviews(): JSX.Element {
  const dispatch = useAppDispatch();
  const { reviews, isLoading } = useAppSelector((state) => state.cameraReview);
  const errorMessage = useAppSelector((state) => state.error.message);
  const { id } = useParams<{ id: string }>();

  const [displayedReviewsCount, setDisplayedReviewsCount] = useState(REVIEWS_INCREMENT);
  const [addReview, setAddReview] = useState(false);

  const sortedReviews = [...reviews].sort((a, b) => new Date(b.createAt).getTime() - new Date(a.createAt).getTime());
  const displayedReviews = sortedReviews.slice(MIN_DISPLAYED_REVIEWS, displayedReviewsCount);

  const handleAddReview = () => {
    setAddReview(!addReview);
  };

  const handleShowMoreReviews = () => {
    setDisplayedReviewsCount((prevCount) => prevCount + REVIEWS_INCREMENT);
  };

  const handleScroll = debounce(() => {
    const isAtBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - SCROLL_THRESHOLD;

    if (isAtBottom && displayedReviewsCount < sortedReviews.length) {
      handleShowMoreReviews();
    }
  }, SCROLL_DEBOUNCE_DELAY);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchData = async () => {
      try {
        if (id) {
          dispatch(clearError());
          await dispatch(fetchCameraReviewAction({ signal: abortController.signal, id }));
        }
      } catch (err) {
        const errMessage = err instanceof Error ? err.message : 'Нет данных для отзывов';
        dispatch(setError(errMessage));
      }
    };
    fetchData();

    return () => {
      abortController.abort();
    };

  }, [dispatch, id]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [displayedReviewsCount, handleScroll, sortedReviews.length]);

  if (errorMessage) {
    <p style={{ color: 'blue', textDecoration: 'underline'}}>{errorMessage}</p>;
  }

  return (
    <div className="page-content__section">
      <section className="review-block">
        <div className="container">
          <div className="page-content__headed">
            <h2 className="title title--h3">Отзывы</h2>
            <button
              className="btn"
              type="button"
              onClick={handleAddReview}
            >
              Оставить свой отзыв
            </button>
          </div>

          {sortedReviews.length === 0 ? (
            <p>Нет отзывов</p>
          ) : (
            <>
              <ProductReviewsList reviews={displayedReviews} />

              <div className="review-block__buttons">
                {displayedReviewsCount < sortedReviews.length && !isLoading && (
                  <button
                    className="btn btn--purple"
                    type="button"
                    onClick={handleShowMoreReviews}
                  >
                    Показать больше отзывов
                  </button>
                )}
              </div>

              {isLoading && (
                <button className="btn btn--purple" type="button" disabled role='loadButton'>
                  Загрузка...
                </button>
              )}
            </>
          )}
        </div>
      </section>

      {addReview && <Popup onClose={handleAddReview} addReview={addReview} />}

      <ButtonScrollToTop />
    </div>
  );
}

export default ProductReviews;
