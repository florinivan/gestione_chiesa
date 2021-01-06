// https://www.sisal.it/scommesse-matchpoint/vincita-del-giorno
export interface FeedBettingDetailRaw {
  readonly codiceDisciplina: number;
  readonly descrizioneDisciplina: string;
  readonly codiceManifestazione: number;
  readonly descrizioneManifestazione: string;
  readonly codicePalinsesto: number;
  readonly codiceAvvenimento: number;
  readonly descrizioneAvvenimento: string;
  readonly dataOraAvvenimento: Date;
  readonly codiceClasseEsito: number;
  readonly infoAggiuntiva: number;
  readonly infoAggiuntivaDescr: string;
  readonly descrizioneClasseEsito: string;
  readonly codiceEsito: string;
  readonly descrizioneEsito: string;
  readonly quota: number;
  readonly risultato: number;
  readonly complementare: boolean;
  readonly idProvider: number;
  readonly golden: boolean;

  // FeedScommessaDettaglioBase
  readonly serialVersionUID: string;
  readonly iconaDisc: string;
  readonly quotaFrmt: string;
  readonly vrolRace: boolean;
}

export class FeedBettingDetail {
  readonly sportKey: number;
  readonly sportDescription: string;
  readonly competitionId: number;
  readonly descriptionCompetition: string;
  readonly programId: number;
  readonly regulatorId: number;
  readonly descriptionEvent: string;
  readonly dateAndHour: Date;
  readonly marketTypeId: number;
  readonly marketAttribute: number;
  readonly descriptionMarketAttribute: string;
  readonly descriptionMarketType: string;
  readonly selectionId: string;
  readonly descriptionSelection: string;
  readonly selectionPrice: number;
  readonly marketResult: number;
  readonly complementary: boolean;
  readonly idProvider: number;
  readonly golden: boolean;
  readonly serialVersionUID: string;
  readonly iconDisc: string;
  readonly quotaFrmt: string;
  readonly vrolRace: boolean;

  constructor(data: FeedBettingDetailRaw) {
    this.sportKey = data.codiceDisciplina;
    this.sportDescription = data.descrizioneDisciplina;
    this.competitionId = data.codiceManifestazione;
    this.descriptionCompetition = data.descrizioneManifestazione;
    this.programId = data.codicePalinsesto;
    this.regulatorId = data.codiceAvvenimento;
    this.descriptionEvent = data.descrizioneAvvenimento;
    this.dateAndHour = data.dataOraAvvenimento;
    this.marketTypeId = data.codiceClasseEsito;
    this.marketAttribute = data.infoAggiuntiva;
    this.descriptionMarketAttribute = data.infoAggiuntivaDescr;
    this.descriptionMarketType = data.descrizioneClasseEsito;
    this.selectionId = data.codiceEsito;
    this.descriptionSelection = data.descrizioneEsito;
    this.selectionPrice = data.quota;
    this.marketResult = data.risultato;
    this.complementary = data.complementare;
    this.idProvider = data.idProvider;
    this.golden = data.golden;

    this.serialVersionUID = data.serialVersionUID;
    this.iconDisc = data.iconaDisc;
    this.quotaFrmt = data.quotaFrmt;
    this.vrolRace = data.vrolRace;
  }
}

export interface TopWinnerRaw {
  readonly nome: string;
  readonly username: string;
  readonly cognome: string;
  readonly provinciaRes: string;
  readonly importoVendita: string;
  readonly importoVincita: string;
  readonly tsn: string;
  readonly codiceConto: string;
  readonly pdvEmiCitta: string;
  readonly pdvEmiProvincia: string;
  readonly bonusMultiplaNumero: number;
  readonly dettagliScommessaVincente: FeedBettingDetailRaw[];
}

export class TopWinner {
  readonly name: string;
  readonly username: string;
  readonly lastName: string;
  readonly provinceRes: string;
  readonly amountPlayed: string;
  readonly amountWinning: string;
  readonly tsn: string;
  readonly accountCode: string;
  readonly pdvEmiCity: string;
  readonly pdvEmiProvince: string;
  readonly bonusBaseNumber: number;
  readonly bettingList: FeedBettingDetail[];

  constructor(data: TopWinnerRaw) {
    this.name = data.nome;
    this.username = data.username;
    this.lastName = data.cognome;
    this.provinceRes = data.provinciaRes;
    this.amountPlayed = data.importoVendita;
    this.amountWinning = data.importoVincita;
    this.tsn = data.tsn;
    this.accountCode = data.codiceConto;
    this.pdvEmiCity = data.pdvEmiCitta;
    this.pdvEmiProvince = data.pdvEmiProvincia;
    this.bonusBaseNumber = data.bonusMultiplaNumero;
    this.bettingList = data?.dettagliScommessaVincente.map(
      (item: FeedBettingDetailRaw) => new FeedBettingDetail(item)
    );
  }
  getFirstLetterLastNameWithPoint() {
    return this.lastName.charAt(0).concat('.');
  }
}
