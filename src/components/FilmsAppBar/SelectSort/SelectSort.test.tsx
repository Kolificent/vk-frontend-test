import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import SelectSort from '../SelectSort';

vi.mock('@store/filmsStore', () => ({
  filmsStore: {
    changeSort: vi.fn(),
    sort: 0,
    isOrderAscending: true,
  },
}));

describe('Селектор сортировки SelectSort', () => {
  it('Правильный рендер', () => {
    render(<SelectSort />);
    expect(screen.getByLabelText('selectSort')).toBeInTheDocument();
  });
});
