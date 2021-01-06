/* eslint-disable @typescript-eslint/triple-slash-reference */
/// <reference types="node" />
/// <reference types="react" />
/// <reference types="react-dom" />

declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test';
    readonly PUBLIC_URL: string;
    readonly REACT_APP_DEPLOY_MODE: 'standalone' | 'aem';
    readonly REACT_APP_DEPLOY_ENV: 'dev' | 'test' | 'preprod' | 'prod';
    readonly REACT_APP_LANG: string;
    readonly REACT_APP_SPORTRADAR_STATS: string;
    readonly REACT_APP_SPORTRADAR: string;
    readonly REACT_APP_LANG_FR: string;
  }
}

declare module '*.bmp' {
  const src: string;
  export default src;
}

declare module '*.gif' {
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.jpeg' {
  const src: string;
  export default src;
}

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.webp' {
  const src: string;
  export default src;
}

declare module '*.svg' {
  import * as React from 'react';

  export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;

  const src: string;
  export default src;
}

declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.scss' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.sass' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.scss' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.json' {
  const value: string | number | array | Record<string, unknown>;
  export default value;
}

declare module 'fg-loadcss';

declare module '@formatjs/intl-numberformat/locale-data/*';

declare module '@formatjs/intl-datetimeformat/locale-data/*';

declare module '@formatjs/intl-datetimeformat/add-all-tz';

declare module '@formatjs/intl-pluralrules/locale-data/*';
