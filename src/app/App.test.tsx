import { render, screen } from '@testing-library/react';
import { describe, it, vi, expect } from 'vitest';
import App from '../app';
import * as authUtils from '@utils/authToken';

vi.mock('@components/FilmsGrid', () => ({
  default: () => <div>FilmsGrid Component</div>,
}));

vi.mock('@components/FilmsAppBar', () => ({
  default: () => <div>FilmsAppBar Component</div>,
}));

describe('Основной компонент приложения', () => {
  it('Рендер сетки фильмов, если юзер авторизован', () => {
    vi.spyOn(authUtils, 'getAuthToken').mockReturnValue('mockToken');

    render(<App />);

    expect(screen.getByText('FilmsGrid Component')).toBeInTheDocument();
    expect(
      screen.queryByText(/Необходимо провести аутентификацию/),
    ).not.toBeInTheDocument();
  });

  it('Панель управления должна всегда рендериться', () => {
    render(<App />);

    expect(screen.getByText('FilmsAppBar Component')).toBeInTheDocument();
  });
});
