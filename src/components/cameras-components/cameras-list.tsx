import CameraCard from './camera-card';

import { Cameras } from '../../types/cameras-types/cameras-types';
import SpinnerLoader from '../spinner-loader/spinner-loader';

type CamerasListProps = {
  cameras: Cameras;
  loading: boolean;
}

function CamerasList({cameras, loading}: CamerasListProps): JSX.Element {
  // if (loading || cameras.length === 0) {
  //   return (<SpinnerLoader />);
  // }

  return (
    <div className="cards catalog__cards">
      {
        loading && cameras.length === 0 ?
          <SpinnerLoader /> :
          cameras.map((camera) => (
            <CameraCard camera={camera} key={camera.id} />
          ))
      }
    </div>
  );
}

export default CamerasList;
