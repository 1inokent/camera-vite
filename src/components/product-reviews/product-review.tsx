import { CameraReview } from '../../types/camera-review-types/camera-review-types';
import { formatDate } from '../../utils/utils';
import Rating from '../rating/rating';

type ProductReviewProps = {
  review: CameraReview;
}


function ProductReview({review}: ProductReviewProps):JSX.Element {
  const {userName, createAt, rating, advantage, disadvantage, review: comment} = review;

  return (
    <li className="review-card">
      <div className="review-card__head">
        <p className="title title--h4">{userName}</p>
        <time className="review-card__data" dateTime="2022-04-13">{formatDate(createAt)}</time>
      </div>

      <Rating rating={rating} />

      <ul className="review-card__list">
        <li className="item-list"><span className="item-list__title">Достоинства:</span>
          <p className="item-list__text">{advantage}</p>
        </li>
        <li className="item-list"><span className="item-list__title">Недостатки:</span>
          <p className="item-list__text">{disadvantage}</p>
        </li>
        <li className="item-list"><span className="item-list__title">Комментарий:</span>
          <p className="item-list__text">{comment}</p>
        </li>
      </ul>
    </li>
  );
}

export default ProductReview;
