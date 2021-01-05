import React, { HTMLAttributes } from 'react';

import styles from 'shared/components/DropdownElement/dropdown.module.scss';

export const MenuDropdown = React.forwardRef<HTMLDivElement, HTMLAttributes<HTMLDivElement>>(
  ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
    return (
      <div ref={ref} style={style} className={className} aria-labelledby={labeledBy}>
        <ul className={styles.listUnstyled}>{children}</ul>
      </div>
    );
  }
);
