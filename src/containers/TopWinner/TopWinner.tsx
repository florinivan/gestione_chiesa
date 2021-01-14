import React, { ReactElement, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';

import { Text } from 'shared/atomic-ui/Text/Text';
import { TopWinnerItem } from 'containers/TopWinner/TopWinnerItem';
import { NewIcon } from 'shared/atomic-ui/Icon/Icon';
import { topWinnerService } from 'services/TopWinnerService';
import { useBehaviorSubject } from 'shared/hooks/useBehaviorSubject';

import styles from 'containers/TopWinner/topWinner.module.scss';
import { DataPresentChurch } from 'commons/models/PresentMember';

export const TopWinner = (): ReactElement => {
  const topWinners = useBehaviorSubject(topWinnerService.topWinners$);
  const [isCollapse, onCollapse] = React.useState(true);
  const maxItems = 4;

  const onCollapseHandler = () => onCollapse(!isCollapse);

  useEffect(() => {
    const subscription = topWinnerService.fetchPresentMember().subscribe();
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const getDatePresents = React.useMemo(() => {
    return topWinners
      ?.sort((a, b) => a.data - b.data)
      .map(
        (presentMember) =>
          new DataPresentChurch(
            presentMember.data,
            topWinners.filter((item) => item.data === presentMember.data)
          )
      );
  }, [topWinners]);

  return (
    <section>
      {getDatePresents && (
        <header className={styles.header}>
          <Text
            as="h5"
            color="text-black"
            className={`title ${styles.sectionTitle}`}
            size="text-16">
            <FormattedMessage id="fr.containers.TopWinner.Title" />
          </Text>
          {getDatePresents.length > maxItems && (
            <div className={styles.seeBtn} onClick={onCollapseHandler}>
              <Text as="p" color="text-black" size="text-14" bold>
                <FormattedMessage
                  id={`fr.containers.TopWinner.label.${isCollapse ? 'seeAll' : 'seeLess'}`}
                />
              </Text>
              <NewIcon
                color="black"
                size="icon-size-20"
                name={`Arrow-${isCollapse ? 'Down' : 'Up'}`}
              />
            </div>
          )}
        </header>
      )}

      <div className={styles.container}>
        {getDatePresents &&
          (isCollapse ? getDatePresents.slice(0, maxItems) : getDatePresents).map((tw, index) => (
            <TopWinnerItem key={index} ranking={index + 1} presentChurch={tw} />
          ))}
      </div>
    </section>
  );
};
