import React from 'react';
import { UseFormRegister, FieldErrors, RegisterOptions, Path } from 'react-hook-form';
import { RatingLabels } from '../../../const';

const NON_RATE = 0;
const MAX_RATE_VALUE = 5;

type FormReviewRateProps<T extends Record<string, unknown>> = {
  rating: number | null;
  onRating: (rate: number) => void;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  validationOptions: RegisterOptions<T>;
};

function FormReviewRate<T extends { rating: number | null }>({
  onRating,
  rating,
  register,
  errors,
  validationOptions,
}: FormReviewRateProps<T>): JSX.Element {
  const handlerRatingChange = (rate: number) => {
    onRating(Number(rate));
  };

  return (
    <>
      <legend className="rate__caption">
    Рейтинг
        <svg width="9" height="9" aria-hidden="true">
          <use xlinkHref="#icon-snowflake"></use>
        </svg>
      </legend>
      <div className="rate__bar">
        <div className="rate__group">
          {
            Object.entries(RatingLabels).map(
              ([key, value], index) => {
                const starValue = MAX_RATE_VALUE - index;
                return (
                  <React.Fragment key={key}>
                    <input
                      className="visually-hidden"
                      id={`star-${starValue}`}
                      {...register('rating'as Path<T>, validationOptions)}
                      type="radio"
                      value={starValue}
                    />
                    <label
                      className="rate__label"
                      htmlFor={`star-${starValue}`}
                      title={value}
                      onClick={() => handlerRatingChange(starValue)}
                    >
                    </label>
                  </React.Fragment>
                );
              }
            )
          }
        </div>
        <div className="rate__progress">
          <span className="rate__stars">{rating ? rating : NON_RATE}</span>
          <span>/</span>
          <span className="rate__all-stars">{MAX_RATE_VALUE}</span>
        </div>
        {errors.rating && (
          <p className="rate__message">{errors.rating.message as string}</p>
        )}
      </div>
    </>
  );
}

export default FormReviewRate;
