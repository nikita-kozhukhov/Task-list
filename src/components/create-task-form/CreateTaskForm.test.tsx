import { configureStore } from '@reduxjs/toolkit';
import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import tasksReducer from 'store/slices/tasks';
import { CreateTaskForm } from './CreateTaskForm';

const renderWithStore = (ui: React.ReactNode, store: any) => {
  return render(<Provider store={store}>{ui}</Provider>);
};

describe('CreateTaskForm', () => {
  test('рендерит все поля и кнопку', () => {
    const store = configureStore({ reducer: { tasks: tasksReducer } });
    renderWithStore(<CreateTaskForm onClose={jest.fn()} />, store);

    expect(
      screen.getByPlaceholderText(/Введите название задачи/i)
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/Введите описание задачи/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /создать задачу/i })
    ).toBeInTheDocument();
  });

  test('показывает ошибки валидации для поля Название задачи', async () => {
    const store = configureStore({ reducer: { tasks: tasksReducer } });
    renderWithStore(<CreateTaskForm onClose={jest.fn()} />, store);

    const titleInput = screen.getByPlaceholderText(/Введите название задачи/i);
    const submitButton = screen.getByRole('button', {
      name: /создать задачу/i,
    });

    // 1. Пустое поле
    fireEvent.change(titleInput, { target: { value: '' } });
    fireEvent.click(submitButton);

    expect(
      await screen.findByText(/Название обязательно/i)
    ).toBeInTheDocument();

    // 2. Меньше 6 символов
    fireEvent.change(titleInput, { target: { value: '123' } });
    fireEvent.click(submitButton);

    expect(await screen.findByText(/Минимум 6 символов/i)).toBeInTheDocument();

    // 3. Более 50 символов
    const longTitle = 'a'.repeat(51);

    fireEvent.change(titleInput, { target: { value: longTitle } });
    fireEvent.click(submitButton);

    expect(
      await screen.findByText(/Максимум 50 символов/i)
    ).toBeInTheDocument();
  });

  test('диспатчит задачу и вызывает onClose при корректных данных', async () => {
    const store = configureStore({ reducer: { tasks: tasksReducer } });
    const mockOnClose = jest.fn();
    renderWithStore(<CreateTaskForm onClose={mockOnClose} />, store);

    const titleInput = await screen.findByPlaceholderText(
      /Введите название задачи \(от 6 до 50 символов\)/i
    );
    const descriptionInput = await screen.findByPlaceholderText(
      /Введите описание задачи \(максимум 1000 символов\)/i
    );

    fireEvent.change(titleInput, { target: { value: 'Новая задача' } });
    fireEvent.change(descriptionInput, {
      target: { value: 'Описание задачи' },
    });

    const submitButton = screen.getByRole('button', {
      name: /создать задачу/i,
    });

    fireEvent.click(submitButton);

    await waitFor(() => {
      const state = store.getState().tasks;
      expect(state.tasks).toHaveLength(1);
      expect(state.tasks[0].title).toBe('Новая задача');
      expect(state.tasks[0].description).toBe('Описание задачи');
      expect(mockOnClose).toHaveBeenCalled();
    });
  });

  test('очищает инпуты после успешного сабмита', async () => {
    const store = configureStore({ reducer: { tasks: tasksReducer } });
    renderWithStore(<CreateTaskForm onClose={jest.fn()} />, store);

    const titleInput = screen.getByPlaceholderText(
      /Введите название задачи \(от 6 до 50 символов\)/i
    ) as HTMLInputElement;

    const descInput = screen.getByPlaceholderText(
      /Введите описание задачи \(максимум 1000 символов\)/i
    ) as HTMLTextAreaElement;

    fireEvent.change(titleInput, { target: { value: 'Задача для очистки' } });
    fireEvent.change(descInput, { target: { value: 'Описание для очистки' } });

    const submitButton = screen.getByRole('button', {
      name: /создать задачу/i,
    });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(titleInput.value).toBe('');
      expect(descInput.value).toBe('');
    });
  });
});
