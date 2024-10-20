import { CameraPromo } from '../../types/cameras-promo-types/cameras-promo-types';
import { getBannerText } from '../../utils/utils';
import { Link, generatePath } from 'react-router-dom';
import { AppRoute } from '../../const';

type BannerSliderProps = {
  camera : CameraPromo;
  index: number;
}

function BannerSlider({camera, index}: BannerSliderProps): JSX.Element {
  return (
    <>
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
    </>
  );
}

export default BannerSlider;
