import React from 'react';
import { Modal } from 'react-bootstrap';
import { Text } from 'shared/atomic-ui/Text/Text';
import { NewIcon } from 'shared/atomic-ui/Icon/Icon';
import { useBehaviorSubject } from 'shared/hooks/useBehaviorSubject';
import { browserInfoStore } from 'services/BrowserInfoService/BrowserInfoStore';
import { CurrentPlayer } from './CurrentPlayer';
import { PlayerDetails } from 'commons/models/PlayerDetails';

import classNames from 'classnames';
import styles from 'shared/components/DropdownElement/dropdown.module.scss';

interface MenuModalProps {
  showModalMenu: boolean;
  handleClose: () => void;
  description: string;
  children: React.ReactNode;
  playerDetails?: PlayerDetails;
}
export const MenuModal: React.FC<MenuModalProps> = React.memo(props => {
  const { showModalMenu, handleClose, description, children, playerDetails } = props;
  const fixedHeightAboveRootBetting = useBehaviorSubject(
    browserInfoStore.fixedHeightAboveRootBetting$
  );
  const styleTop = {
    top: fixedHeightAboveRootBetting + 'px',
    paddingBottom: fixedHeightAboveRootBetting + 'px'
  };
  const listItemClass = classNames(styles.listItemClass, 'w-100 ', 'mt-0');
  const ModalDescription = !playerDetails ? (
    <Text as={'p'} size="text-14" type="h4" className={styles.titleModal}>
      {description}
    </Text>
  ) : (
    <CurrentPlayer playerDetails={playerDetails} />
  );
  return (
    <Modal
      show={showModalMenu}
      onHide={handleClose}
      className={styles.modal}
      scrollable
      backdrop={false}
      dialogClassName="fullscreen-modal"
      style={styleTop}>
      <Modal.Header>
        {ModalDescription}
        <div className={styles.iconClose} onClick={handleClose}>
          <NewIcon className="d-flex" size="icon-size-20" name="Close" color="white" />
        </div>
      </Modal.Header>

      <Modal.Body>
        <div
          className={styles.backdropBody}
          onClick={e => {
            e.preventDefault();
            handleClose();
          }}>
          <div className={listItemClass}>{children}</div>
        </div>
      </Modal.Body>
    </Modal>
  );
});
