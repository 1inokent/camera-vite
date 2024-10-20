import { configureStore } from '@reduxjs/toolkit';
import { describe, it, expect, vi } from 'vitest';
import { AxiosError } from 'axios';
import { fetchCameraReviewAction } from './camera-review-slice';
import cameraReviewReducer, { CameraReviewState } from './camera-review-slice';
import { createAPI } from '../../../service/api';
import { mockCameraReviews } from '../../../utils/mocks';

const mockApi = createAPI();
const apiGet = vi.spyOn(mockApi, 'get');

const createTestStore = () =>
  configureStore({
    reducer: {
      cameraReview: cameraReviewReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ thunk: { extraArgument: mockApi } }),
  });

describe('Camera Review Slice', () => {
  it('should handle initial state', () => {
    const store = createTestStore();
    const state = store.getState().cameraReview;

    expect(state).toEqual({
      reviews: [],
      isLoading: false,
    } as CameraReviewState);
  });

  describe('fetchCameraReviewAction', () => {
    it('should fetch camera reviews successfully', async () => {
      apiGet.mockResolvedValueOnce({ data: mockCameraReviews });
      const store = createTestStore();

      await store.dispatch(
        fetchCameraReviewAction({
          signal: new AbortController().signal,
          id: '1',
        })
      );

      const state = store.getState().cameraReview;
      expect(state.reviews).toEqual(mockCameraReviews);
      expect(state.isLoading).toBe(false);
    });

    it('should handle fetch camera reviews error', async () => {
      const errorMessage = 'Не удалось загрузить отзывы';
      apiGet.mockRejectedValueOnce(new AxiosError(errorMessage));
      const store = createTestStore();

      const result = await store.dispatch(
        fetchCameraReviewAction({
          signal: new AbortController().signal,
          id: '1',
        })
      );

      const state = store.getState().cameraReview;
      expect(state.reviews).toEqual([]);
      expect(state.isLoading).toBe(false);
      expect(result.type).toBe(fetchCameraReviewAction.rejected.type);
    });

    it('should handle fetch camera reviews cancellation', async () => {
      const controller = new AbortController();
      const store = createTestStore();

      controller.abort();

      const result = await store.dispatch(
        fetchCameraReviewAction({ signal: controller.signal, id: '1' })
      );

      expect(result.type).toBe(fetchCameraReviewAction.rejected.type);
      expect(result.payload).toBe('Запрос был отменён');
    });
  });
});
