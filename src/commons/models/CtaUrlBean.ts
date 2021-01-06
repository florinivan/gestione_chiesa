import { Nullable } from 'commons/types';

export interface RawCtaUrlBean {
  readonly externalizedUrl: Nullable<string>;
  readonly isAnchor: boolean;
  readonly isInternal: boolean;
  readonly originalUrl: Nullable<string>;
  readonly processedUrl: Nullable<string>;
  readonly resolvedMappedUrl: Nullable<string>;
}

export class CtaUrlBean {
  readonly externalizedUrl: Nullable<string>;
  readonly isAnchor: boolean;
  readonly isInternal: boolean;
  readonly originalUrl: Nullable<string>;
  readonly processedUrl: Nullable<string>;
  readonly resolvedMappedUrl: Nullable<string>;

  constructor(data: RawCtaUrlBean) {
    this.externalizedUrl = data.externalizedUrl;
    this.isAnchor = data.isAnchor;
    this.isInternal = data.isInternal;
    this.originalUrl = data.originalUrl;
    this.processedUrl = data.processedUrl;
    this.resolvedMappedUrl = data.resolvedMappedUrl;
  }
}
