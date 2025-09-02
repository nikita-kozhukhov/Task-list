import { configureStore } from '@reduxjs/toolkit';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import tasksReducer from 'store/slices/tasks';
import { ModalCreateTask } from './ModalCreateTask';

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});

describe('ModalCreateTask', () => {
  test('рендерит заголовок', () => {
    const mockOnClose = jest.fn();

    render(
      <Provider store={store}>
        <ModalCreateTask onClose={mockOnClose} />
      </Provider>
    );

    expect(screen.getByText(/Создание задачи/i)).toBeInTheDocument();
  });

  test('рендерит форму CreateTaskForm', () => {
    const mockOnClose = jest.fn();

    render(
      <Provider store={store}>
        <ModalCreateTask onClose={mockOnClose} />
      </Provider>
    );

    expect(
      screen.getByPlaceholderText(/Введите название задачи/i)
    ).toBeInTheDocument();
  });

  test("вызывает onClose при клике на кнопку 'Закрыть'", () => {
    const mockOnClose = jest.fn();

    render(
      <Provider store={store}>
        <ModalCreateTask onClose={mockOnClose} />
      </Provider>
    );

    const closeButton = screen.getByText(/Закрыть/i);
    fireEvent.click(closeButton);

    expect(mockOnClose).toHaveBeenCalled();
  });
});
