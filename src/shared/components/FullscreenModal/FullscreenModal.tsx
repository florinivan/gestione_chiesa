import React from 'react';
import { Modal } from 'react-bootstrap';

import { NewIcon } from 'shared/atomic-ui/Icon/Icon';

import 'shared/components/FullscreenModal/fullscreenModal.scss';

export interface FullscreenModalProps {
  show: boolean;
  onHide?: () => void;
  title: string;
  children: React.ReactNode;
}

export const FullscreenModal: React.FC<FullscreenModalProps> = ({
  show,
  onHide,
  title,
  children
}) => {
  return (
    <Modal
      show={show}
      dialogClassName="fullscreen-modal"
      backdrop={false}
      scrollable
      className="modal-z-index">
      <Modal.Header>
        <h1>{title}</h1>
        <div className="iconContainer" onClick={onHide}>
          <NewIcon
            className="d-flex"
            size="icon-size-26"
            name="Close"
            color="invision-light-black"
          />
        </div>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
};
