import { Nullable, BreakpointRange } from 'commons/types';
import { BackgroundImgBeanRaw, BackgroundImgBean } from 'commons/models/BackgroundImgBean';
import { CtaUrlBean, RawCtaUrlBean } from 'commons/models/CtaUrlBean';
import { isBetween } from 'shared/utils/isBetween';

export enum LabelType {
  Informative,
  Numeric,
  Promo
}

export enum TextColor {
  Grey = 'grey',
  Dark = 'dark',
  Light = 'white'
}

export enum HeroBannerCTAStyle {
  Orange = 'orange',
  Normal = 'normal'
}

export enum HeroBannerBreakpointVisibility {
  All = 'allBreakpoint',
  Desktop = 'desktop',
  Mobile = 'mobile',
  Tablet = 'tablet'
}

export enum HeroBannerUserVisibilityFilter {
  All = 'both',
  LoggedInOnly = 'logged',
  GuestOnly = 'guest'
}

export interface HeroBannerItemRaw {
  readonly breakpoint: HeroBannerBreakpointVisibility;
  readonly imageBackground: Nullable<string>;
  readonly background: string;
  readonly ctaStyle: HeroBannerCTAStyle;
  readonly ctaUrl: Nullable<string>;
  readonly ctaUrlBean: Nullable<RawCtaUrlBean>;
  readonly title: Nullable<string>;
  readonly text: Nullable<string>;
  readonly greenInformativeLabel: Nullable<string>;
  readonly blueInformativeLabel: Nullable<string>;
  readonly yellowInformativeLabel: Nullable<string>;
  readonly iconLabel: Nullable<string>;
  readonly productCategoryIcon: Nullable<string>;
  readonly desktopBackground: Nullable<BackgroundImgBeanRaw>;
  readonly mobileBackground: Nullable<BackgroundImgBeanRaw>;
  readonly textColor: TextColor;
  readonly onTime: Nullable<string>;
  readonly offTime: Nullable<string>;
  readonly openUrl: Nullable<'self' | 'blank'>;
  readonly visibility: HeroBannerUserVisibilityFilter;
  readonly leftImageBackground: Nullable<BackgroundImgBeanRaw>;
  readonly linkCtaLabel: Nullable<string>;
  readonly leftImageBackgroundMobile: Nullable<BackgroundImgBeanRaw>;
}

export class HeroBannerItem {
  readonly title: Nullable<string>;
  readonly ctaUrl: Nullable<string>;
  readonly ctaStyle: HeroBannerCTAStyle;
  readonly linkCtaLabel: Nullable<string>;
  readonly ctaLinkTarget: Nullable<'self' | 'blank'>;
  readonly ctaUrlBean: Nullable<CtaUrlBean>;
  readonly text: Nullable<string>;
  readonly textColor: TextColor;
  readonly desktopBackground: Nullable<BackgroundImgBean>;
  readonly mobileBackground: Nullable<BackgroundImgBean>;
  readonly leftImageBackground: Nullable<BackgroundImgBean>;
  readonly leftImageBackgroundMobile: Nullable<BackgroundImgBean>;
  /**
   * An optional epoch time (millis from January 1st 1970),
   * if it is null it means that its scheduled visibility
   * it does not have a upper bound.
   */
  readonly onTimeEpochTime: Nullable<number>;
  /**
   * An optional epoch time (millis from January 1st 1970),
   * if it is null it means that its scheduled visibility
   * it does not have a upper bound.
   */
  readonly offTimeEpochTime: Nullable<number>;
  readonly breakpointRangeFilter: HeroBannerBreakpointVisibility;
  readonly userVisibilityFilter: HeroBannerUserVisibilityFilter;
  readonly greenInformativeLabel: Nullable<string>;
  readonly blueInformativeLabel: Nullable<string>;
  readonly yellowInformativeLabel: Nullable<string>;
  readonly backgroundColor: string;
  /**
   * Although we can receive all 3 labels at the same time,
   * we diplay at most one label.
   * This member holds the type of the label displayed.
   */
  readonly labelType: LabelType;
  readonly labelText: Nullable<string>;
  readonly productCategoryIcon: Nullable<string>;
  readonly iconLabel: Nullable<string>;

