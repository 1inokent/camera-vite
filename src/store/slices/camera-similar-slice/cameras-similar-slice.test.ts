import { configureStore } from '@reduxjs/toolkit';
import { describe, it, expect, vi } from 'vitest';
import { AxiosError } from 'axios';
import { fetchCamerasSimilarAction } from './cameras-similar-slice';
import camerasSimilarReducer, {
  CamerasSimilarState,
} from './cameras-similar-slice';
import { createAPI } from '../../../service/api';
import { mockCamerasSimilar } from '../../../utils/mocks';

const mockApi = createAPI();
const apiGet = vi.spyOn(mockApi, 'get');

const createTestStore = () =>
  configureStore({
    reducer: {
      camerasSimilar: camerasSimilarReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ thunk: { extraArgument: mockApi } }),
  });

describe('Cameras Similar Slice', () => {
  it('should handle initial state', () => {
    const store = createTestStore();
    const state = store.getState().camerasSimilar;

    expect(state).toEqual({
      camerasSimilar: [],
      isLoading: false,
    } as CamerasSimilarState);
  });

  describe('fetchCamerasSimilarAction', () => {
    it('should fetch cameras similar successfully', async () => {
      apiGet.mockResolvedValueOnce({ data: mockCamerasSimilar });
      const store = createTestStore();

      await store.dispatch(
        fetchCamerasSimilarAction({
          signal: new AbortController().signal,
          id: '1',
        })
      );

      const state = store.getState().camerasSimilar;
      expect(state.camerasSimilar).toEqual(mockCamerasSimilar);
      expect(state.isLoading).toBe(false);
    });

    it('should handle fetch cameras similar error', async () => {
      const errorMessage = 'Не удалось загрузить похожие камеры';
      apiGet.mockRejectedValueOnce(new AxiosError(errorMessage));
      const store = createTestStore();

      const result = await store.dispatch(
        fetchCamerasSimilarAction({
          signal: new AbortController().signal,
          id: '1',
        })
      );

      const state = store.getState().camerasSimilar;
      expect(state.camerasSimilar).toEqual([]);
      expect(state.isLoading).toBe(false);
      expect(result.type).toBe(fetchCamerasSimilarAction.rejected.type);
    });

    it('should handle fetch cameras similar cancellation', async () => {
      const controller = new AbortController();
      const store = createTestStore();

      controller.abort();

      const result = await store.dispatch(
        fetchCamerasSimilarAction({ signal: controller.signal, id: '1' })
      );

      expect(result.type).toBe(fetchCamerasSimilarAction.rejected.type);
      expect(result.payload).toBe('Запрос был отменён');
    });
  });
});
