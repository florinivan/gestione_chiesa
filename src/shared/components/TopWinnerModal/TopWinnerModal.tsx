import React from 'react';
import { Modal } from 'react-bootstrap';
import { useCurrentBreakpointName } from 'react-socks';

import { TopWinner } from 'commons/models/TopWinner';
import { ColorsType } from 'commons/types';
import { NewIcon } from 'shared/atomic-ui/Icon/Icon';
import { TopWinnerModalContent } from 'shared/components/TopWinnerModal/components/TopWinnerModalContent';
import { TopWinnerModalSubHeader } from 'shared/components/TopWinnerModal/components/TopWinnerModalSubHeader';
import { TopWinnerModalFooter } from 'shared/components/TopWinnerModal/components/TopWinnerModalFooter';

import styles from 'shared/components/TopWinnerModal/topWinnerModal.module.scss';
import 'shared/components/FullscreenModal/fullscreenModal.scss';
import 'shared/components/TopWinnerModal/topWinnerModal.scss';

export interface TopWinnerModalProps {
  show: boolean;
  onHide?: () => void;
  title: string;
  colorTitle?: string;
  colorIcon?: ColorsType;
  topWinner: TopWinner;
  ranking?: number;
}

export const TopWinnerModal: React.FC<TopWinnerModalProps> = ({
  show,
  onHide,
  title,
  colorTitle,
  colorIcon,
  topWinner,
  ranking
}) => {
  const colorHeader = colorTitle ? colorTitle : 'text-black';
  const colorIconHeader = colorIcon ? colorIcon : 'white';
  const { topwinnerModal: topwinnerModal } = styles;
  const breakpoint = useCurrentBreakpointName();
  const isDesktoporTablet = breakpoint.includes('desktop') || breakpoint === 'tablet';
  const modalBody = isDesktoporTablet ? 'px-3 py-3' : 'px-2 pt-3';
  const borderRadiusModal = !isDesktoporTablet ? '20px' : '';
  const iconClose = isDesktoporTablet ? 'icon-size-20' : 'icon-size-26';
  return (
    <Modal
      show={show}
      size="lg"
      centered
      dialogClassName={!isDesktoporTablet ? 'fullscreen-modal' : `${topwinnerModal} topWinnerModal`}
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
            className={colorHeader}
            style={{ fontWeight: 'normal' }}>
            {title}
          </Modal.Title>
          <div className="iconContainer" onClick={onHide}>
            <NewIcon className="d-flex" size={iconClose} name="Close" color={colorIconHeader} />
          </div>
        </div>
      </Modal.Header>
      <Modal.Body className="p-0">
        {topWinner && (
          <>
            <TopWinnerModalSubHeader topWinner={topWinner} ranking={ranking} />
            <div className={modalBody}>
              <TopWinnerModalContent topWinner={topWinner} />
              <TopWinnerModalFooter topWinner={topWinner} />
            </div>
          </>
        )}
      </Modal.Body>
    </Modal>
  );
};
