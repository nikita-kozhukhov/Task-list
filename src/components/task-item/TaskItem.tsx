import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'store/store';

import { removeTask, toggleTask } from 'store/slices/tasks';

import styles from './TaskItem.module.scss';

interface TaskItemProps {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

export const TaskItem = ({
  id,
  title,
  description,
  completed,
}: TaskItemProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const status = completed ? 'Задача завершена' : 'Задача в работе';

  const handleRemoveTask = (id: string) => {
    dispatch(removeTask(id));
  };

  const handleToggleTask = (id: string) => {
    dispatch(toggleTask(id));
  };

  const classes = classNames([
    styles['task-item'],
    {
      [styles['task-item__completed']]: completed,
    },
  ]);

  return (
    <div className={classes}>
      <div className={styles['task-item--checkbox']}>
        <input
          className={styles['task-item--input']}
          title="completed"
          type="checkbox"
          checked={completed}
          onChange={() => handleToggleTask(id)}
        />
        <span>{status}</span>
      </div>

      <div className={styles['task-item--container']}>
        <h2 className={styles['task-item--title']}>{title}</h2>
        <span className={styles['task-item--description']}>{description}</span>
        <button
          className={styles['task-item--button']}
          onClick={() => handleRemoveTask(id)}
        >
          X
        </button>
      </div>
    </div>
  );
};
