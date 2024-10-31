import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { describe, it, vi } from 'vitest';
import FilmsAppBar from '../FilmsAppBar';
import { getAuthToken } from '@utils/authToken';

vi.mock('@store/dialogStore', () => ({
  openDialog: vi.fn(),
}));

vi.mock('@utils/authToken', () => ({
  getAuthToken: vi.fn(),
  deleteAuthToken: vi.fn(),
}));

describe('Компонент панели управления', () => {
  it('Рендер названия приложения', () => {
    render(<FilmsAppBar />);
    expect(screen.getByText('ВК Фильмы')).toBeInTheDocument();
  });

  it('Рендер кнопки выхода, когда юзер авторизован', () => {
    vi.mocked(getAuthToken).mockReturnValueOnce('fakeToken');
    render(<FilmsAppBar />);
    expect(screen.getByLabelText('logout')).toBeInTheDocument();
  });
});
