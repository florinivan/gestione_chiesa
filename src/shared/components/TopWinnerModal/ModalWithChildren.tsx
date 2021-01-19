import React from 'react';
import moment from 'moment';

import { Button, Modal } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { useCurrentBreakpointName } from 'react-socks';
import { NewIcon } from 'shared/atomic-ui/Icon/Icon';

import styles from 'shared/components/TopWinnerModal/topWinnerModal.module.scss';
import 'shared/components/FullscreenModal/fullscreenModal.scss';
import 'shared/components/TopWinnerModal/topWinnerModal.scss';

export interface ModalWithChildrenProps {
  showModal: boolean;
  dayName?: string;
  titleKey?: string;
  handleClose: () => void;
  children: React.ReactNode;
}

export const ModalWithChildren: React.FC<ModalWithChildrenProps> = ({
  showModal,
  children,
  handleClose,
  dayName,
  titleKey
}) => {
  /** Modal for insert */
  const breakpoint = useCurrentBreakpointName();
  const isDesktoporTablet = breakpoint.includes('desktop') || breakpoint === 'tablet';
  //const modalBody = isDesktoporTablet ? 'px-3 py-3' : 'px-2 pt-3';
  const borderRadiusModal = !isDesktoporTablet ? '20px' : '';
  const iconClose = isDesktoporTablet ? 'icon-size-20' : 'icon-size-26';
  const modalBody = isDesktoporTablet ? 'px-3 py-3' : 'px-2 pt-3';

  moment.locale(process.env.REACT_APP_COUNTRY);
  /**################### */

  return (
    <Modal
      show={showModal}
      onHide={handleClose}
      animation={false}
      size="lg"
      centered
      dialogClassName={!isDesktoporTablet ? 'fullscreen-modal' : `topWinnerModal`}
      backdrop={true}
      scrollable
      aria-labelledby="contained-modal-title-vcenter"
      className="modal-z-index"
      style={{
        borderTopLeftRadius: { borderRadiusModal },
        borderTopRightRadius: { borderRadiusModal }
      }}>
      <Modal.Header className="flex-wrap p-0">
        <div className={styles.titleTWinnerModal}>
          <Modal.Title
            id="contained-modal-title-vcenter"
            className={'text-white'}
            style={{ fontWeight: 'normal' }}>
            <FormattedMessage id={titleKey} /> {dayName}
          </Modal.Title>
          <div className="iconContainer" onClick={handleClose}>
            <NewIcon className="d-flex" size={iconClose} name="Close" color={'white'} />
          </div>
        </div>
      </Modal.Header>
      <Modal.Body className="p-0">
        <div className={modalBody}>{children}</div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-red" onClick={handleClose}>
          <FormattedMessage id={'fr.common.close'} />
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
