enum AppRoute {
  CatalogPage = '/',
}

enum ApiRout {
  Cameras = '/cameras',
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

export { AppRoute, ApiRout, CameraTypes, CameraCategories, CameraLevel };