  constructor(data: HeroBannerItemRaw) {
    this.title = data.title;
    this.text = data.text;
    this.ctaStyle = data.ctaStyle;
    this.ctaUrl = data.ctaUrl;
    this.ctaLinkTarget = data.openUrl;
    this.ctaUrlBean = data.ctaUrlBean ? new CtaUrlBean(data.ctaUrlBean) : null;
    this.linkCtaLabel = data.linkCtaLabel;

    this.textColor = data.textColor;
    this.onTimeEpochTime = data.onTime ? new Date(data.onTime).getTime() : null;
    this.offTimeEpochTime = data.offTime ? new Date(data.offTime).getTime() : null;
    this.backgroundColor = data.background;

    this.breakpointRangeFilter = data.breakpoint;
    this.userVisibilityFilter = data.visibility;
    this.desktopBackground = data.desktopBackground
      ? new BackgroundImgBean(data.desktopBackground)
      : null;
    this.mobileBackground = data.mobileBackground
      ? new BackgroundImgBean(data.mobileBackground)
      : null;

    this.leftImageBackgroundMobile = data.leftImageBackgroundMobile
      ? new BackgroundImgBean(data.leftImageBackgroundMobile)
      : null;

    this.leftImageBackground = data.leftImageBackground
      ? new BackgroundImgBean(data.leftImageBackground)
      : null;

    this.greenInformativeLabel = data.greenInformativeLabel;
    this.blueInformativeLabel = data.blueInformativeLabel;
    this.yellowInformativeLabel = data.yellowInformativeLabel;
    this.productCategoryIcon = data.productCategoryIcon;
    this.iconLabel = data.iconLabel;

    if (this.greenInformativeLabel?.trim()) {
      this.labelType = LabelType.Promo;
      this.labelText = this.greenInformativeLabel;
    } else if (this.blueInformativeLabel?.trim()) {
      this.labelType = LabelType.Informative;
      this.labelText = this.blueInformativeLabel;
    } else {
      this.labelType = LabelType.Numeric;
      this.labelText = this.yellowInformativeLabel;
    }
  }

  /**
   * Returns `true` if the banner can be displayed
   * for the current user.
   */
  isAvailableForUser(isSignedInUser: boolean): boolean {
    switch (this.userVisibilityFilter) {
      case HeroBannerUserVisibilityFilter.LoggedInOnly:
        return isSignedInUser;
      case HeroBannerUserVisibilityFilter.GuestOnly:
        return !isSignedInUser;
      default:
        return true;
    }
  }

  /**
   * Returns `true` if the banner can be displayed for the current `breakpointRange`.
   * @param breakpointRange
   */
  isAvailableForBreakpointRange(breakpointRange: BreakpointRange): boolean {
    switch (this.breakpointRangeFilter) {
      case HeroBannerBreakpointVisibility.Desktop:
        return breakpointRange === 'desktop';
      case HeroBannerBreakpointVisibility.Mobile:
        return breakpointRange === 'mobile';
      case HeroBannerBreakpointVisibility.Tablet:
        return breakpointRange === 'tablet';
      default:
        return true;
    }
  }

  /**
   * Returns `true` if input instant is in range
   * `[onTimeEpochTime; offTimeEpochTime]` inclusive.
   * @param instant
   */
  isScheduledToBeVisibleAt(instant: number | Date): boolean {
    const from = Number.isSafeInteger(this.onTimeEpochTime) ? (this.onTimeEpochTime as number) : 0;
    const until = Number.isSafeInteger(this.offTimeEpochTime)
      ? (this.offTimeEpochTime as number)
      : Number.MAX_SAFE_INTEGER;

    return isBetween(instant, from, until);
  }

  /**
   * Returns `true` if the HeroBannerItem can be displayed.
   * @param breakpoint
   * @param channel
   * @param userStatus
   */
  isVisible(breakpoint: BreakpointRange, isSignedInUser: boolean, now: number | Date): boolean {
    return (
      this.isAvailableForUser(isSignedInUser) &&
      this.isAvailableForBreakpointRange(breakpoint) &&
      this.isScheduledToBeVisibleAt(now)
    );
  }
}
