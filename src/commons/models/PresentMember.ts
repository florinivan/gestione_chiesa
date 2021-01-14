import moment from 'moment';

export interface PresentMemberRaw {
  readonly timestamp: number;
  readonly nome_cognome: string;
  readonly data: string;
  readonly numero_bambini_s_14: number;
  readonly telefono: number;
}

export class PresentMember {
  readonly timestamp: number;
  readonly firstNameLastName: string;
  readonly data: number;
  readonly numberChildren14: number;
  readonly phone: number;

  constructor(data: PresentMemberRaw) {
    this.timestamp = data.timestamp;
    this.firstNameLastName = data.nome_cognome;
    this.data = Date.parse(data.data);
    this.numberChildren14 = data.numero_bambini_s_14;
    this.phone = data.telefono;
  }
}

export class DataPresentChurch {
  readonly dateDay: number | undefined;
  online = false;
  program = '10:00-12:30';
  readonly presents: PresentMember[];

  constructor(data: number, presents: PresentMember[]) {
    this.dateDay = data;
    this.presents = presents;
    moment.locale(process.env.REACT_APP_COUNTRY);
  }
  getDayName() {
    return moment(new Date(this.dateDay || 0))
      .format('dddd')
      .toLocaleUpperCase();
  }

  getdateDayFormat() {
    return moment(new Date(this.dateDay || 0))
      .format('DD MMM')
      .toLocaleUpperCase();
  }
}
