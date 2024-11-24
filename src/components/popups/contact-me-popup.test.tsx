import { render, screen, fireEvent } from '@testing-library/react';
import ContactMePopup from './contact-me-popup';
import { vi } from 'vitest';
import { Provider } from 'react-redux';
import { store } from '../../store';
import { mockCamera } from '../../utils/mocks';

const mockOnClose = vi.fn();

function renderWithStore(ui: JSX.Element) {
  return render(<Provider store={store}>{ui}</Provider>);
}

describe('ContactMePopup component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('should render the modal with camera details', () => {
    renderWithStore(<ContactMePopup content={mockCamera} onClose={mockOnClose} />);
    const article = screen.getByText(/Артикул:/i);

    expect(article).toBeInTheDocument();
    expect(article.nextSibling?.textContent).toBe('12345');

    expect(screen.getByText(/Свяжитесь со мной/i)).toBeInTheDocument();
    expect(screen.getByText(/Test Camera/i)).toBeInTheDocument();
    expect(screen.getByText(/Коллекционная Видеокамера/i)).toBeInTheDocument();
    expect(screen.getByText(/Нулевой уровень/i)).toBeInTheDocument();
    expect(screen.getByText(/100 000 ₽/i)).toBeInTheDocument();
  });

  test('should call onClose when clicking on the overlay', () => {
    renderWithStore(<ContactMePopup content={mockCamera} onClose={mockOnClose} />);
    const overlay = screen.getByRole('presentation');

    fireEvent.click(overlay);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test('should call onClose when Escape key is pressed', () => {
    renderWithStore(<ContactMePopup content={mockCamera} onClose={mockOnClose} />);

    fireEvent.keyDown(window, { key: 'Escape' });

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  test('should display error if user submits without entering phone number', async () => {
    renderWithStore(<ContactMePopup content={mockCamera} onClose={mockOnClose} />);

    fireEvent.click(screen.getByRole('button', { name: /заказать/i }));

    expect(await screen.findByText(/Нужно указать номер/i)).toBeInTheDocument();
  });

  test('should validate phone number format and show error on invalid input', async () => {
    renderWithStore(<ContactMePopup content={mockCamera} onClose={mockOnClose} />);
    const input = screen.getByPlaceholderText(/Введите ваш номер/i);

    fireEvent.input(input, {
      target: { value: '+7(000)000-00-00' },
    });

    fireEvent.click(screen.getByRole('button', { name: /заказать/i }));

    expect(await screen.findByText(/Телефон в формате/i)).toBeInTheDocument();
  });

  test('should submit form with valid phone number', () => {
    renderWithStore(<ContactMePopup content={mockCamera} onClose={mockOnClose} />);

    fireEvent.change(screen.getByPlaceholderText(/Введите ваш номер/i), {
      target: { value: '+7(999)999-99-99' },
    });

    fireEvent.click(screen.getByRole('button', { name: /заказать/i }));

    expect(screen.queryByText(/Введите телефон в формате/i)).not.toBeInTheDocument();
  });
});
