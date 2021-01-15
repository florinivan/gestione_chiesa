import React from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Link, useRouteMatch } from 'react-router-dom';
import { useIntl } from 'react-intl';
import { Nullable } from 'commons/types';
import Config from 'shared/configuration';
import { getMenuItemsbookPathname } from 'shared/utils/getBrowserPathname';
import { menuService } from 'services/MenuService/MenuService';

import styles from 'shared/components/Breadcrumbs/breadcrumbs.module.scss';

export const Breadcrumbs: React.FC = React.memo(
  () => {
    const { breadcrumbs: breadcrumbsCSS } = styles;

    const homeHref = process.env.REACT_APP_CMS_ENDPOINT_BASE;

    const intl = useIntl();
    const homeLabel = intl.formatMessage({ id: 'fr.components.Breadcrumbs.home' });

    const items: { href: Nullable<string>; label: string }[] = [];
    const match = useRouteMatch<{
      item: string;
    }>([...Config.BROWSER_ROUTER_PATH_MENUBOOK]);
    const menu = menuService?.getMenuByPathname(match?.params?.item);

    if (menu) {
      items.push({
        href: getMenuItemsbookPathname(menu),
        label: menu.label || ''
      });
    }
    const activeItem = items.pop();

    return (
      <div className={breadcrumbsCSS}>
        <Breadcrumb>
          <Breadcrumb.Item linkAs="a" href={homeHref} bsPrefix="fr-item">
            {homeLabel}
          </Breadcrumb.Item>
          {items.map((it) => (
            <Breadcrumb.Item
              linkAs={Link}
              linkProps={{ to: it.href || '#' }}
              bsPrefix="fr-item"
              key={it.label}>
              {it.label}
            </Breadcrumb.Item>
          ))}
          <Breadcrumb.Item bsPrefix="fr-item-active" active>
            {activeItem?.label}
          </Breadcrumb.Item>
        </Breadcrumb>
      </div>
    );
  },
  () => true
);
