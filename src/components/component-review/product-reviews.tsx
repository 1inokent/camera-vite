import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { Link, useParams } from 'react-router-dom';
import { fetchCameraReviewAction } from '../../store/slices/camera-review-slice';
import { setError } from '../../store/slices/error-slice';
import { AppRoute } from '../../const';
import ProductReviewsList from './product-reviews-list';

function ProductReviews(): JSX.Element {
  const dispatch = useAppDispatch();
  const {error, reviews} = useAppSelector((state) => state.cameraReview);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const abortController = new AbortController();
    let isMounted = true;

    const fetchData = async () => {
      try {
        if (isMounted) {
          if (id) {
            await dispatch(fetchCameraReviewAction({ signal: abortController.signal, id }));
          }
        }
      } catch (err) {
        if (isMounted) {
          const errMessage = err instanceof Error ? err.message : 'Ошибка загрузки камер';
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

  if (error) {
    <>
      <p>{error}</p>
      <Link to={AppRoute.CatalogPage}>
        <p style={{ color: 'blue', textDecoration: 'underline'}}>Нет данных отзыва</p>
      </Link>
    </>;
  }

  return (
    <div className="page-content__section">
      <section className="review-block">
        <div className="container">
          <div className="page-content__headed">
            <h2 className="title title--h3">Отзывы</h2>
            <button className="btn" type="button">Оставить свой отзыв</button>
          </div>
          <ProductReviewsList reviews={reviews} />
          {/* <ul className="review-block__list">
            <li className="review-card">
              <div className="review-card__head">
                <p className="title title--h4">Сергей Горский</p>
                <time className="review-card__data" dateTime="2022-04-13">13 апреля</time>
              </div>
              <div className="rate review-card__rate">
                <svg width="17" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-full-star"></use>
                </svg>
                <svg width="17" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-full-star"></use>
                </svg>
                <svg width="17" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-full-star"></use>
                </svg>
                <svg width="17" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-full-star"></use>
                </svg>
                <svg width="17" height="16" aria-hidden="true">
                  <use xlinkHref="#icon-full-star"></use>
                </svg>
                <p className="visually-hidden">Оценка: 5</p>
              </div>
              <ul className="review-card__list">
                <li className="item-list"><span className="item-list__title">Достоинства:</span>
                  <p className="item-list__text">Надёжная, хорошо лежит в руке, необычно выглядит</p>
                </li>
                <li className="item-list"><span className="item-list__title">Недостатки:</span>
                  <p className="item-list__text">Тяжеловата, сложно найти плёнку</p>
                </li>
                <li className="item-list"><span className="item-list__title">Комментарий:</span>
                  <p className="item-list__text">Раз в полгода достаю из-под стекла, стираю пыль, заряжаю — работает как часы. Ни у кого из знакомых такой нет, все завидуют) Теперь это жемчужина моей коллекции, однозначно стоит своих денег!</p>
                </li>
              </ul>
            </li>
          </ul> */}

          <div className="review-block__buttons">
            <button className="btn btn--purple" type="button">Показать больше отзывов
            </button>
          </div>
        </div>
      </section>
      <a className="up-btn" href="#header">
        <svg width="12" height="18" aria-hidden="true">
          <use xlinkHref="#icon-arrow2"></use>
        </svg>
      </a>
    </div>
  );
}

export default ProductReviews;
