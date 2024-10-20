import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Breadcrumbs from './breadcrumbs';
import { AppRoute } from '../../const';

describe('Breadcrumbs Component', () => {
  it('renders correctly with product name', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={[AppRoute.CatalogPage]}>
        <Breadcrumbs productName="Товар 1" />
      </MemoryRouter>
    );

    expect(getByText('Главная')).toBeInTheDocument();
    expect(getByText('Каталог')).toBeInTheDocument();
    expect(getByText('Товар 1')).toBeInTheDocument();
  });

  it('renders correctly without product name', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={[AppRoute.CatalogPage]}>
        <Breadcrumbs />
      </MemoryRouter>
    );

    expect(getByText('Главная')).toBeInTheDocument();
    expect(getByText('Каталог')).toBeInTheDocument();
  });

  it('renders active link for the last breadcrumb', () => {
    const { getByText } = render(
      <MemoryRouter initialEntries={[AppRoute.CatalogPage]}>
        <Breadcrumbs productName="Товар 1" />
      </MemoryRouter>
    );

    const lastLink = getByText('Товар 1').closest('a');
    expect(lastLink).toHaveClass('breadcrumbs__link--active');
  });
});
