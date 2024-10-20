type RatingProps = {
  rating: number;
  reviewCount?: number;
  maxRating?: number;
}

function Rating({rating, reviewCount, maxRating = 5}: RatingProps): JSX.Element {
  const filledStars = Math.min(Math.floor(rating), maxRating);
  const emptyStars = maxRating - filledStars;

  return (
    <div className="rate product-card__rate">

      {Array.from({ length: filledStars }, (_, index) => (
        <svg key={`full-star-${index}`} width="17" height="16" aria-hidden="true">
          <use xlinkHref="#icon-full-star"></use>
        </svg>
      ))}

      {Array.from({ length: emptyStars }, (_, index) => (
        <svg key={`empty-star-${index}`} width="17" height="16" aria-hidden="true">
          <use xlinkHref="#icon-star"></use>
        </svg>
      ))}

      <p className="visually-hidden" role="rating">Рейтинг:{rating}</p>
      <p className="rate__count">
        <span className="visually-hidden">Всего оценок:</span>
        {reviewCount}
      </p>
    </div>
  );
}

export default Rating;
