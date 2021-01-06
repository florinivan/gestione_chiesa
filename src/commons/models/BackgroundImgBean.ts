import { Nullable } from 'commons/types';

export interface BackgroundImgBeanRaw {
  externalizedOriginalPath: string;
  originalPath: string;
  originalWidth: number;
  originalHeight: number;
  imageTitle: Nullable<string>;
  imageDescription: string;
  renditionList: string;
  extension: string;
}

export class BackgroundImgBean {
  externalizedOriginalPath: string;
  originalPath: string;
  originalWidth: number | null;
  originalHeight: number | null;
  imageTitle: Nullable<string>;
  imageDescription: string;
  renditionList: string;
  extension: string;

  constructor(data: BackgroundImgBeanRaw) {
    this.externalizedOriginalPath = data ? data.externalizedOriginalPath : ' ';
    this.originalPath = data ? data.originalPath : ' ';
    this.originalWidth = data ? data.originalWidth : null;
    this.originalHeight = data ? data.originalHeight : null;
    this.imageTitle = data ? data.imageTitle : ' ';
    this.imageDescription = data ? data.imageDescription : ' ';
    this.renditionList = data ? data.renditionList : ' ';
    this.extension = data ? data.extension : ' ';
  }
}
