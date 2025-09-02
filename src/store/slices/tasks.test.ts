import reducer, {
  addTask,
  removeTask,
  toggleTask,
  setTasks,
  Task,
} from './tasks';

describe('tasks', () => {
  const initialState = { tasks: [] };

  const mockTask: Task = {
    id: '1',
    title: 'Test Task',
    description: 'Some description',
    completed: false,
  };

  it('должен вернуть начальное состояние', () => {
    expect(reducer(undefined, { type: '' })).toEqual(initialState);
  });

  it('addTask должен добавить задачу', () => {
    const state = reducer(initialState, addTask(mockTask));

    expect(state.tasks).toHaveLength(1);
    expect(state.tasks[0]).toEqual(mockTask);
  });

  it('removeTask должен удалить задачу по id', () => {
    const state = reducer({ tasks: [mockTask] }, removeTask(mockTask.id));

    expect(state.tasks).toHaveLength(0);
  });

  it('toggleTask должен переключить completed', () => {
    const state = reducer({ tasks: [mockTask] }, toggleTask(mockTask.id));

    expect(state.tasks[0].completed).toBe(true);

    const state2 = reducer(state, toggleTask(mockTask.id));
    expect(state2.tasks[0].completed).toBe(false);
  });

  it('setTasks должен заменить все задачи', () => {
    const newTasks: Task[] = [
      { id: '2', title: 'Another Task', completed: false },
    ];

    const state = reducer(initialState, setTasks(newTasks));

    expect(state.tasks).toEqual(newTasks);
  });
});
