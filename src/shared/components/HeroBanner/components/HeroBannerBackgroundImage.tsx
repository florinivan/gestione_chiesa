import React from 'react';
import { HeroBannerImageProps } from 'shared/components/HeroBanner/types';
import { getBreakpointSizeFromScss } from 'shared/configuration';

import breakpoint from 'shared/styles/base/_breakpoint.scss';
import once from 'lodash/once';

const getMediaSourceAttributes = once(() => ({
  mobileBackground: `(max-width: ${getBreakpointSizeFromScss(breakpoint.tablet) - 1}px)`,
  defaultBackground: `(min-width: ${getBreakpointSizeFromScss(breakpoint.tablet)}px)`
}));

export function HeroBannerBackgroundImage({
  desktopBackground,
  mobileBackground,
  className,
  ...otherProps
}: HeroBannerImageProps) {
  const mobileBackgroundSrc = mobileBackground?.externalizedOriginalPath;
  const desktopBackgroundSrc = desktopBackground?.externalizedOriginalPath;

  const defaultBackground = desktopBackgroundSrc ? desktopBackground : mobileBackground;

  if (!defaultBackground) {
    return null;
  }

  const mediaAttributes = getMediaSourceAttributes();

  return (
    <picture>
      {mobileBackgroundSrc && (
        <source srcSet={mobileBackgroundSrc} media={mediaAttributes.mobileBackground} />
      )}
      {desktopBackgroundSrc && (
        <source srcSet={desktopBackgroundSrc} media={mediaAttributes.defaultBackground} />
      )}
      <img
        className={className}
        src={defaultBackground?.externalizedOriginalPath}
        alt={defaultBackground.imageDescription}
        {...otherProps}
      />
    </picture>
  );
}
