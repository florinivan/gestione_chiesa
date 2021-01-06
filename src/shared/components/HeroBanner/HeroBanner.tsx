import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import classNames from 'classnames';
import { HeroBannerProps } from 'shared/components/HeroBanner/types';
import { useGetBreakpointRange } from 'shared/hooks/media-queries';
import styles from 'shared/components/HeroBanner/heroBanner.module.scss';
import { HeroBannerSlide } from 'shared/components/HeroBanner/components/HeroBannerSlide';
import 'shared/components/HeroBanner/carouselStyles.scss';

export function HeroBanner({
  items,
  className,
  interval = null,
  controls = false,
  ...otherProps
}: HeroBannerProps) {
  const breakpointView = useGetBreakpointRange();
  if (items.length < 1) {
    return null;
  }

  return (
    <div className={classNames(className, styles.heroBannerWrapper)}>
      {items.length === 1 ? (
        <HeroBannerSlide item={items[0]} breakpointView={breakpointView} />
      ) : (
        <Carousel
          tabIndex="0"
          aria-roledescription="carousel"
          interval={interval}
          controls={controls}
          className={'hero-banner-carousel'}
          {...otherProps}>
          {items.map((item, index: number) => {
            const ariaLabel = `${index + 1} of ${items.length}`;

            return (
              <Carousel.Item
                role="group"
                aria-roledescription={'slide'}
                aria-label={ariaLabel}
                key={(item.title ?? '') + index}>
                <HeroBannerSlide item={item} breakpointView={breakpointView} />
              </Carousel.Item>
            );
          })}
        </Carousel>
      )}
    </div>
  );
}
