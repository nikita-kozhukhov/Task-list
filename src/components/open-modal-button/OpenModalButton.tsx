import { useState } from 'react';
import ReactModal from 'react-modal';

import { ModalCreateTask } from 'components/modal-create-task/ModalCreateTask';
import { Button } from 'ui/button/Button';
import { Modal } from 'ui/modal/Modal';

import styles from './OpenModalButton.module.scss';

ReactModal.setAppElement('#root');

export const OpenModalButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className={styles['open-modal-button']}>
      <Button label="Создать задачу" variant="primary" onClick={handleOpen} />

      <Modal isOpen={isOpen} onClose={handleClose}>
        <ModalCreateTask onClose={handleClose} />
      </Modal>
    </div>
  );
};
