import { configureStore } from '@reduxjs/toolkit';
import { describe, it, expect, vi } from 'vitest';
import { AxiosError } from 'axios';
import camerasReducer, {
  fetchCamerasAction,
  CamerasState,
} from './cameras-slice';
import { createAPI } from '../../../service/api';
import { mockCameras } from '../../../utils/mocks';

const mockApi = createAPI();
const apiGet = vi.spyOn(mockApi, 'get');

const createTestStore = () =>
  configureStore({
    reducer: {
      cameras: camerasReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        thunk: { extraArgument: mockApi },
      }),
  });

describe('Cameras Slice', () => {
  it('should return the initial state', () => {
    const store = createTestStore();
    const state = store.getState().cameras;

    expect(state).toEqual({
      cameras: [],
      isLoading: false,
    } as CamerasState);
  });

  describe('fetchCamerasAction', () => {
    it('should fetch cameras successfully', async () => {
      apiGet.mockResolvedValueOnce({ data: mockCameras });
      const store = createTestStore();

      await store.dispatch(
        fetchCamerasAction({ signal: new AbortController().signal })
      );

      const state = store.getState().cameras;
      expect(state.cameras).toEqual(mockCameras);
      expect(state.isLoading).toBe(false);
    });

    it('should handle error while fetching cameras', async () => {
      const errorMessage = 'Ошибка загрузки камер';
      apiGet.mockRejectedValueOnce(new AxiosError(errorMessage));
      const store = createTestStore();

      const result = await store.dispatch(
        fetchCamerasAction({ signal: new AbortController().signal })
      );

      const state = store.getState().cameras;
      expect(state.cameras).toEqual([]);
      expect(state.isLoading).toBe(false);
      expect(result.type).toBe(fetchCamerasAction.rejected.type);
    });

    it('should handle request cancellation', async () => {
      const controller = new AbortController();
      const store = createTestStore();

      controller.abort();

      const result = await store.dispatch(
        fetchCamerasAction({ signal: controller.signal })
      );

      expect(result.type).toBe(fetchCamerasAction.rejected.type);
      expect(result.payload).toBe('Запрос был отменён');
    });
  });
});
