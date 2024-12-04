enum AppRoute {
  CatalogPage = '/',
  ProductPage = '/cameras/:id',
  BasketPage = '/card'
}

enum ApiRout {
  Cameras = '/cameras',
  Review = '/reviews',
  Similar = '/similar',
  Promo = '/promo',
  Orders = '/orders',
}

const CameraTypes = {
  CTypesCamerasollectible: 'Коллекционная',
  Instant: 'Моментальная',
  Digital: 'Цифровая',
  Film: 'Плёночная',
} as const;

const CameraCategories = {
  VideoCamera: 'Видеокамера',
  PhotoCamera: 'Фотоаппарат',
} as const;

const CameraLevel = {
  Zero: 'Нулевой',
  Amateur: 'Любительский',
  Professional: 'Профессиональный',
} as const;

const PHONE_REGULAR_EXPRESSION =
  /^(\+7|8)\s*\(?9\d{2}\)?[\s-]?\d{3}[\s-]?\d{2}[\s-]?\d{2}$/;

const ITEMS_PER_PAGE = 9;

export {
  AppRoute,
  ApiRout,
  CameraTypes,
  CameraCategories,
  CameraLevel,
  PHONE_REGULAR_EXPRESSION,
  ITEMS_PER_PAGE
};
