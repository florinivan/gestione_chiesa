import moment from 'moment';

export interface PresentMemberRaw {
  timestamp: number;
  nome_cognome: string;
  data: string;
  numero_bambini_s_14: string;
  telefono: number;
}

interface PresentMemberBase {
  getDateNow(): number;
}
export class PresentMember implements PresentMemberBase {
  readonly timestamp: number;
  readonly firstNameLastName: string;
  readonly data: number;
  readonly numberChildren14: number;
  readonly phone: number;

  constructor(data: PresentMemberRaw) {
    this.timestamp = data.timestamp;
    this.firstNameLastName = data.nome_cognome;
    this.data = Date.parse(data.data);
    this.numberChildren14 = parseInt(data.numero_bambini_s_14) || 0;
    this.phone = data.telefono;
  }

  getDateNow() {
    return Date.now();
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
      .format('MMM yy')
      .toLocaleUpperCase();
  }

  getdateDay() {
    return moment(new Date(this.dateDay || 0))
      .format('DD')
      .toLocaleUpperCase();
  }

  getNumberChildren() {
    return this.presents.reduce(function (tot, arr) {
      // return the sum with previous value
      return tot + arr.numberChildren14;

      // set initial value as 0
    }, 0);
  }

  getTotalPerson() {
    return this.presents.length + this.getNumberChildren();
  }
}
