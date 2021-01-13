import { Nullable } from 'commons/types';
import { toSeoPath } from 'commons/utils';

export interface RawMenu {
  readonly label: Nullable<string>;
  readonly isAnchor: boolean;
  readonly isInternal: boolean;
  readonly icon: Nullable<string>;
  readonly posizione: number;
  readonly data: string;
  readonly key: string;
}

export class Menu {
  readonly label: Nullable<string>;
  readonly isAnchor: boolean;
  readonly isInternal: boolean;
  readonly icon: Nullable<string>;
  readonly posizione: number;
  readonly data: string;
  readonly key: string;

  constructor(data: RawMenu) {
    this.label = data.label;
    this.isAnchor = data.isAnchor;
    this.isInternal = data.isInternal;
    this.icon = data.icon;
    this.posizione = data.posizione;
    this.data = data.data;
    this.key = data.key;
  }

  getPathname() {
    return toSeoPath(this.label?.toString());
  }
}
