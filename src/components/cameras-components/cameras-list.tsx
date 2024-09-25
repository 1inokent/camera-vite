import { Cameras } from '../../types/cameras-types/cameras-types';
import CameraCard from './camera-card';

type CamerasListProps = {
  cameras: Cameras;
}

function CameraList({cameras}: CamerasListProps): JSX.Element {
  return (
    <div className="cards catalog__cards">
      {
        cameras.map((camera) => (
          <CameraCard camera={camera} key={camera.id} />
        ))
      }
    </div>
  );
}

export default CameraList;
