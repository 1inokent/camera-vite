import { CameraReviews } from '../../types/camera-review-types/camera-review-types';
import ProductReview from './product-review';

type ProductReviewsListProps = {
  reviews: CameraReviews;
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
