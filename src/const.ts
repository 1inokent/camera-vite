enum AppRoute {
  CatalogPage = '/',
  ProductPage = '/cameras/:id',
  BasketPage = '/card',
}

enum ApiRout {
  Cameras = '/cameras',
  Review = '/reviews',
  Similar = '/similar',
  Promo = '/promo',
  Orders = '/orders',
}

const PageNames = {
  Home: { name: 'Главная', key: 'home' },
  Catalog: { name: 'Каталог', key: 'catalog' },
  Basket: 'Корзина',
} as const;

const CameraTypes = {
  Сollectible: 'Коллекционная',
  Instant: 'Моментальная',
  Digital: 'Цифровая',
  Film: 'Плёночная',
} as const;

const CameraCategories = {
  VideoCamera: 'Видеокамера',
  PhotoCamera: 'Фотоаппарат',
} as const;

const CameraLevels = {
  Zero: 'Нулевой',
  Amateur: 'Любительский',
  Professional: 'Профессиональный',
} as const;

const ITEMS_PER_PAGE = 9;

export {
  AppRoute,
  ApiRout,
  PageNames,
  CameraTypes,
  CameraCategories,
  CameraLevels,
  ITEMS_PER_PAGE,
};
