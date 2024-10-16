import { useEffect } from 'react';
import { generatePath, Link } from 'react-router-dom';

import { clearError, setError } from '../../store/slices/error-slice';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { fetchCamerasPromoAction } from '../../store/slices/cameras-promo-slice';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/bundle';

import { AppRoute } from '../../const';
import { getBannerText } from '../../utils';

function Banner(): JSX.Element {
  const dispatch = useAppDispatch();
  const { camerasPromo } = useAppSelector((state) => state.camerasPromo);

  const pagination = {
    clickable: true,
    renderBullet: function (index: number, className: string) {
      const isActive = className === 'swiper-pagination-bullet swiper-pagination-bullet-active';
      const bulletStyle = isActive
        ? 'background: #7575E2; width: 16px; height: 16px; opacity: 1;'
        : ' width: 16px; height: 16px; opacity: 1;';

      return `<span class="${className}" style="${bulletStyle} --swiper-pagination-bullet-inactive-color: #F4F4FC;"></span>`;
    },
    el: '.swiper-pagination',
  };

  useEffect(() => {
    const abortController = new AbortController();
    let isMounted = true;

    const fetchData = async () => {
      try {
        if (isMounted) {
          dispatch(clearError());
          await dispatch(fetchCamerasPromoAction({ signal: abortController.signal }));
        }
      } catch (err) {
        if (isMounted && !(err === 'Запрос был отменён')) {
          const errMessage = typeof err === 'string' ? err : 'Ошибка загрузки камер';
          dispatch(setError(errMessage));
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
      abortController.abort();
    };
  }, [dispatch]);

  return (
    <div className='banner' style={{ minHeight: 'auto'}}>
      {
        camerasPromo && camerasPromo.length > 0 && (
          <Swiper
            modules={[Pagination, Autoplay]}
            pagination={pagination}
            autoplay={{ delay: 3000 }}
            loop
            spaceBetween={30}
            slidesPerView={1}
          >
            {
              camerasPromo.map((camera, index) => (
                <SwiperSlide key={camera.id}>
                  <picture>
                    <source
                      type="image/webp"
                      srcSet={`${camera.previewImgWebp}, ${camera.previewImg2x}`}
                    />
                    <img
                      src={`/${camera.previewImg}`}
                      srcSet={`/${camera.previewImg2x}`}
                      width="1280"
                      height="280"
                      alt="баннер"
                    />
                  </picture>
                  <p className="banner__info">
                    <span className="banner__message">Новинка!</span>
                    <span className="title title--h1">{camera.name}</span>
                    <span className="banner__text">{getBannerText(index)}</span>
                    <Link
                      className="btn"
                      to={generatePath(AppRoute.ProductPage, {id: camera.id.toString()})}
                    >
                      Подробнее
                    </Link>
                  </p>
                </SwiperSlide>
              ))
            }
            <div
              className="swiper-pagination"
              style={{
                position: 'absolute',
                bottom: '10px',
                left: '1300px',
                display: 'flex',
                gap: '8px',
              }}
            />
          </Swiper>
        )
      }
    </div>
  );
}

export default Banner;
