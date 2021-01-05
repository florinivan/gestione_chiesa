enum ERROR_MESSAGE {
  BET_REFUSED_BY_RISK_ACCEPTANCE = -10050, // SdG - Bet refused by risk acceptance (Account blacklisted)
  INVALID_BETSLIP_STAKE_LOWER_THAN_MINIMUM = -1026, // Invalid betslip. Stake lower than minimum -- Biglietto non valido – Importo scommessa inferiore alla giocata minima
  MAXIMUM_COMBINATIONS_NUMBER_EXCEEDED = -1097, // Maximum combinations number exceeded -- Superato numero massimo di combinazioni giocabile a sistema
  MAX_TICKET_COUNT_EXCEEDED = -10136, // SdG – Max ticket count exceeded -- SdG – Superato massimo numero di biglietti

  EVENT_INCOMPATIBLE_WITH_SYSTEM_BET = -10142, // SdG - Event <event_code>, Prog.<program_code> incompatible with system bet -- SdG – Avvenimento <cod_avvenimento>, Pal. <cod_palinsesto> non giocabile a sistema
  BETTING_TYPE_INCOMPATIBLE_WITH_SYSTEM_BET = -10143, // SdG - Betting type <market_type_id>, <market_attribute>, <program_code>, <event_code> incompatible with system bet --  SdG – Classe d’esito <cod_classe>, Info Agg.<info_agg>, Pal. <cod_palinsesto>, Avv. <cod_avvenimento> non giocabile a sistema
  BETTING_PLACEMENT_LIMIT_EXCEEDED = -10325, // SdG - Betting placement limit exceeded
  INCOMPATIBLE_SYSTEM_OR_UNACCEPTABLE_BET = -10043, // SdG - Incompatible system or unacceptable bet -- SdG – Sistema non compatibile o scommessa non accettabile

  INVALID_RESULT = -10445, // SdG - Invalid result <selection_code>, Prog.<program_code>, Event<event_code>, MrkTp.<market_type_id>,<Market_Attribute> -- SdG – Esito <cod_esito>, Pal. <cod_palinsesto>, Avv. <cod_avvenimento>, Classe <cod_classe>, Info Agg.<info_agg> non valido
  NON_COMPATIBLE_SELECTION_LIGATURES = -10446, // SdG - Non-compatible selection ligatures <selection_code>, Prog.<program_code>, Event<event_code>, MrkTp.<market_type_id>,<Market_Attribute> -- SdG – Legature esito <cod_esito>, Pal. <cod_palinsesto>, Avv. <cod_avvenimento>, Classe <cod_classe>, Info Agg.<info_agg> non compatibili
  INVALID_MARKET = -10448, // SdG - Invalid market -- SdG – Classe esito non valida
  REPEATED_BETSLIP_LIMIT_EXCEEDED = -1102, // Repeated betslip limit exceeded (Prog.: <prog_ code 1>, Avv.: <event_code1>, Classe: <market_type_id1>, Esito: <result_code1>; ...; Pal.: < prog_ codeN>, Avv.: < event_codeN>, Classe: < market_type_idN>, Esito: <result_codeN>) -- Superato limite identiche ripetute (Pal.: <cod_pal1>, Avv.: <cod_avv1>, Classe: <cod_classe1>, Esito: <cod_esito1>; ...; Pal.: <cod_palN>, Avv.: <cod_avvN>, Classe: <cod_classeN>, Esito: <cod_esitoN>)
  SPORT_ODDS_CHANGED_BET_NOT_PLACED = -1019, // Sport odds changed. Bet not placed -- Quote biglietto sport variate – Vendita non effettuata
  INVALID_BETSLIP_STAKE_HIGHER_THAN_ALLOWED_MAXIMUM = -1036, //Invalid betslip. Stake higher than allowed maximum (<max_stake_amount> euro) -- Biglietto non valido – Importo scommessa superiore al limite consentito (<limite_max) euro)
  INVALID_BETSLIP_INVALID_PAYOUT = -1061, // Invalid betslip. Invalid payout --  Biglietto non valido – Importo vincita non valido

  INVALID_BETSLIP_PAYOUT_GREATER_THAN_MAXIMUM_ALLOWED = -1062, // Invalid betslip. Payout greater than maximum allowed (<max_winning_amount> euro) -- Biglietto non valido – La vincita potenziale è superiore al limite consentito (<vincita_max> euro)
  INVALID_BETSLIP_INCOMPATIBLE_BET = -1070, // Invalid betslip - (Event: <sequence_number>) Incompatible bet (betslip must contain at least <min_blacklist> bets) -- Biglietto non valido – (Avvenimento: <progressivo>) La scommessa non è compatibile con le scommesse presenti (il biglietto deve contenere almeno <blacklist_min> scommesse)
  INVALID_BETSLIP_INCOMPATIBLE_EVENTS_MAXIMUM_ALLOWED = -1071, // Invalid betslip - (Event: <sequence_number>) Incompatible events: maximum <max_blacklist> allowed -- Biglietto non valido – (Avvenimenti: <progressivo1>..<progressivoN>) Gli avvenimenti non sono fra loro compatibili: ne sono consentiti al massimo <blacklist_max> nel biglietto
  MAXIMUM_COMBINATION_STAKE_EXCEEDED = -1098, //Maximun combination stake exceeded -- Superato importo massimo giocabile per combinazione a sistema

  EVENT_NOT_PLAYABLE = -10002, // SdG - Event <event_code>, Prog. <program_code> not playable -- SdG – Avvenimento <cod_avvenimento>, Pal. <cod_palinsesto> non giocabile
  SERVICE_UNAVAILABLE = -1006, // Service unavailable -- Servizio non disponibile
  INVALID_CREDENTIAL = -3507, //  Invalid credentials -- Credenziali non valide

  INSUFFICIENT_ACCOUNT_BALANCE = -1022, // Insufficient account balance -- Saldo conto insufficiente
  BET_REFUSED = -4, // Your bet has been declined -- la tua scommessa è stata rifiutata
  BET_NOT_EVALUATED = -5, // Due to heavy traffic your bet has not been evaluated. Please try again in a few minutes --  A causa dell''intenso traffico la tua scommessa non è stata valutata. Riprova tra qualche minuto
  EXCEEDED_LIMIT_REPEATED_BETS = -1202 // You have exceeded the limit of repeated identical bets -- Hai superato il limite di giocate identiche ripetute
}

enum SUCCESS_MESSAGE {
  SUCCESS = 0 // Success -- Operazione eseguita
}
enum WARNING_MESSAGE {
  BET_IN_RISK_ACCEPTANCE = -10049 //  SdG - Bet in risk acceptance -- SdG – Scommessa sottomessa ad accettazione del rischio
}
enum ACCEPTANCE_MESSAGE {
  REFUSED = 4,
  TIMEOUT = 5,
  ACCEPTED = '00'
}

export { ERROR_MESSAGE, SUCCESS_MESSAGE, WARNING_MESSAGE, ACCEPTANCE_MESSAGE };
