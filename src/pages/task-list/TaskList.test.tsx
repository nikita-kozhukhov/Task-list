import { configureStore } from '@reduxjs/toolkit';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import tasksReducer from 'store/slices/tasks';
import { TaskList } from './TaskList';

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
  },
});

describe('TaskList', () => {
  test('TaskList рендерит все дочерние элементы', () => {
    render(
      <Provider store={store}>
        <TaskList />
      </Provider>
    );

    expect(
      screen.getByRole('button', { name: /Создать задачу/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();

    const container = document.querySelector('.tasks-container');
    expect(container).toBeInTheDocument();
    expect(container).toHaveClass('tasks-container');
  });

  test('TaskList snapshot', () => {
    const { asFragment } = render(
      <Provider store={store}>
        <TaskList />
      </Provider>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});
