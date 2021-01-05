import React from 'react';
import { Modal } from 'react-bootstrap';
import { useCurrentWidth, useCurrentBreakpointName } from 'react-socks';
import { getBreakpoint } from 'shared/utils/breakpoint';

import styles from 'shared/components/LargeModal/largeModal.module.scss';
import { Icon } from 'shared/atomic-ui/Icon/Icon';

export interface ModalProps {
  show: boolean;
  onHide: () => void;
  title: string;
  children: React.ReactNode;
}

export const LargeModal: React.FC<ModalProps> = ({ show, onHide, title, children }) => {
  const width = useCurrentWidth();
  const breakpoint = useCurrentBreakpointName();
  //allow centering on the minimal width of the tablet
  const isMobile = width < getBreakpoint('tablet');
  const isMobileOrTablet = breakpoint === 'mobile' || breakpoint === 'tablet';

  const { bottomModal, onTop } = styles;
  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      dialogClassName={bottomModal}
      aria-labelledby="contained-modal-title-vcenter"
      centered={!isMobile}
      backdropClassName={isMobileOrTablet ? onTop : ''}
      className={isMobileOrTablet ? onTop : ''}>
      <Modal.Header className="d-flex justify-content-between bg-orange text-white">
        <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
        <button className="border-0 bg-transparent text-white" onClick={onHide}>
          <Icon fa="times" faColor="white" />
        </button>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
    </Modal>
  );
};
