import React from 'react';
import {
  FacebookShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookMessengerShareButton
} from 'react-share';
import { useCurrentBreakpointName } from 'react-socks';

import { NewIcon } from 'shared/atomic-ui/Icon/Icon';
import classNames from 'classnames';

import styles from 'shared/atomic-ui/ShareButton/sharebutton.module.scss';

interface ShareButtonProps {
  url: string;
  clicked: boolean;
  onClick?: () => void;
  isLock?: boolean;
}

export const ShareButton: React.FC<ShareButtonProps> = React.memo(
  ({ url, clicked, onClick, isLock }) => {
    const breakpoint = useCurrentBreakpointName();
    const isDesktop = breakpoint.includes('desktop');
    const buttonClassName = classNames(clicked ? styles.white : styles.black, styles.container);
    const socialButtonsClassName = classNames(
      clicked ? styles.visibleClass : styles.noVisibleClass,
      isLock && styles.lockPosition,
      !isLock && (!isDesktop ? styles.mobilePosition : styles.noLockPosition),
      styles.containerSocialButtons
    );

    const faColor = clicked ? 'black-blue' : 'white';

    return (
      <>
        <div className={socialButtonsClassName}>
          <div className={styles.shareIcon}>
            <FacebookShareButton url={url}>
              <NewIcon
                name="Facebook"
                className="d-flex"
                size="icon-size-36"
                color="blue-facebook"
              />
            </FacebookShareButton>
          </div>
          <div className={styles.shareIcon}>
            <TwitterShareButton url={url}>
              <NewIcon name="Twitter" className="d-flex" size="icon-size-36" color="blue-twitter" />
            </TwitterShareButton>
          </div>
          {!isDesktop && (
            <div className={styles.shareIcon}>
              <FacebookMessengerShareButton appId="" url={url}>
                <NewIcon
                  name="Messenger"
                  className="d-flex"
                  size="icon-size-36"
                  color="blue-messenger"
                />
              </FacebookMessengerShareButton>
            </div>
          )}
          <div className={styles.shareIcon}>
            <WhatsappShareButton url={url}>
              <NewIcon
                name="Whatsapp"
                className="d-flex"
                size="icon-size-36"
                color="green-whatsapp"
              />
            </WhatsappShareButton>
          </div>
          <div className={styles.shareIcon}>
            <TelegramShareButton url={url}>
              <NewIcon
                name="Telegram"
                className="d-flex"
                size="icon-size-36"
                color="blue-twitter"
              />
            </TelegramShareButton>
          </div>
        </div>

        <div className={buttonClassName} onClick={onClick}>
          <NewIcon size="icon-size-24" name="Share" color={faColor} />
        </div>
      </>
    );
  }
);
