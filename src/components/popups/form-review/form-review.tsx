import { SubmitHandler, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';

import FormReviewRate from './form-review-rate';

import { useAppDispatch, useAppSelector } from '../../../store/hook';
import { fetchCameraReviewAction, submitCameraReviewAction } from '../../../store/slices/camera-review-slice/camera-review-slice';

import { CameraReviewSubmit } from '../../../types/camera-review-types/camera-review-types';
import classNames from 'classnames';
import { clearError } from '../../../store/slices/error-slice/error-slice';

type FormReviewProps = {
  onShowReviewSucces: () => void;
  onClose: () => void;
}

function FormReview({ onShowReviewSucces, onClose }: FormReviewProps): JSX.Element {
  const dispatch = useAppDispatch();
  const errorMessage = useAppSelector((state) => state.error.message);
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    watch,
    reset
  } = useForm<CameraReviewSubmit>({
    defaultValues: {
      cameraId: id ? parseInt(id, 10) : null,
      userName: '',
      advantage: '',
      disadvantage: '',
      review: '',
      rating: null,
    },
    mode: 'onChange'
  });
  const rating = watch('rating');
  const handleRatingChange = (newRating: number) => {
    setValue('rating', newRating, { shouldValidate: true });
  };

  const onSubmit: SubmitHandler<CameraReviewSubmit> = async (data) => {
    const abortController = new AbortController();
    const updatedData = {
      ...data,
      rating: data.rating ? Number(data.rating) : null,
    };

    try {
      await dispatch(submitCameraReviewAction(updatedData)).unwrap();
      reset();
      if (id) {
        dispatch(clearError());
        await dispatch(fetchCameraReviewAction({ signal: abortController.signal, id }));
      }
      onShowReviewSucces();
    } catch {
      return errorMessage;
    }
  };

  return (
    <>
      <p className="title title--h4">Оставить отзыв</p>
      <div className="form-review">
        <form
          method="post"
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="form-review__rate">

            <fieldset className={classNames('rate form-review__item', {
              'is-invalid': !rating,
            })}
            >
              <FormReviewRate<CameraReviewSubmit>
                onRating={handleRatingChange}
                rating={rating}
                register={register}
                errors={errors}
                validationOptions={{
                  required: 'Нужно указать рейтинг',
                }}
              />
            </fieldset>

            <div className={
              classNames('custom-input form-review__item', {
                'is-invalid': errors.userName,
              })
            }
            >
              <label>
                <span className="custom-input__label">
                  Ваше имя
                  <svg width="9" height="9" aria-hidden="true">
                    <use xlinkHref="#icon-snowflake"></use>
                  </svg>
                </span>
                <input
                  type="text"
                  placeholder="Введите ваше имя"
                  {...register('userName', {
                    required: 'Нужно указать имя',
                    minLength: {
                      value: 2,
                      message: 'Имя должно быть не менее 2 символов',
                    },
                    maxLength: {
                      value: 15,
                      message: 'Имя должно быть не более 15 символов',
                    },
                  })}
                />
              </label>
              {errors.userName && (
                <p className="custom-input__error">{errors.userName.message}</p>
              )}
            </div>

            <div className={classNames('custom-input form-review__item', {
              'is-invalid': errors.advantage,
            })}
            >
              <label>
                <span className="custom-input__label">
                  Достоинства
                  <svg width="9" height="9" aria-hidden="true">
                    <use xlinkHref="#icon-snowflake"></use>
                  </svg>
                </span>
                <input
                  type="text"
                  placeholder="Основные преимущества товара"
                  {...register('advantage', {
                    required: 'Нужно указать достоинства',
                    minLength: {
                      value: 10,
                      message: 'Не менее 10 символов',
                    },
                    maxLength: {
                      value: 160,
                      message: 'Не более 160 символов',
                    },
                  })}
                />
              </label>
              {errors.advantage && (
                <p className="custom-input__error">{errors.advantage.message}</p>
              )}
            </div>

            <div className={classNames('custom-input form-review__item', {
              'is-invalid': errors.disadvantage,
            })}
            >
              <label>
                <span className="custom-input__label">
                  Недостатки
                  <svg width="9" height="9" aria-hidden="true">
                    <use xlinkHref="#icon-snowflake"></use>
                  </svg>
                </span>
                <input
                  type="text"
                  placeholder="Главные недостатки товара"
                  {...register('disadvantage', {
                    required: 'Нужно указать недостатки',
                    minLength: {
                      value: 10,
                      message: 'Не менее 10 символов',
                    },
                    maxLength: {
                      value: 160,
                      message: 'Не более 160 символов',
                    },
                  })}
                />
              </label>
              {errors.disadvantage && (
                <p className="custom-input__error">{errors.disadvantage.message}</p>
              )}
            </div>

            <div className={classNames('custom-textarea form-review__item', {
              'is-invalid': errors.review,
            })}
            >
              <label>
                <span className="custom-textarea__label">
                  Комментарий
                  <svg width="9" height="9" aria-hidden="true">
                    <use xlinkHref="#icon-snowflake"></use>
                  </svg>
                </span>
                <textarea
                  placeholder="Поделитесь своим опытом покупки"
                  {...register('review', {
                    required: 'Нужно добавить комментарий',
                    minLength: {
                      value: 10,
                      message: 'Не менее 10 символов',
                    },
                    maxLength: {
                      value: 160,
                      message: 'Не более 160 символов',
                    },
                  })}
                >
                </textarea>
              </label>
              {errors.review && (
                <div className="custom-textarea__error">
                  {errors.review.message}
                </div>
              )}
            </div>
          </div>

          <button
            className="btn btn--purple form-review__btn"
            type="submit"
            onClick={() => {
              if (isValid && rating) {
                handleSubmit(onSubmit);
              }
            }}
          >
            Отправить отзыв
          </button>
          <button
            className="cross-btn"
            type="button"
            aria-label="Закрыть попап"
            onClick={() => onClose()}
          >
            <svg width="10" height="10" aria-hidden="true">
              <use xlinkHref="#icon-close"></use>
            </svg>
          </button>
        </form>
      </div>
    </>
  );
}

export default FormReview;

