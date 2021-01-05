import React from 'react';

import { NewIcon } from 'shared/atomic-ui/Icon/Icon';

import styles from 'shared/atomic-ui/DownloadButton/downloadbutton.module.scss';

interface DownloadButtonProps {
  onDownloadClick?: () => void;
}

export const DownloadButton: React.FC<DownloadButtonProps> = React.memo(({ onDownloadClick }) => {
  // const [clicked, setClicked] = React.useState(false);
  //  const buttonClassName = classNames(clicked ? styles.white : styles.black, styles.container);
  // const faColor = clicked ? 'black' : 'white';
  return (
    <>
      <div className={styles.container} onClick={onDownloadClick}>
        <NewIcon size="icon-size-24" name="Save" color="white" />
      </div>
    </>
  );
});
