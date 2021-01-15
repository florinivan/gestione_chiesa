import moment from 'moment';
import React from 'react';

import { Button, Modal } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { useCurrentBreakpointName } from 'react-socks';
import { NewIcon } from 'shared/atomic-ui/Icon/Icon';

import styles from 'shared/components/TopWinnerModal/topWinnerModal.module.scss';
import 'shared/components/FullscreenModal/fullscreenModal.scss';
import 'shared/components/TopWinnerModal/topWinnerModal.scss';
import { FormPresents } from 'shared/components/TopWinnerModal/components/FormPresents';
import { useTopWinnerController } from 'shared/components/TopWinnerModal/useTopWinnerController';

export interface TopWinnerModalInsertProps {
  showModal: boolean;
}

export const TopWinnerModalInsert: React.FC<TopWinnerModalInsertProps> = ({ showModal }) => {
  /** Modal for insert */
  const breakpoint = useCurrentBreakpointName();
  const isDesktoporTablet = breakpoint.includes('desktop') || breakpoint === 'tablet';
  //const modalBody = isDesktoporTablet ? 'px-3 py-3' : 'px-2 pt-3';
  const borderRadiusModal = !isDesktoporTablet ? '20px' : '';
  const iconClose = isDesktoporTablet ? 'icon-size-20' : 'icon-size-26';
  const modalBody = isDesktoporTablet ? 'px-3 py-3' : 'px-2 pt-3';
  const dateNow = Date.now();
  const dayName = moment(new Date(dateNow)).format('dddd DD MMM').toLocaleUpperCase();

  moment.locale(process.env.REACT_APP_COUNTRY);
  /**################### */

  const {
    show,
    handleClose,
    validated,
    handleSubmit,
    nameSurname,
    setNameSurname,
    numberChildrens,
    setNumberChildrens,
    numberPhone,
    setNumberPhone
  } = useTopWinnerController(showModal);

  return (
    <Modal
      show={show}
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
            <FormattedMessage id={'fr.containers.button.label.insert.present'} /> {dayName}
          </Modal.Title>
          <div className="iconContainer" onClick={handleClose}>
            <NewIcon className="d-flex" size={iconClose} name="Close" color={'white'} />
          </div>
        </div>
      </Modal.Header>
      <Modal.Body className="p-0">
        <div className={modalBody}>
          <FormPresents
            onEventHandler={handleSubmit}
            validated={validated}
            nameSurname={nameSurname}
            setNameSurname={setNameSurname}
            numberChildrens={numberChildrens}
            setNumberChildrens={setNumberChildrens}
            numberPhone={numberPhone}
            setNumberPhone={setNumberPhone}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-red" onClick={handleClose}>
          <FormattedMessage id={'fr.common.close'} />
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
