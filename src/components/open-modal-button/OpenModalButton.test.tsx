import { configureStore } from '@reduxjs/toolkit';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import tasksReducer from 'store/slices/tasks';
import { OpenModalButton } from './OpenModalButton';

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});

describe('OpenModalButton', () => {
  test('рендерит кнопку "Создать задачу"', () => {
    render(<OpenModalButton />);

    expect(
      screen.getByRole('button', { name: /Создать задачу/i })
    ).toBeInTheDocument();
  });

  test('открывает модальное окно при клике на кнопку', () => {
    render(
      <Provider store={store}>
        <OpenModalButton />
      </Provider>
    );

    const openButton = screen.getByRole('button', { name: /Создать задачу/i });
    fireEvent.click(openButton);

    expect(screen.getByText(/Создание задачи/i)).toBeInTheDocument();
  });

  test('закрывает модальное окно при onClose', () => {
    render(
      <Provider store={store}>
        <OpenModalButton />
      </Provider>
    );

    const openButton = screen.getByRole('button', { name: /Создать задачу/i });
    fireEvent.click(openButton);

    const closeButton = screen.getByRole('button', { name: /Закрыть/i });
    fireEvent.click(closeButton);

    expect(screen.queryByText(/Создание задачи/i)).not.toBeInTheDocument();
  });

  test('совпадает с предыдущей версией снапшота', () => {
    const { container } = render(<OpenModalButton />);

    expect(container).toMatchSnapshot();
  });
});
