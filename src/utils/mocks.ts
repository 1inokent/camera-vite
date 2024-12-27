import { BasketItems } from '../types/basket-types/basket-types';
import { CameraFetchReview, CameraReviewSubmit } from '../types/camera-review-types/camera-review-types';
import { CamerasPromo } from '../types/cameras-promo-types/cameras-promo-types';
import { Camera, Cameras } from '../types/cameras-types/cameras-types';
import { Filters } from '../types/filters-types/filter-types';

const mockCamera: Camera = {
  id: 2,
  previewImgWebp: 'camera.webp',
  previewImgWebp2x: 'camera@2x.webp',
  previewImg: 'camera.png',
  previewImg2x: 'camera@2x.png',
  name: 'Test Camera',
  category: 'Видеокамера',
  vendorCode: '12345',
  type: 'Коллекционная',
  level: 'Нулевой',
  price: 100000,
  description: 'какой то текст',
  rating: 3,
  reviewCount: 12,
};

const mockCameraReviews: CameraFetchReview = {
  id: 'f1d10ddd-2a21-4f71-9e1e-5f511703fbdd',
  createAt: '2022-07-09T13:24:57.980Z',
  cameraId: 1,
  userName: 'Кирилл',
  advantage: 'Легкая в плане веса, удобная в интерфейсе',
  disadvantage: 'Быстро садиться зарядка',
  review: 'Это моя первая камера. Я в восторге, нареканий нет',
  rating: 5,
};

const mockCamerasPromo: CamerasPromo = [
  {
    id: 1,
    name: 'Фотоаппарат Look 54',
    previewImg: 'img/content/promo.jpg',
    previewImg2x: 'img/content/promo@2x.jpg',
    previewImgWebp: 'img/content/promo.webp',
    previewImgWebp2x: 'img/content/promo@2x.webp',
  },
  {
    id: 2,
    name: 'Фотоаппарат Click Pro',
    previewImg: 'img/content/promo.jpg',
    previewImg2x: 'img/content/promo@2x.jpg',
    previewImgWebp: 'img/content/promo.webp',
    previewImgWebp2x: 'img/content/promo@2x.webp',
  },
  {
    id: 3,
    name: 'Видеокамера Click Lite R',
    previewImg: 'img/content/promo.jpg',
    previewImg2x: 'img/content/promo@2x.jpg',
    previewImgWebp: 'img/content/promo.webp',
    previewImgWebp2x: 'img/content/promo@2x.webp',
  },
];

const mockCamerasSimilar: Cameras = [
  {
    id: 1,
    name: 'Фотоаппарат Look 54',
    vendorCode: 'DA4IU67AD5',
    type: 'Коллекционная',
    category: 'Видеокамера',
    description:
      'Немецкий концерн BRW разработал видеокамеру Das Auge IV в начале 80-х годов, однако она до сих пор пользуется популярностью среди коллекционеров и яростных почитателей старинной техники.',
    level: 'Нулевой',
    price: 65000,
    rating: 5,
    reviewCount: 16,
    previewImg: 'img/content/das-auge.jpg',
    previewImg2x: 'img/content/das-auge@2x.jpg',
    previewImgWebp: 'img/content/das-auge.webp',
    previewImgWebp2x: 'img/content/das-auge@2x.webp',
  },
  {
    id: 2,
    name: 'Ретрокамера Dus Auge lV',
    vendorCode: 'DA4IU67AD5',
    type: 'Коллекционная',
    category: 'Видеокамера',
    description:
      'Немецкий концерн BRW разработал видеокамеру Das Auge IV в начале 80-х годов, однако она до сих пор пользуется популярностью среди коллекционеров и яростных почитателей старинной техники.',
    level: 'Нулевой',
    price: 1000,
    rating: 3,
    reviewCount: 11,
    previewImg: 'img/content/das-auge.jpg',
    previewImg2x: 'img/content/das-auge@2x.jpg',
    previewImgWebp: 'img/content/das-auge.webp',
    previewImgWebp2x: 'img/content/das-auge@2x.webp',
  },
];

