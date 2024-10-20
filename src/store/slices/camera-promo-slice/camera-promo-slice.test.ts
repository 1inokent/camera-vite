import { configureStore } from '@reduxjs/toolkit';
import { describe, it, expect, vi } from 'vitest';
import { AxiosError } from 'axios';
import { fetchCamerasPromoAction } from './cameras-promo-slice';
import camerasPromoReducer, { CamerasPromoState } from './cameras-promo-slice';
import { createAPI } from '../../../service/api';
import { mockCamerasPromo } from '../../../utils/mocks';

const mockApi = createAPI();
const apiGet = vi.spyOn(mockApi, 'get');

const createTestStore = () =>
  configureStore({
    reducer: {
      camerasPromo: camerasPromoReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ thunk: { extraArgument: mockApi } }),
  });

describe('Cameras Promo Slice', () => {
  it('should handle initial state', () => {
    const store = createTestStore();
    const state = store.getState().camerasPromo;

    expect(state).toEqual({
      camerasPromo: [],
      isLoading: false,
    } as CamerasPromoState);
  });

  describe('fetchCamerasPromoAction', () => {
    it('should fetch cameras promo successfully', async () => {
      apiGet.mockResolvedValueOnce({ data: mockCamerasPromo });
      const store = createTestStore();

      await store.dispatch(
        fetchCamerasPromoAction({ signal: new AbortController().signal })
      );

      const state = store.getState().camerasPromo;
      expect(state.camerasPromo).toEqual(mockCamerasPromo);
      expect(state.isLoading).toBe(false);
    });

    it('should handle fetch cameras promo error', async () => {
      const errorMessage = 'Не удалось загрузить акционные камеры';
      apiGet.mockRejectedValueOnce(new AxiosError(errorMessage));
      const store = createTestStore();

      const result = await store.dispatch(
        fetchCamerasPromoAction({ signal: new AbortController().signal })
      );

      const state = store.getState().camerasPromo;
      expect(state.camerasPromo).toEqual([]);
      expect(state.isLoading).toBe(false);
      expect(result.type).toBe(fetchCamerasPromoAction.rejected.type);
    });

    it('should handle fetch cameras promo cancellation', async () => {
      const controller = new AbortController();
      const store = createTestStore();

      controller.abort();

      const result = await store.dispatch(
        fetchCamerasPromoAction({ signal: controller.signal })
      );

      expect(result.type).toBe(fetchCamerasPromoAction.rejected.type);
      expect(result.payload).toBe('Запрос был отменён');
    });
  });
});
