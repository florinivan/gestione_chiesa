import React from 'react';
import classNames from 'classnames';

import { NewIcon } from 'shared/atomic-ui/Icon/Icon';
import { formatTimeSlotHour } from 'shared/components/TimeSlotHeader/helpers';
import { useGetBreakpointRange } from 'shared/hooks/media-queries';

import styles from 'shared/components/TimeSlotHeader/timeSlotHeader.module.scss';

interface TimeSlotHeaderProps {
  idHeader: number;
  hourStart: number;
  hourEnd: number;
  isActive?: boolean;
  onHeaderClick(idHeader: number): void;
}

export function TimeSlotHeader({
  idHeader,
  hourStart,
  hourEnd,
  isActive,
  onHeaderClick
}: TimeSlotHeaderProps) {
  const breakpoint = useGetBreakpointRange();
  const isGridMobile = breakpoint === 'mobile' || breakpoint === 'tablet';
  const className = classNames(
    styles.header,
    isGridMobile && styles.mobile,
    !isGridMobile && 'bg-dark-blue'
  );

  const hourStartString: string = formatTimeSlotHour(hourStart);
  const hourEndString: string = formatTimeSlotHour(hourEnd);

  const fa = isActive ? 'Arrow-Up' : 'Arrow-Down';
  return (
    <div className={className} onClick={() => onHeaderClick(idHeader)}>
      <NewIcon className="d-flex" color="white" size="icon-size-24" name="Live" />
      <span className={styles.time}>
        {hourStartString} - {hourEndString}
      </span>
      <div className={`${styles.pointer} iconContainer`}>
        <NewIcon className="d-flex" color="white" size="icon-size-22" name={fa} />
      </div>
    </div>
  );
}
