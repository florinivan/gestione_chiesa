import React from 'react';
import { Card } from 'react-bootstrap';

import styles from 'shared/components/HotBet/HotBetContainer/hotBet.module.scss';

export type HotBetProps = {
  header: React.ReactNode;
  children: React.ReactNode;
} & JSX.IntrinsicElements['div'];

export const HotBetContainer: React.FC<HotBetProps> = React.memo(
  ({ header, children, ...rest }) => {
    return (
      <Card className={styles.hotBetCard} style={rest.style}>
        {header}
        <Card.Body>{children}</Card.Body>
      </Card>
    );
  }
);
