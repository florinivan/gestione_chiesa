import React, { ReactElement, useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { useCurrentBreakpointName } from 'react-socks';
import lodash from 'lodash';

import { Text } from 'shared/atomic-ui/Text/Text';
import { TopWinnerItem } from 'containers/TopWinner/TopWinnerItem';
import { NewIcon } from 'shared/atomic-ui/Icon/Icon';
import { topWinnerService } from 'services/TopWinnerService';
import { useBehaviorSubject } from 'shared/hooks/useBehaviorSubject';

import { DataPresentChurch } from 'commons/models/PresentMember';
import { ModalWithChildren } from 'shared/components/TopWinnerModal/ModalWithChildren';
import { useTopWinnerController } from 'shared/components/TopWinnerModal/useTopWinnerController';
import { FormPresents } from 'shared/components/TopWinnerModal/components/FormPresents';

import styles from 'containers/TopWinner/topWinner.module.scss';

export const TopWinner = (): ReactElement => {
  const topWinners = useBehaviorSubject(topWinnerService.topWinners$);
  const [isCollapse, onCollapse] = useState(true);
  const maxItems = 4;

  const onCollapseHandler = () => onCollapse(!isCollapse);
  const breakpoint = useCurrentBreakpointName();
  const isDesktop = breakpoint.includes('desktop');

  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  };

  useEffect(() => {
    const subscription = topWinnerService.fetchPresentMember().subscribe();
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const getDatePresents = React.useMemo(() => {
    const grouped = lodash.groupBy(topWinners, 'data');
    if (Object.keys(grouped).length > 0) {
      return Object.keys(grouped).map((key) => {
        return new DataPresentChurch(parseInt(key), grouped[key]);
      });
    }
  }, [topWinners]);

  const {
    validated,
    handleSubmit,
    nameSurname,
    setNameSurname,
    numberChildrens,
    setNumberChildrens,
    numberPhone,
    setNumberPhone
  } = useTopWinnerController(handleClose);

  const children = (
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
  );

  return (
    <section>
      {getDatePresents && (
        <header className={styles.header}>
          {isDesktop && (
            <Text
              as="h5"
              color="text-black"
              className={`title ${styles.sectionTitle}`}
              size="text-16">
              <FormattedMessage id="fr.containers.TopWinner.Title" />
            </Text>
          )}
          <div className={styles.seeBtn} onClick={handleShow}>
            <Text as="p" color="text-black" size="text-14" bold>
              <FormattedMessage id={'fr.containers.button.label.insert.present'} />
            </Text>
            <NewIcon color="black" size="icon-size-20" name={`Occhio-Open`} />
          </div>
          {getDatePresents.length > 0 && (
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
            <TopWinnerItem key={index} ranking={tw.getdateDay()} presentChurch={tw} />
          ))}
      </div>
      <ModalWithChildren
        showModal={show}
        handleClose={handleClose}
        titleKey={'fr.containers.button.label.insert.present'}>
        {children}
      </ModalWithChildren>
    </section>
  );
};