const mockCameras: Cameras = [
  {
    id: 1,
    name: 'Фотоаппарат Look 54',
    vendorCode: 'DA4IU67AD5',
    type: 'Коллекционная',
    category: 'Видеокамера',
    description:
      'Немецкий концерн BRW разработал видеокамеру Das Auge IV в начале 80-х годов, однако она до сих пор пользуется популярностью среди коллекционеров и яростных почитателей старинной техники.',
    level: 'Нулевой',
    price: 65000,
    rating: 5,
    reviewCount: 16,
    previewImg: 'img/content/das-auge.jpg',
    previewImg2x: 'img/content/das-auge@2x.jpg',
    previewImgWebp: 'img/content/das-auge.webp',
    previewImgWebp2x: 'img/content/das-auge@2x.webp',
  },
  {
    id: 2,
    name: 'Ретрокамера Dus Auge lV',
    vendorCode: 'DA4IU67AD5',
    type: 'Коллекционная',
    category: 'Видеокамера',
    description:
      'Немецкий концерн BRW разработал видеокамеру Das Auge IV в начале 80-х годов, однако она до сих пор пользуется популярностью среди коллекционеров и яростных почитателей старинной техники.',
    level: 'Нулевой',
    price: 1000,
    rating: 3,
    reviewCount: 11,
    previewImg: 'img/content/das-auge.jpg',
    previewImg2x: 'img/content/das-auge@2x.jpg',
    previewImgWebp: 'img/content/das-auge.webp',
    previewImgWebp2x: 'img/content/das-auge@2x.webp',
  },
];

const mockProduct = {
  vendorCode: '12345',
  category: 'Cameras',
  type: 'DSLR',
  level: 'Professional',
  description:
    'This is a high-end DSLR camera. It comes with a variety of features and accessories.',
};

const mockFilters: Filters = {
  minPrice: 1000,
  maxPrice: 50000,
  category: null,
  cameraType: [],
  level: [],
};

const mockCameraReviewSubmit: CameraReviewSubmit = {
  cameraId: 4,
  userName: 'Test Camera',
  advantage: 'random text from advantage test',
  disadvantage: 'random text from disadvantage test',
  review: 'random text from review test',
  rating: 4
};

const mockBasketCameras: BasketItems = [
  {
    quantity: 2,
    id: 4,
    name: 'Test Camera 1',
    vendorCode: '12345',
    type: 'Коллекционная',
    category: 'Видеокамера',
    description: 'This is a high-end DSLR camera. It comes with a variety of features and accessories.',
    level: 'Нулевой',
    price: 20000,
    rating: 4,
    reviewCount: 12,
    previewImg: 'img/content/das-auge.jpg',
    previewImg2x: 'img/content/das-auge@2x.jpg',
    previewImgWebp: 'img/content/das-auge.webp',
    previewImgWebp2x: 'img/content/das-auge@2x.webp',
  },
  {
    quantity: 2,
    id: 4,
    name: 'Test Camera 12',
    vendorCode: '123245',
    type: 'Коллекционная',
    category: 'Видеокамера',
    description: 'This is a high-end DSLR camera. It comes with a variety of features and accessories.',
    level: 'Нулевой',
    price: 220000,
    rating: 3,
    reviewCount: 15,
    previewImg: 'img/content/das-auge.jpg',
    previewImg2x: 'img/content/das-auge@2x.jpg',
    previewImgWebp: 'img/content/das-auge.webp',
    previewImgWebp2x: 'img/content/das-auge@2x.webp',
  }
];

export {
  mockCamera,
  mockCameraReviews,
  mockCamerasPromo,
  mockCamerasSimilar,
  mockCameras,
  mockProduct,
  mockFilters,
  mockCameraReviewSubmit,
  mockBasketCameras
};
