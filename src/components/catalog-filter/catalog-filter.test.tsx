import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import CatalogFilter from './catalog-filter';
import { mockFilters } from '../../utils/mocks';

describe('CatalogFilter Component', () => {
  const mockOnFilterChange = vi.fn();

  it('renders correctly with default props', () => {
    render(
      <CatalogFilter
        onFilterChange={mockOnFilterChange}
        filters={mockFilters}
        minPrice={1000}
        maxPrice={50000}
      />
    );

    expect(screen.getByText(/Цена, ₽/i)).toBeInTheDocument();
    expect(screen.getByText(/Категория/i)).toBeInTheDocument();
    expect(screen.getByText(/Тип камеры/i)).toBeInTheDocument();
    expect(screen.getByText(/Уровень/i)).toBeInTheDocument();

    expect(screen.getByPlaceholderText('1000')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('50000')).toBeInTheDocument();

    expect(screen.getByRole('button', { name: /Сбросить фильтры/i })).toBeInTheDocument();
  });

  it('calls onFilterChange when price inputs change', () => {
    render(
      <CatalogFilter
        onFilterChange={mockOnFilterChange}
        filters={mockFilters}
        minPrice={1000}
        maxPrice={50000}
      />
    );

    const priceFromInput = screen.getByPlaceholderText('1000') ;
    fireEvent.change(priceFromInput, { target: { value: '2000' } });
    fireEvent.blur(priceFromInput);

    if (priceFromInput instanceof HTMLInputElement) {
      fireEvent.change(priceFromInput, { target: { value: '2000' } });
      fireEvent.blur(priceFromInput);

      expect(priceFromInput.value).toBe('2000');
      expect(mockOnFilterChange).toHaveBeenCalledWith(
        expect.objectContaining({
          minPrice: 2000,
        }));
    } else {
      throw new Error('Expected input element');
    }
  });

  it('updates category on radio button change', () => {
    render(
      <CatalogFilter
        onFilterChange={mockOnFilterChange}
        filters={mockFilters}
        minPrice={1000}
        maxPrice={50000}
      />
    );

    const photoCategoryRadio = screen.getByLabelText(/Фотоаппарат/i);
    fireEvent.click(photoCategoryRadio);

    expect(mockOnFilterChange).toHaveBeenCalledWith(
      expect.objectContaining({
        category: 'Фотоаппарат',
      }));

    const videoCategoryRadio = screen.getByLabelText(/Видеокамера/i);
    fireEvent.click(videoCategoryRadio);

    expect(mockOnFilterChange).toHaveBeenCalledWith(
      expect.objectContaining({
        category: 'Видеокамера',
      }));
  });

  it('disables specific camera types when category is "Видеокамера"', () => {
    render(
      <CatalogFilter
        onFilterChange={mockOnFilterChange}
        filters={mockFilters}
        minPrice={1000}
        maxPrice={50000}
      />
    );

    const videoCategoryRadio = screen.getByLabelText(/Видеокамера/i);
    fireEvent.click(videoCategoryRadio);

    const instantCheckbox = screen.getByLabelText(/Моментальная/i);
    const filmCheckbox = screen.getByLabelText(/Плёночная/i);
    expect(instantCheckbox).toBeDisabled();
    expect(filmCheckbox).toBeDisabled();
  });

  it('calls onFilterChange when resetting filters', () => {
    render(
      <CatalogFilter
        onFilterChange={mockOnFilterChange}
        filters={mockFilters}
        minPrice={1000}
        maxPrice={50000}
      />
    );

    const resetButton = screen.getByRole('button', { name: /Сбросить фильтры/i });
    fireEvent.click(resetButton);

    expect(mockOnFilterChange).toHaveBeenCalledWith({
      minPrice: null,
      maxPrice: null,
      category: null,
      cameraType: [],
      level: [],
    });
  });
});
