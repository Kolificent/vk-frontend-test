import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { vi } from 'vitest';
import FilmCard from '.';
import { filmsStore } from '@store/filmsStore';

vi.mock('@store/filmsStore', () => ({
  filmsStore: {
    deleteFilm: vi.fn(),
    editFilm: vi.fn(),
  },
}));

const mockFilm = {
  id: 1,
  poster_path: '/test.jpg',
  vote_average: 8.5,
  title: 'test film',
};

describe('Карточка фильма FilmCard', () => {
  it('Карточка рендерится правильно', () => {
    render(<FilmCard {...mockFilm} />);

    expect(screen.getByText('test film')).toBeInTheDocument();
    expect(screen.getByText('Рейтинг 8.5')).toBeInTheDocument();
  });

  it('Переход в режим редактирования при нажатии кнопки редактирования', () => {
    render(<FilmCard {...mockFilm} />);

    fireEvent.click(screen.getByLabelText('edit'));

    expect(screen.getByRole('textbox', { name: /tempTitle/i })).toHaveValue(
      'test film',
    );
  });

  it('Отмена режима редактирования и восстановление оригинальных значений', () => {
    render(<FilmCard {...mockFilm} />);

    fireEvent.click(screen.getByLabelText('edit'));
    fireEvent.change(screen.getByRole('textbox', { name: /tempTitle/i }), {
      target: { value: 'New Title' },
    });
    fireEvent.click(screen.getByLabelText('cancel'));

    expect(
      screen.queryByRole('textbox', { name: /tempTitle/i }),
    ).not.toBeInTheDocument();
    expect(screen.getByText('test film')).toBeInTheDocument();
  });

  it('Подтверждение редактирования и сохранение новых значений', () => {
    render(<FilmCard {...mockFilm} />);

    fireEvent.click(screen.getByLabelText('edit'));
    fireEvent.change(screen.getByRole('textbox', { name: /tempTitle/i }), {
      target: { value: 'New Title' },
    });
    fireEvent.click(screen.getByLabelText('confirm'));

    expect(filmsStore.editFilm).toHaveBeenCalledWith({
      id: 1,
      poster_path: '/test.jpg',
      title: 'New Title',
      vote_average: 8.5,
    });
  });

  it('Вызов deleteFilm при нажатии кнопки удаления', () => {
    render(<FilmCard {...mockFilm} />);

    fireEvent.click(screen.getByLabelText('delete'));

    expect(filmsStore.deleteFilm).toHaveBeenCalledWith(1);
  });
});
