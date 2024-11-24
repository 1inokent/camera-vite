import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import CamerasList from './cameras-list';
import { store } from '../../store';
import { mockCameras } from '../../utils/mocks';

describe('CamerasList Component', () => {
  it('renders correctly with given cameras', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CamerasList cameras={mockCameras} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getAllByRole('cardWrapper')).toHaveLength(mockCameras.length);

    mockCameras.forEach((camera) => {
      const correctName = camera.id === 1 ? camera.name : `${camera.category} ${camera.name}`;
      expect(screen.getByText(correctName)).toBeInTheDocument();
    });
  });

  it('renders an empty list when no cameras are provided', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CamerasList cameras={[]} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.queryAllByRole('cardWrapper')).toHaveLength(0);
  });
});
