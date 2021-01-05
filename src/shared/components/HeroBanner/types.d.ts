import { HTMLAttributes } from 'react';
import { CarouselProps } from 'react-bootstrap/Carousel';
import { HeroBannerItem } from 'commons/models/HeroBannerItem';
import { BackgroundImgBean } from 'commons/models/BackgroundImgBean';
import { BreakpointRange, Nullable } from 'commons/types';

export interface HeroBannerConfig {
  bgImageSrc?: string;
  bgImageColor?: string;
  sideImage?: string;
  title?: string;
  subTitle?: string;
}

export interface HeroBannerSlideProps extends HTMLAttributes<HTMLDivElement> {
  item: HeroBannerItem;
  breakpointView: BreakpointRange;
}

export interface HeroBannerCtaProps extends HTMLAttributes {
  item: HeroBannerItem;
}

export interface HeroBannerImageProps
  extends Omit<HTMLAttributes<HTMLImageElement>, 'src' | 'alt'> {
  mobileBackground: Nullable<BackgroundImgBean>;
  desktopBackground: Nullable<BackgroundImgBean>;
}

export interface HeroBannerProps extends CarouselProps {
  items: HeroBannerItem[];
}
