import { fireEvent, render, screen } from '@testing-library/react';
import ReactModal from 'react-modal';
import { Modal } from './Modal';

ReactModal.setAppElement(document.createElement('div'));

describe('Modal', () => {
  const onClose = jest.fn();

  test('рендерит children, когда модальное окно открыто', () => {
    render(
      <Modal isOpen={true} onClose={onClose}>
        <div>Тест</div>
      </Modal>
    );

    expect(screen.getByText('Тест')).toBeInTheDocument();
  });

  test('не показывает children, модальное окно закрыто', () => {
    render(
      <Modal isOpen={false} onClose={onClose}>
        <div>Тест</div>
      </Modal>
    );

    expect(screen.queryByText('Тест')).not.toBeInTheDocument();
  });

  test('вызывает onClose при клике на оверлей', () => {
    render(
      <Modal isOpen={true} onClose={onClose}>
        <div>Контент</div>
      </Modal>
    );

    const overlay = document.querySelector('.ReactModal__Overlay');
    expect(overlay).toBeInTheDocument();

    if (overlay) {
      fireEvent.mouseDown(overlay);
      fireEvent.mouseUp(overlay);
      fireEvent.click(overlay);
    }

    expect(onClose).toHaveBeenCalled();
  });
});
