import { useEffect } from 'react';

import { clearError, setError } from '../../store/slices/error-slice/error-slice';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { fetchCamerasPromoAction } from '../../store/slices/camera-promo-slice/cameras-promo-slice';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/bundle';

import BannerSlider from './banner-slider';

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

      return `<span
          class="${className}"
          style="${bulletStyle}
          --swiper-pagination-bullet-inactive-color: #F4F4FC;"
          data-index="${index}">
          </span>`;
    },
    el: '.swiper-pagination',
  };

  useEffect(() => {
    const abortController = new AbortController();

    const fetchData = async () => {
      try {
        dispatch(clearError());
        await dispatch(fetchCamerasPromoAction({ signal: abortController.signal }));
      } catch (err) {
        if (!(err === 'Запрос был отменён')) {
          const errMessage = typeof err === 'string' ? err : 'Ошибка загрузки камер';
          dispatch(setError(errMessage));
        }
      }
    };

    fetchData();

    return () => {
      abortController.abort();
    };
  }, [dispatch]);

  return (
    <div className='banner' style={{ minHeight: 'auto', position: 'relative', width: '100%'}}>
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
                  <BannerSlider camera={camera} index={index} key={camera.id} />
                </SwiperSlide>
              ))
            }
            <div
              className="swiper-pagination"
              style={{
                position: 'absolute',
                bottom: '15px',
                marginRight: '50px',
                left: '89%',
                display: 'flex',
                gap: '8px',
                zIndex: 10,
              }}
            />
          </Swiper>
        )
      }
    </div>
  );
}

export default Banner;
