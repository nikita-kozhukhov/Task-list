import { useSelector } from 'react-redux';
import { Task } from 'store/slices/tasks';
import { RootState } from 'store/store';

import { TaskItem } from 'components/task-item/TaskItem';

import styles from './TasksContainer.module.scss';

export const TasksContainer = () => {
  const tasks = useSelector((state: RootState) => state.tasks.tasks) as Task[];

  return (
    <div className={styles['tasks-container']}>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          id={task.id}
          title={task.title}
          description={task.description || 'описания нет'}
          completed={task.completed}
        />
      ))}
    </div>
  );
};
