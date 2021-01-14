import React from 'react';
import { useCurrentBreakpointName } from 'react-socks';

import { PresentMember } from 'commons/models/PresentMember';
import { Text } from 'shared/atomic-ui/Text/Text';

import styles from 'shared/components/TopWinnerModal/components/topWinnerModalContent.module.scss';
import { FormattedNumber } from 'react-intl';

interface TopWinnerModalContentRowProps {
  datePresent?: PresentMember[];
}

export const TopWinnerModalContentRow: React.FC<TopWinnerModalContentRowProps> = ({
  datePresent
}) => {
  const breakpoint = useCurrentBreakpointName();
  const isDesktoporTablet = breakpoint.includes('desktop') || breakpoint === 'tablet';

  return (
    <>
      {datePresent?.map((bList, index) => (
        <div key={index} className={styles.topWinnerRow}>
          <div className={styles.event}>
            <div>
              <Text
                as="p"
                className="pl-1"
                size={isDesktoporTablet ? 'text-12' : 'text-11'}
                color="text-light-black">
                {bList.firstNameLastName}
              </Text>
            </div>
          </div>
          <div className={styles.containerHalfContent}>
            <div className={styles.marketBar}>
              <div className={styles.marketBarContent}>
                <Text as="p" size="text-12" color="text-black">
                  <span className={styles.descriptionSelection}>
                    <span className="pr-1">
                      <FormattedNumber value={bList.numberChildren14} />
                    </span>
                  </span>
                </Text>
              </div>
            </div>
            <div className={styles.contentQuote}>
              <Text as="p" size="text-12" color="text-black" className="d-flex">
                {bList.phone}
              </Text>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
