import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Footer from './footer';
import { AppRoute } from '../../const';

describe('Footer Component', () => {
  it('renders correctly', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    const logoLink = screen.getByLabelText(/Переход на главную/i);
    expect(logoLink).toBeInTheDocument();
    expect(logoLink).toHaveAttribute('href', AppRoute.CatalogPage);

    const description = screen.getByText(/Интернет-магазин фото- и видеотехники/i);
    expect(description).toBeInTheDocument();

    const vkLink = screen.getByLabelText(/Переход на страницу вконтатке/i);
    expect(vkLink).toBeInTheDocument();

    const pinterestLink = screen.getByLabelText(/Переход на страницу pinterest/i);
    expect(pinterestLink).toBeInTheDocument();

    const redditLink = screen.getByLabelText(/Переход на страницу reddit/i);
    expect(redditLink).toBeInTheDocument();

    const catalogLink = screen.getByText(/Каталог/i);
    expect(catalogLink).toBeInTheDocument();
    expect(catalogLink).toHaveAttribute('href', AppRoute.CatalogPage);

    const warrantyLink = screen.getByText(/Гарантии/i);
    expect(warrantyLink).toBeInTheDocument();

    const deliveryLink = screen.getByText(/Доставка/i);
    expect(deliveryLink).toBeInTheDocument();

    const aboutLink = screen.getByText(/О компании/i);
    expect(aboutLink).toBeInTheDocument();

    const operatorCoursesLink = screen.getByText(/Курсы операторов/i);
    expect(operatorCoursesLink).toBeInTheDocument();

    const blogLink = screen.getByText(/Блог/i);
    expect(blogLink).toBeInTheDocument();

    const communityLink = screen.getByText(/Сообщество/i);
    expect(communityLink).toBeInTheDocument();

    const faqLink = screen.getByText(/FAQ/i);
    expect(faqLink).toBeInTheDocument();

    const askQuestionLink = screen.getByText(/Задать вопрос/i);
    expect(askQuestionLink).toBeInTheDocument();
  });

  it('should have correct links', () => {
    render(
      <MemoryRouter>
        <Footer />
      </MemoryRouter>
    );

    const catalogLink = screen.getByText(/Каталог/i);
    expect(catalogLink).toHaveAttribute('href', AppRoute.CatalogPage);
  });
});
