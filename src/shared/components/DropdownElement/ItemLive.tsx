import React from 'react';
import classNames from 'classnames';

import { Regulator } from 'commons/models/Regulator';
import { Text } from 'shared/atomic-ui/Text/Text';
import { RedCards } from 'market-templates/components/RedCards/RedCards';

import styles from 'shared/components/DropdownElement/dropdown.module.scss';

//ItemLive
interface ItemLiveProps {
  regulator: Regulator;
}
export const ItemLive: React.FC<ItemLiveProps> = React.memo(({ regulator }) => {
  const itemTextStyle = classNames(styles.ellipsis, 'py-1 pl-1 mw-100 text-left text-white');
  return (
    <>
      <div className="d-flex flex-row h-50">
        <Text as={'p'} size="text-10" className={itemTextStyle}>
          {regulator.getSplittedDescription()[0]}
        </Text>
        {regulator.livescore?.cards && <RedCards livescore={regulator.livescore} teamId={1} />}
      </div>
      <div className="d-flex flex-row h-50">
        <Text as={'p'} size="text-10" className={itemTextStyle}>
          {regulator.getSplittedDescription()[1]}
        </Text>
        {regulator.livescore?.cards && <RedCards livescore={regulator.livescore} teamId={2} />}
      </div>
    </>
  );
});
