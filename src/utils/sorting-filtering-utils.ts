import { Cameras } from '../types/cameras-types/cameras-types';

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

export { sortingCameras };
