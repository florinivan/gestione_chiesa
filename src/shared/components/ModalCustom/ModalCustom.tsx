import React from 'react';
import { Modal } from 'react-bootstrap';

import { NewIcon } from 'shared/atomic-ui/Icon/Icon';

export interface ModalCustomProps {
  show: boolean;
  onHide?: () => void;
  title: string;
  children: React.ReactNode;
  sizeModal: string;
  colorTitle: string;
}

function releaseBody() {
  document.body.classList.remove('modal-open');
  document.body.style.overflow = 'auto';
}

export const ModalCustom: React.FC<ModalCustomProps> = ({
  show,
  onHide,
  title,
  children,
  sizeModal,
  colorTitle
}) => {
  const size = sizeModal === 'medium' ? 'mw-100 w-75 mh-100 h-100' : null;
  const colorHeader = colorTitle === 'green' ? 'text-dark-green' : 'text-black';

  return (
    <Modal
      show={show}
      dialogClassName={`modalScreen ${size}`}
      backdrop={false}
      scrollable
      onEntered={releaseBody}
      id="screen">
      <Modal.Header className={`${colorHeader} pb-1 pt-2 ml-2`}>
        <h4>{title}</h4>
        <div className="iconContainer" onClick={onHide}>
          <NewIcon
            className="d-flex"
            size="icon-size-26"
            name="Close"
            color="invision-light-black"
          />
        </div>
      </Modal.Header>
      <Modal.Body className="p-0">{children}</Modal.Body>
    </Modal>
  );
};
