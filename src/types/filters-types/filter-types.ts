import { CameraCategory } from '../cameras-types/cameras-types';

export type Filters = {
  minPrice?: number | null;
  maxPrice?: number | null;
  category?: CameraCategory | null;
  level?: string[];
  cameraType?: string[];
};
