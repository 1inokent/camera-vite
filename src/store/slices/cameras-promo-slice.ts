import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CamerasPromo } from '../../types/cameras-promo-types/cameras-promo-types';
import { clearError, setError } from './error-slice';
import { ApiRout } from '../../const';
import { AxiosError, AxiosInstance } from 'axios';

interface CamerasPromoState {
  camerasPromo: CamerasPromo;
  isLoading: boolean;
}

const initialState: CamerasPromoState = {
  camerasPromo: [],
  isLoading: false,
};

export const fetchCamerasPromoAction = createAsyncThunk<
  CamerasPromo,
  { signal: AbortSignal },
  { extra: AxiosInstance; rejectValue: string }
>(
  'promo/fetchCamerasPromo',
  async ({ signal }, { extra: api, dispatch, rejectWithValue }) => {
    dispatch(clearError());
    try {
      const { data } = await api.get<CamerasPromo>(ApiRout.Promo, { signal });
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.name === 'CanceledError') {
          return rejectWithValue('Запрос был отменён');
        }
        const errorMessage = error.message || 'Произошла неизвестная ошибка';
        dispatch(setError(errorMessage));
        return rejectWithValue(errorMessage);
      }
      return rejectWithValue('Произошла неизвестная ошибка');
    }
  }
);

const CamerasPromoSlice = createSlice({
  name: 'CamerasPromo',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCamerasPromoAction.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCamerasPromoAction.fulfilled, (state, action) => {
        state.camerasPromo = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchCamerasPromoAction.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default CamerasPromoSlice.reducer;
