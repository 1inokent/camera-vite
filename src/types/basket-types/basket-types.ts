import { Camera } from '../cameras-types/cameras-types';

export interface BasketItem extends Camera {
  quantity: number;
}

export type BasketItems = BasketItem[];
