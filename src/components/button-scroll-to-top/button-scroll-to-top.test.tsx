import { render, fireEvent } from '@testing-library/react';
import ButtonScrollToTop from './button-scroll-to-top';
import { smoothScrollToTop } from '../../utils/utils';
import { vi } from 'vitest';

vi.mock('../../utils/utils', () => ({
  smoothScrollToTop: vi.fn(),
}));

describe('ButtonScrollToTop', () => {
  it('renders correctly', () => {
    const { getByRole } = render(<ButtonScrollToTop />);
    const button = getByRole('link');

    expect(button).toBeInTheDocument();
    expect(button).toHaveStyle('opacity: 0.7');
  });

  it('calls smoothScrollToTop on click', () => {
    const { getByRole } = render(<ButtonScrollToTop />);
    const button = getByRole('link');

    fireEvent.click(button);

    expect(smoothScrollToTop).toHaveBeenCalled();
  });

  it('changes opacity on mouse enter and leave', () => {
    const { getByRole } = render(<ButtonScrollToTop />);
    const button = getByRole('link');

    expect(button).toHaveStyle('opacity: 0.7');

    fireEvent.mouseEnter(button);
    expect(button).toHaveStyle('opacity: 1');

    fireEvent.mouseLeave(button);
    expect(button).toHaveStyle('opacity: 0.7');
  });
});
