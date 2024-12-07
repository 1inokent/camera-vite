import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import ProductTabsMemo from './product-tabs';
import { mockProduct } from '../../utils/mocks';
import { MemoryRouter } from 'react-router-dom';

describe('ProductTabsMemo Component', () => {
  it('should render product characteristics by default', () => {
    render(
      <MemoryRouter>
        <ProductTabsMemo
          vendorCode={mockProduct.vendorCode}
          category={mockProduct.category}
          type={mockProduct.type}
          level={mockProduct.level}
          description={mockProduct.description}
        />
      </MemoryRouter>
    );

    expect(screen.getByText('Артикул:')).toBeInTheDocument();
    expect(screen.getByText(mockProduct.vendorCode)).toBeInTheDocument();
    expect(screen.getByText('Категория:')).toBeInTheDocument();
    expect(screen.getByText(mockProduct.category)).toBeInTheDocument();
    expect(screen.getByText('Тип камеры:')).toBeInTheDocument();
    expect(screen.getByText(mockProduct.type)).toBeInTheDocument();
    expect(screen.getByText('Уровень:')).toBeInTheDocument();
    expect(screen.getByText(mockProduct.level)).toBeInTheDocument();

    expect(screen.queryByText('This is a high-end DSLR camera.')).not.toBeInTheDocument();
  });

  it('should show description tab when clicked', () => {
    render(
      <MemoryRouter>
        <ProductTabsMemo
          vendorCode={mockProduct.vendorCode}
          category={mockProduct.category}
          type={mockProduct.type}
          level={mockProduct.level}
          description={mockProduct.description}
        />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Описание'));

    expect(screen.getByText('This is a high-end DSLR camera.')).toBeInTheDocument();

    expect(screen.queryByText('Артикул:')).not.toBeInTheDocument();
  });

  it('should switch back to characteristics tab when clicked', () => {
    render(
      <MemoryRouter>
        <ProductTabsMemo
          vendorCode={mockProduct.vendorCode}
          category={mockProduct.category}
          type={mockProduct.type}
          level={mockProduct.level}
          description={mockProduct.description}
        />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByText('Описание'));

    fireEvent.click(screen.getByText('Характеристики'));

    expect(screen.getByText('Артикул:')).toBeInTheDocument();
    expect(screen.getByText(mockProduct.vendorCode)).toBeInTheDocument();
    expect(screen.getByText('Категория:')).toBeInTheDocument();
    expect(screen.getByText(mockProduct.category)).toBeInTheDocument();
    expect(screen.getByText('Тип камеры:')).toBeInTheDocument();
    expect(screen.getByText(mockProduct.type)).toBeInTheDocument();
    expect(screen.getByText('Уровень:')).toBeInTheDocument();
    expect(screen.getByText(mockProduct.level)).toBeInTheDocument();

    expect(screen.queryByText('This is a high-end DSLR camera.')).not.toBeInTheDocument();
  });
});
