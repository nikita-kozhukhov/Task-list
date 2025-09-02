import { fireEvent, render, screen } from '@testing-library/react';
import { useDispatch } from 'react-redux';
import { removeTask, toggleTask } from 'store/slices/tasks';
import { TaskItem } from './TaskItem';

jest.mock('react-redux', () => ({
  useDispatch: jest.fn(),
}));

jest.mock('store/slices/tasks', () => ({
  removeTask: jest.fn((id) => ({ type: 'removeTask', payload: id })),
  toggleTask: jest.fn((id) => ({ type: 'toggleTask', payload: id })),
}));

describe('TaskItem', () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    jest.clearAllMocks();
  });

  const props = {
    id: '1',
    title: 'Тестовая задача',
    description: 'Описание задачи',
    completed: false,
  };

  test('рендерит заголовок, описание и статус', () => {
    render(<TaskItem {...props} />);

    expect(screen.getByText('Тестовая задача')).toBeInTheDocument();
    expect(screen.getByText('Описание задачи')).toBeInTheDocument();
    expect(screen.getByText('Задача в работе')).toBeInTheDocument();
  });

  test('добавляет класс для завершенной задачи', () => {
    render(<TaskItem {...props} completed />);

    const checkbox = screen.getByRole('checkbox', { name: /completed/i });
    const taskItem = checkbox.closest('.task-item');

    expect(taskItem).toHaveClass('task-item__completed');
  });

  test('диспатчит toggleTask при изменении чекбокса', () => {
    render(<TaskItem {...props} />);

    const checkbox = screen.getByTitle('completed') as HTMLInputElement;
    fireEvent.click(checkbox);

    expect(mockDispatch).toHaveBeenCalledWith(toggleTask(props.id));
  });

  test('диспатчит removeTask при клике на кнопку удаления', () => {
    render(<TaskItem {...props} />);

    const removeButton = screen.getByText('X');
    fireEvent.click(removeButton);

    expect(mockDispatch).toHaveBeenCalledWith(removeTask(props.id));
  });
});
