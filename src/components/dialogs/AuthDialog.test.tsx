import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import AuthDialog from './AuthDialog';
import dialogStore from '@store/dialogStore';
import { TMDB_AUTH_URL } from '@constants';

vi.mock('@store/dialogStore', () => ({
  default: {
    isOpen: true,
    closeDialog: vi.fn(),
  },
}));

vi.mock('@utils/authToken', () => ({
  setAuthToken: vi.fn(),
}));

describe('Компонент окна аутентификации AuthDialog', () => {
  it('Закрытие окна при нажатии на кнопку отмены', () => {
    render(<AuthDialog />);
    const cancelButton = screen.getByLabelText('cancel');
    fireEvent.click(cancelButton);

    expect(dialogStore.closeDialog).toHaveBeenCalled();
  });

  it('Проверка на правильность ссылки', () => {
    render(<AuthDialog />);
    const link = screen.getByLabelText('apiLink');
    expect(link).toHaveAttribute('href', TMDB_AUTH_URL);
  });
});
