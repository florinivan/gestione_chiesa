import React, { ReactNode } from 'react';
import classNames from 'classnames';
import { Link, LinkProps } from 'react-router-dom';
import emptySports from 'pages/EmptyBookingList/icons/emptySports.png';
import styles from 'shared/components/EmptyFallback/emptyFallback.module.scss';

export interface EmptyFallbackProps {
  title: ReactNode;
  description: ReactNode;
  linkTo: LinkProps['to'];
  linkContent: ReactNode;
  classes?: Record<string, string>;
}

export function EmptyFallback({
  title,
  description,
  linkTo,
  linkContent,
  classes
}: EmptyFallbackProps) {
  return (
    <div className={classNames(styles.container, classes?.container)}>
      <div className={styles.banner}>
        <div className={styles.imageBox}>
          <img width="340px" src={emptySports} alt="Different kind of balls" />
        </div>
        <div className={styles.text}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.description}>{description}</p>
          <Link className={classNames(styles.cta, 'btn', 'btn-primary', classes?.cta)} to={linkTo}>
            {linkContent}
          </Link>
        </div>
      </div>
    </div>
  );
}
