import React from 'react';
import { Route } from 'react-router';
import Config from 'shared/configuration';
import classNames from 'classnames';
import { TopWinner } from 'containers/TopWinner/TopWinner';
import styles from 'pages/HMenu/hmenu.module.scss';

const HMenuPage: React.FC = () => {
  const holder = React.useRef<HTMLDivElement>(null);

  const columnClassNames = classNames(styles.paddingTopColumn, styles.sportBodyColumn);

  return (
    <div className={styles.paddingColumnSport}>
      <div className={styles.sportRow}>
        <div ref={holder} className={columnClassNames}>
          <Route path={Config.BROWSER_ROUTER_PATH_MAP.MENUBOOK_ITEM_PRESENT}>
            <div className={styles.topWinnerWidget}>
              <TopWinner />
            </div>
          </Route>
        </div>
      </div>
    </div>
  );
};

export { HMenuPage as HMenu };
