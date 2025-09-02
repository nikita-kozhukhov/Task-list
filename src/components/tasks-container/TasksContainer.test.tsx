import { fireEvent, render, screen } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import { removeTask, Task, toggleTask } from 'store/slices/tasks';
import { TasksContainer } from './TasksContainer';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

jest.mock('store/slices/tasks', () => ({
  removeTask: jest.fn((id) => ({ type: 'removeTask', payload: id })),
  toggleTask: jest.fn((id) => ({ type: 'toggleTask', payload: id })),
}));

describe('TasksContainer', () => {
  const mockDispatch = jest.fn();

  const mockTasks: Task[] = [
    { id: '1', title: 'Задача 1', description: 'Описание 1', completed: false },
    { id: '2', title: 'Задача 2', description: '', completed: true },
  ];

  beforeEach(() => {
    (useSelector as unknown as jest.Mock).mockReturnValue(mockTasks);
    (useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch);
    jest.clearAllMocks();
  });

  test('рендерит все задачи с правильным текстом', () => {
    render(<TasksContainer />);

    expect(screen.getByText('Задача 1')).toBeInTheDocument();
    expect(screen.getByText('Описание 1')).toBeInTheDocument();
    expect(screen.getByText('Задача 2')).toBeInTheDocument();
    expect(screen.getByText('описания нет')).toBeInTheDocument();
  });

  test('диспатчит toggleTask при клике на чекбокс', () => {
    render(<TasksContainer />);

    const checkboxes = screen.getAllByRole('checkbox');

    fireEvent.click(checkboxes[0]);
    expect(mockDispatch).toHaveBeenCalledWith(toggleTask('1'));

    fireEvent.click(checkboxes[1]);
    expect(mockDispatch).toHaveBeenCalledWith(toggleTask('2'));
  });

  test('диспатчит removeTask при клике на кнопку удаления', () => {
    render(<TasksContainer />);

    const removeButtons = screen.getAllByText('X');

    fireEvent.click(removeButtons[0]);
    expect(mockDispatch).toHaveBeenCalledWith(removeTask('1'));

    fireEvent.click(removeButtons[1]);
    expect(mockDispatch).toHaveBeenCalledWith(removeTask('2'));
  });
});
