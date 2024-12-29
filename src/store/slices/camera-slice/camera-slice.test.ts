import { configureStore } from '@reduxjs/toolkit';
import { describe, it, expect, vi } from 'vitest';
import { AxiosError } from 'axios';
import { fetchCameraAction } from './camera-slice';
import cameraReducer, { CameraState } from './camera-slice';
import { createAPI } from '../../../service/api';
import { mockCamera } from '../../../utils/mocks';

const mockCameraTest = mockCamera;

const mockApi = createAPI();
const apiGet = vi.spyOn(mockApi, 'get');

const createTestStore = () =>
  configureStore({
    reducer: {
      camera: cameraReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ thunk: { extraArgument: mockApi } }),
  });

describe('Camera Slice', () => {
  it('should handle initial state', () => {
    const store = createTestStore();
    const state = store.getState().camera;

    expect(state).toEqual({
      camera: null,
      isLoading: false,
    } as CameraState);
  });

  describe('fetchCameraAction', () => {
    it('should fetch camera successfully', async () => {
      apiGet.mockResolvedValueOnce({ data: mockCameraTest });
      const store = createTestStore();

      await store.dispatch(
        fetchCameraAction({ signal: new AbortController().signal, id: '1' })
      );

      const state = store.getState().camera;
      expect(state.camera).toEqual(mockCameraTest);
      expect(state.isLoading).toBe(false);
    });

    it('should handle fetch camera error', async () => {
      const errorMessage = 'Не удалось загрузить камеру';
      apiGet.mockRejectedValueOnce(new AxiosError(errorMessage));
      const store = createTestStore();

      const result = await store.dispatch(
        fetchCameraAction({ signal: new AbortController().signal, id: '1' })
      );

      const state = store.getState().camera;
      expect(state.camera).toBeNull();
      expect(state.isLoading).toBe(false);
      expect(result.type).toBe(fetchCameraAction.rejected.type);
    });

    it('should handle fetch camera cancellation', async () => {
      const controller = new AbortController();
      const store = createTestStore();

      controller.abort();

      const result = await store.dispatch(
        fetchCameraAction({ signal: controller.signal, id: '1' })
      );

      expect(result.type).toBe(fetchCameraAction.rejected.type);
      expect(result.payload).toBe('Запрос был отменён');
    });
  });
});
