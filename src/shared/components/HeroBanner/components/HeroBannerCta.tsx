import React from 'react';
import classNames from 'classnames';
import { HeroBannerCTAStyle } from 'commons/models/HeroBannerItem';
import { HeroBannerCtaProps } from 'shared/components/HeroBanner/types';
import styles from 'shared/components/HeroBanner/heroBanner.module.scss';

export function HeroBannerCta({ item, ...otherProps }: HeroBannerCtaProps) {
  const { ctaStyle, linkCtaLabel, ctaLinkTarget, ctaUrlBean } = item;

  if (!linkCtaLabel) {
    return null;
  }

  const ctaClassName = classNames(styles.cta, {
    [styles.ctaButton]: ctaStyle === HeroBannerCTAStyle.Orange,
    ['btn btn-secondary btn-sm']: ctaStyle === HeroBannerCTAStyle.Orange,
    [styles.ctaLink]: ctaStyle === HeroBannerCTAStyle.Normal
  });

  if (ctaUrlBean?.externalizedUrl) {
    const target = ctaLinkTarget === 'self' ? '_self' : '_blank';

    return (
      <div className={styles.bottomRow}>
        <a
          href={ctaUrlBean.externalizedUrl}
          target={target}
          rel={target === '_blank' ? 'noopener' : undefined}
          className={ctaClassName}
          {...otherProps}>
          {linkCtaLabel}
        </a>
      </div>
    );
  }

  return (
    <div className={styles.bottomRow}>
      <span className={ctaClassName} {...otherProps}>
        {linkCtaLabel}
      </span>
    </div>
  );
}
