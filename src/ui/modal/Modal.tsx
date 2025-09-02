import React from 'react';
import ReactModal from 'react-modal';

import styles from './Modal.module.scss';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      contentLabel="Пример модалки"
      className={styles['modal']}
      overlayClassName={styles['overlay']}
    >
      {children}
    </ReactModal>
  );
};
