import { describe, it, expect } from 'vitest';
import errorReducer, { setError, clearError } from './error-slice';

describe('errorSlice', () => {
  it('should return the initial state', () => {
    const initialState = { message: null };
    const state = errorReducer(undefined, { type: '' });
    expect(state).toEqual(initialState);
  });

  it('should handle setError', () => {
    const initialState = { message: null };
    const errorMessage = 'Произошла ошибка';

    const state = errorReducer(initialState, setError(errorMessage));

    expect(state.message).toBe(errorMessage);
  });

  it('should handle clearError', () => {
    const initialState = { message: 'Произошла ошибка' };

    const state = errorReducer(initialState, clearError());

    expect(state.message).toBe(null);
  });
});
