import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import CameraCard from './camera-card';
import { store } from '../../store';
import { mockCamera } from '../../utils/mocks';

describe('CameraCard Component', () => {
  it('renders correctly with given props', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CameraCard camera={mockCamera} />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByRole('name')).toBeInTheDocument();

    expect(screen.getByRole('price')).toBeInTheDocument();

    expect(screen.getByRole('rating')).toBeInTheDocument();
  });

  it('toggles the popup on button click', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CameraCard camera={mockCamera} />
        </MemoryRouter>
      </Provider>
    );

    fireEvent.click(screen.getByRole('button', { name: /Купить/i }));

    expect(screen.getByRole('name')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: /Закрыть/i }));
  });

  it('renders as active if isActive prop is true', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <CameraCard camera={mockCamera} isActive />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByRole('cardWrapper').closest('div')).toHaveClass('is-active');
  });
});
