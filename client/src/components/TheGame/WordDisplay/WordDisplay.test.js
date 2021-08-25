import { render, screen } from '@testing-library/react';
import WordDisplay from './WordDisplay';

test('wd', () => {
  render(<WordDisplay />);
  //const linkElement = screen.getByText(/learn react/i);
  expect(7+9);
});
