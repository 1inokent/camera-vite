import { Cameras } from '../types/cameras-types/cameras-types';
import { Filters } from '../types/filters-types/filter-types';

const sortingCameras = (
  cameras: Cameras,
  sortType: 'price' | 'rating',
  sortOrder: 'asc' | 'desc'
) =>
  [...cameras].sort((a, b) => {
    const valueA = sortType === 'price' ? a.price : a.rating;
    const valueB = sortType === 'price' ? b.price : b.rating;
    return sortOrder === 'asc' ? valueA - valueB : valueB - valueA;
  });

const filterCamerasByParams = (cameras: Cameras, filters: Filters): Cameras =>
  cameras.filter((camera) => {
    const isPriceValid =
      (!filters.minPrice || camera.price >= filters.minPrice) &&
      (!filters.maxPrice || camera.price <= filters.maxPrice);
    const isCategoryValid =
      !filters.category || camera.category === filters.category;
    const isTypeValid =
      !filters.cameraType || filters.cameraType.includes(camera.type);
    const isLevelValid = !filters.level || filters.level.includes(camera.level);

    return isPriceValid && isCategoryValid && isTypeValid && isLevelValid;
  });

export { sortingCameras, filterCamerasByParams };
