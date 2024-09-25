import { CameraCategories, CameraLevel, CameraTypes } from '../../const';

export type CameraType = (typeof CameraTypes)[keyof typeof CameraTypes];
export type CameraCategory =
  (typeof CameraCategories)[keyof typeof CameraCategories];
export type CameraLevelType = (typeof CameraLevel)[keyof typeof CameraLevel];

export type Camera = {
  id: number;
  name: string;
  vendorCode: string;
  type: CameraType;
  category: CameraCategory;
  description: string;
  level: CameraLevelType;
  price: number;
  rating: number;
  reviewCount: number;
  previewImg: string;
  previewImg2x: string;
  previewImgWebp: string;
  previewImgWebp2x: string;
};

export type Cameras = Camera[];
