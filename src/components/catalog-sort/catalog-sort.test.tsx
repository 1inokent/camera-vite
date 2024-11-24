import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import CatalogSort from './catalog-sort';

describe('CatalogSort Component', () => {
  const mockOnSortTypeChange = vi.fn();
  const mockOnSortOrderChange = vi.fn();

  const setup = (sortType: 'price' | 'rating' = 'price', sortOrder: 'asc' | 'desc' = 'asc') => {
    render(
      <CatalogSort
        sortType={sortType}
        sortOrder={sortOrder}
        onSortTypeChange={mockOnSortTypeChange}
        onSortOrderChange={mockOnSortOrderChange}
      />
    );
  };

  it('renders correctly with default props', () => {
    setup();

    expect(screen.getByText(/Сортировать:/i)).toBeInTheDocument();

    expect(screen.getByLabelText(/по цене/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/по популярности/i)).toBeInTheDocument();

    expect(screen.getByLabelText(/По возрастанию/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/По убыванию/i)).toBeInTheDocument();
  });

  it('calls onSortTypeChange when changing sort type', () => {
    setup();

    const sortByRatingRadio = screen.getByLabelText(/по популярности/i);
    fireEvent.click(sortByRatingRadio);

    expect(mockOnSortTypeChange).toHaveBeenCalledWith('rating');
    expect(mockOnSortTypeChange).toHaveBeenCalledTimes(1);
  });

  it('calls onSortOrderChange when changing sort order', () => {
    setup();

    const sortAscRadio = screen.getByLabelText(/По убыванию/i);
    fireEvent.click(sortAscRadio);

    expect(mockOnSortOrderChange).toHaveBeenCalledWith('desc');
    expect(mockOnSortOrderChange).toHaveBeenCalledTimes(1);
  });

  it('marks the correct sort type as checked', () => {
    setup('rating', 'asc');

    const sortByPriceRadio = screen.getByLabelText(/по цене/i);
    const sortByRatingRadio = screen.getByLabelText(/по популярности/i);

    expect(sortByPriceRadio).not.toBeChecked();
    expect(sortByRatingRadio).toBeChecked();
  });

  it('marks the correct sort order as checked', () => {
    setup('price', 'desc');

    const sortAscRadio = screen.getByLabelText(/По возрастанию/i);
    const sortDescRadio = screen.getByLabelText(/По убыванию/i);

    expect(sortAscRadio).not.toBeChecked();
    expect(sortDescRadio).toBeChecked();
  });
});
