import { render, screen, waitFor } from '@testing-library/react';
import { vi, Mock } from 'vitest';
import Banner from './banner';
import { fetchCamerasPromoAction } from '../../store/slices/camera-promo-slice/cameras-promo-slice';
import { clearError, setError } from '../../store/slices/error-slice/error-slice';
import { useAppDispatch, useAppSelector } from '../../store/hook';
import { AnyAction } from 'redux';
import { FC, ReactNode } from 'react';

interface CameraType {
  id: number;
  name: string;
}

interface RootState {
  camerasPromo: {
    camerasPromo: CameraType[];
  };
}

vi.mock('swiper/react', () => {
  const Swiper: FC<{ children: ReactNode }> = ({ children }) => (
    <div data-testid="swiper">{children}</div>
  );
  const SwiperSlide: FC<{ children: ReactNode }> = ({ children }) => (
    <div data-testid="swiper-slide">{children}</div>
  );
  return { Swiper, SwiperSlide };
});

vi.mock('swiper/modules', () => ({
  Pagination: {},
  Autoplay: {},
}));

vi.mock('./banner-slider', () => ({
  default: ({ camera }: { camera: CameraType }) => (
    <div data-testid="banner-slider">{camera.name}</div>
  ),
}));

vi.mock('../../store/slices/camera-promo-slice/cameras-promo-slice', () => ({
  fetchCamerasPromoAction: vi.fn(
    () =>
      (): AnyAction => ({ type: 'FETCH_CAMERAS_PROMO' })
  ),
}));

vi.mock('../../store/slices/error-slice/error-slice', () => ({
  clearError: vi.fn(() => () => ({ type: 'CLEAR_ERROR' })),
  setError: vi.fn((error: string) => () => ({ type: 'SET_ERROR', payload: error })),
}));

vi.mock('../../store/hook', () => ({
  useAppDispatch: vi.fn(),
  useAppSelector: vi.fn(),
}));

describe('Banner Component', () => {
  const mockDispatch = vi.fn();
  let mockedState: RootState;

  beforeEach(() => {
    mockedState = {
      camerasPromo: {
        camerasPromo: [],
      },
    };

    (useAppDispatch as Mock).mockReturnValue(mockDispatch);
    (useAppSelector as Mock).mockImplementation((selector: (state: RootState) => unknown) =>
      selector(mockedState)
    );
    mockDispatch.mockClear();
    (fetchCamerasPromoAction as unknown as Mock).mockClear();
    (clearError as unknown as Mock).mockClear();
    (setError as unknown as Mock).mockClear();
  });

  test('renders without errors', () => {
    const { container } = render(<Banner />);
    expect(container.querySelector('.banner')).toBeInTheDocument();
  });

  test('dispatches fetchCamerasPromoAction on mount', async () => {
    render(<Banner />);

    await waitFor(() => {
      const mockAbortSignal = new AbortController().signal;

      expect(clearError).toHaveBeenCalled();
      expect(fetchCamerasPromoAction).toHaveBeenCalledWith({
        signal: mockAbortSignal,
      });
    });
  });

  test('renders Swiper when camerasPromo is not empty', () => {
    mockedState.camerasPromo.camerasPromo = [
      { id: 1, name: 'Camera 1' },
      { id: 2, name: 'Camera 2' },
    ];

    render(<Banner />);

    expect(screen.getByTestId('swiper')).toBeInTheDocument();
    expect(screen.getAllByTestId('swiper-slide')).toHaveLength(2);
    expect(screen.getAllByTestId('banner-slider')).toHaveLength(2);
    expect(screen.getByText('Camera 1')).toBeInTheDocument();
    expect(screen.getByText('Camera 2')).toBeInTheDocument();
  });

  test('does not render Swiper when camerasPromo is empty', () => {
    mockedState.camerasPromo.camerasPromo = [];

    render(<Banner />);

    expect(screen.queryByTestId('swiper')).not.toBeInTheDocument();
  });

  test('dispatches setError when fetchCamerasPromoAction fails', async () => {
    (fetchCamerasPromoAction as unknown as Mock).mockImplementation(
      () => {
        throw new Error('Some error');
      }
    );

    render(<Banner />);

    await waitFor(() => {
      expect(setError).toHaveBeenCalledWith('Ошибка загрузки камер');
    });
  });
});
