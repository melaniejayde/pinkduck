// Mock the Analytics component before imports
jest.mock('@vercel/analytics/react', () => ({
  Analytics: jest.fn(() => null),
}), { virtual: true });

import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the app', () => {
  render(<App />);
  const button = screen.getByRole('button', { name: /make the pink duck quack/i });
  expect(button).toBeInTheDocument();
});
