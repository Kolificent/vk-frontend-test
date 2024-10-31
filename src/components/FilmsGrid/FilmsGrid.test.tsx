import { render, screen, fireEvent } from '@testing-library/react';
import { filmsStore } from '@store/filmsStore';
import FilmsGrid from '../FilmsGrid';
import { vi } from 'vitest';

vi.mock('@store/filmsStore', () => ({
  filmsStore: {
    fetchFilms: vi.fn(),
    films: [],
    isLoading: false,
    error: null,
    sort: 0,
    isOrderAscending: true,
    changeCurrentPage: vi.fn(),
  },
}));

describe('Сетка фильмов FilmsGrid', () => {
  it('Лоадер должен показываться при истинном isLoading', () => {
    filmsStore.isLoading = true;
    render(<FilmsGrid />);
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('Показ ошибки при её наличии', () => {
    const errorMessage = 'Failed to load films';
    filmsStore.error = errorMessage;
    render(<FilmsGrid />);
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('Должна показываться стека фильмов при их наличии в сторе', () => {
    filmsStore.films = [
      { id: 1, title: 'Film 1', poster_path: '/path1.jpg', vote_average: 8 },
      { id: 2, title: 'Film 2', poster_path: '/path2.jpg', vote_average: 7 },
    ];
    render(<FilmsGrid />);
    expect(screen.getByText('Film 1')).toBeInTheDocument();
    expect(screen.getByText('Film 2')).toBeInTheDocument();
  });

  it('Кнопка скролла не должна показываться в самом начале страницы', () => {
    render(<FilmsGrid />);
    const button = screen.queryByLabelText('scrollToTopButton');
    fireEvent.scroll(window);
    expect(button).not.toBeInTheDocument();
  });
});
