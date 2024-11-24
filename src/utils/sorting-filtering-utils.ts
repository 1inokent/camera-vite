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
    let isPriceValid = !filters.minPrice || !filters.maxPrice;
    if (filters.minPrice && filters.maxPrice) {
      isPriceValid =
        camera.price >= filters.minPrice && camera.price <= filters.maxPrice;
    } else if (filters.minPrice) {
      isPriceValid = camera.price >= filters.minPrice;
    } else if (filters.maxPrice) {
      isPriceValid = camera.price <= filters.maxPrice;
    }

    let isCategoryValid = !filters.category;
    if (filters.category) {
      isCategoryValid = filters.category === camera.category;
    }

    let isTypeValid = !filters.cameraType || !filters.cameraType?.length;
    if (filters.cameraType && filters.cameraType?.length) {
      isTypeValid = filters.cameraType.includes(camera.type);
    }

    let isLevelValid = !filters.level || !filters.level?.length;
    if (filters.level && filters.level?.length) {
      isLevelValid = filters.level.includes(camera.level);
    }

    return isPriceValid && isCategoryValid && isTypeValid && isLevelValid;
  });

export { sortingCameras, filterCamerasByParams };
