import { CameraCategory } from '../cameras-types/cameras-types';

export type Filters = {
  minPrice?: number;
  maxPrice?: number;
  category?: CameraCategory | '';
  level?: string[];
  cameraType?: string[];
};
