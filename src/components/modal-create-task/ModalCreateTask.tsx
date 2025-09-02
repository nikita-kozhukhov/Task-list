import { CreateTaskForm } from 'components/create-task-form/CreateTaskForm';
import { Button } from 'ui/button/Button';

import styles from './ModalCreateTask.module.scss';

interface ModalCreateTaskProps {
  onClose: () => void;
}

export const ModalCreateTask = ({ onClose }: ModalCreateTaskProps) => {
  return (
    <div className={styles['create-task']}>
      <div className={styles['create-task--container']}>
        <h2 className={styles['create-task--title']}>Создание задачи</h2>
        <CreateTaskForm onClose={onClose} />
      </div>

      <Button
        label="Закрыть"
        onClick={onClose}
        variant="primary"
        className={styles['create-task--close-button']}
      />
    </div>
  );
};
