import { render, screen } from '@testing-library/react';
import App from './App';

beforeAll(() => {
  window.scrollTo = jest.fn();

  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: query.includes('reduce'),
      media: query,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
    })),
  });

  window.IntersectionObserver = class {
    observe() {}
    disconnect() {}
  };
});

test('renders Alphin Roy portfolio content', () => {
  render(<App />);
  expect(screen.getAllByText(/Alphin Roy/i).length).toBeGreaterThan(0);
  expect(screen.getByRole('navigation', { name: /primary navigation/i })).toBeInTheDocument();
});
