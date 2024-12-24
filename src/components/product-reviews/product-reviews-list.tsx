import { CameraFetchReviews } from '../../types/camera-review-types/camera-review-types';
import ProductReview from './product-review';

type ProductReviewsListProps = {
  reviews: CameraFetchReviews;
}


function ProductReviewsList({reviews}: ProductReviewsListProps): JSX.Element {
  return (
    <ul className="review-block__list">
      {
        reviews.map((review) => (
          <ProductReview review={review} key={review.id} />
        )
        )
      }
    </ul>
  );
}

export default ProductReviewsList;
