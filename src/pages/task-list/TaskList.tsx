import { MainHeader } from 'components/main-header/MainHeader';
import { OpenModalButton } from 'components/open-modal-button/OpenModalButton';
import { TasksContainer } from 'components/tasks-container/TasksContainer';

import styles from './TaskList.module.scss';

export const TaskList = () => {
  return (
    <section className={styles['task-list']}>
      <MainHeader />
      <OpenModalButton />
      <TasksContainer />
    </section>
  );
};
