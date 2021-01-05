import React, { HTMLAttributes, TdHTMLAttributes, ThHTMLAttributes, ReactNode } from 'react';
import classNames from 'classnames';
import BoostrapTable, { TableProps as BootstrapTableProps } from 'react-bootstrap/Table';
import styles from 'shared/components/MarketsTable/marketsTable.module.scss';

export type TrProps = HTMLAttributes<HTMLTableRowElement> & { head?: boolean };
export type ThProps = ThHTMLAttributes<{}>;
export type TdProps = TdHTMLAttributes<{}> & {
  border?: 'clipped' | 'none' | 'full' | 'darkerClippedBorder';
};
export type TableProps = BootstrapTableProps & {
  className?: string;
  children?: ReactNode;
};
export type TableWrapperProps = HTMLAttributes<HTMLDivElement> & {
  heading?: ReactNode;
};

export type TableHeaderProps = HTMLAttributes<{}>;

export function Tr({ className, head, ...otherPros }: TrProps) {
  return (
    <tr
      className={classNames(className, head ? styles.tableHeadRow : styles.tableBodyRow)}
      {...otherPros}
    />
  );
}

export function Th({ className, ...otherPros }: ThProps) {
  return <th className={classNames(styles.tableHeadCell, className)} {...otherPros} />;
}

export function SubCell({ className, ...otherProps }: HTMLAttributes<HTMLDivElement>) {
  return <div className={classNames(styles.subCell, className)} {...otherProps} />;
}

export function Td({ className, border, ...otherProps }: TdProps) {
  let borderClass: string | undefined;

  switch (border) {
    case 'clipped':
      borderClass = styles.clippedBorder;
      break;
    case 'full':
      borderClass = styles.fullBorder;
      break;
    case 'darkerClippedBorder':
      borderClass = styles.darkerClippedBorder;
      break;
    default:
      borderClass = undefined;
  }

  return <td className={classNames(styles.dataCell, className, borderClass)} {...otherProps} />;
}

export function TableHeader({ className, children, ...otherProps }: TableHeaderProps) {
  return (
    <h3 className={classNames(styles.tableHeadingWrapper, className)} {...otherProps}>
      {children}
    </h3>
  );
}

export function TableWrapper({ className, heading, children, ...otherProps }: TableWrapperProps) {
  return (
    <div className={classNames(styles.wrapper, className)} {...otherProps}>
      {heading && <TableHeader>{heading}</TableHeader>}
      {children}
    </div>
  );
}

export function Table({ className, ...otherProps }: TableProps) {
  return (
    <BoostrapTable
      borderless
      responsive
      className={classNames(styles.table, className)}
      {...otherProps}
    />
  );
}
