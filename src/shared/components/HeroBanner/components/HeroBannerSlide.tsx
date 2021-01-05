import React, { CSSProperties } from 'react';
import classNames from 'classnames';
import { LabelType, TextColor } from 'commons/models/HeroBannerItem';
import { HeroBannerSlideProps } from 'shared/components/HeroBanner/types';
import { HeroBannerCta } from 'shared/components/HeroBanner/components/HeroBannerCta';
import { HeroBannerBackgroundImage } from 'shared/components/HeroBanner/components/HeroBannerBackgroundImage';
import styles from 'shared/components/HeroBanner/heroBanner.module.scss';

export function HeroBannerSlide({
  item,
  className,
  breakpointView,
  ...otherProps
}: HeroBannerSlideProps) {
  const {
    labelText,
    labelType,
    title,
    text,
    textColor,
    backgroundColor,
    productCategoryIcon,
    iconLabel,
    mobileBackground,
    desktopBackground,
    leftImageBackground,
    leftImageBackgroundMobile
  } = item;

  const chipClassName = classNames(styles.chip, {
    [styles.info]: labelType === LabelType.Informative,
    [styles.numericContent]: labelType === LabelType.Numeric,
    [styles.bonus]: labelType === LabelType.Promo
  });

  const wrapperDynamicStyles: CSSProperties = {
    background: backgroundColor
  };

  const textContentDynamicStyles: CSSProperties = {};

  return (
    <section
      style={wrapperDynamicStyles}
      className={classNames(styles.heroBannerItemWrapper, className, {
        [styles.light]: textColor === TextColor.Light,
        [styles.dark]: textColor === TextColor.Dark,
        [styles.grey]: textColor === TextColor.Grey
      })}
      {...otherProps}>
      <HeroBannerBackgroundImage
        className={styles.backgroundImage}
        mobileBackground={mobileBackground}
        desktopBackground={desktopBackground}
      />
      {productCategoryIcon && (
        <span className={classNames(styles.topIconWrapper, 'category-games')}>
          <i className={classNames('icon', productCategoryIcon, styles.topIcon)}></i>
          {iconLabel && <span className="text-12 font-weight-bold">{iconLabel}</span>}
        </span>
      )}
      <HeroBannerBackgroundImage
        className={styles.sideImage}
        mobileBackground={leftImageBackgroundMobile}
        desktopBackground={leftImageBackground}
      />
      <div style={textContentDynamicStyles} className={styles.textContent}>
        <div className={styles.topRow}>
          {labelText && <span className={chipClassName}>{labelText}</span>}
        </div>
        <header className={styles.header}>
          {title && <h4 className={styles.title}>{title}</h4>}
        </header>
        <p className={styles.subTitle}>{text}</p>
        <HeroBannerCta item={item} />
      </div>
    </section>
  );
}
