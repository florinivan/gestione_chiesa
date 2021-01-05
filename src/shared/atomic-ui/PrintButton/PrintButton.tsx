import React from 'react';

import { NewIcon } from 'shared/atomic-ui/Icon/Icon';

import styles from 'shared/atomic-ui/PrintButton/printbutton.module.scss';

interface PrintButtonProps {
  onPrintClick?: () => void;
}

export const PrintButton: React.FC<PrintButtonProps> = React.memo(({ onPrintClick }) => {
  // const [clicked, setClicked] = React.useState(false);
  // const buttonClassName = classNames(clicked ? styles.white : styles.black, styles.container);
  // const faColor = clicked ? 'black' : 'white';
  return (
    <>
      <div className={styles.container} onClick={onPrintClick}>
        <NewIcon size="icon-size-24" name="Print" color="white" />
      </div>
    </>
  );
});
