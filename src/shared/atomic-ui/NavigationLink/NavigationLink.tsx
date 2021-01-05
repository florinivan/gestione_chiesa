import React from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';
import classNames from 'classnames';
import { Nav } from 'react-bootstrap';
import { BsPrefixProps } from 'react-bootstrap/helpers';
import { NavLinkProps as NavLinkBootstrapProps } from 'react-bootstrap/NavLink';

import styles from 'shared/atomic-ui/NavigationLink/navigationLink.module.scss';

const { ['override-active']: overrideActiveCSS } = styles;

export type NavigationLinkProps = BsPrefixProps & NavLinkBootstrapProps & NavLinkProps;

export const NavigationLink = React.memo(function NavigationLink(props: NavigationLinkProps) {
  const extraProps =
    props.as === NavLink
      ? {
          activeClassName: classNames(props.activeClassName, 'active', overrideActiveCSS)
        }
      : {
          className: classNames(props.className, props.active && ['active', overrideActiveCSS])
        };

  return (
    <Nav.Link {...props} {...extraProps}>
      {props.children}
    </Nav.Link>
  );
});
