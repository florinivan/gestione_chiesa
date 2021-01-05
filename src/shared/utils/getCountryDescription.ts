import countries from 'shared/utils/countries/countries.json';

export interface CountryPathname {
  code: string | undefined;
  description?: string | undefined;
  isCountryITAorINT: boolean | undefined;
}

/**
 * Get country description by competition or country name
 * @param competitionDescription
 * @param country
 */
export const getCountryDescription = (
  competitionDescription?: string,
  country?: string | undefined
) => {
  if (!competitionDescription) {
    return {
      code: undefined,
      description: undefined,
      isCountryITAorINT: false
    };
  }
  let code: string | undefined, descriptionCountry;
  // prefix country for first char
  const prefixCountry = competitionDescription.indexOf(' ');
  // check if prifix is present else get prefix country from name of country
  if (prefixCountry !== -1) {
    code = competitionDescription.substring(0, prefixCountry);
    descriptionCountry = countries.countries.find(c => c.code === code)?.description;
    if (!descriptionCountry) {
      code = undefined;
    }
  } else {
    code = getCountryCode(country);
  }
  descriptionCountry = descriptionCountry ?? country;
  // check if the country is INT o ITA
  const regExpresion = /ita|int|ITA|INT/g;
  const isCountryITAorINT = regExpresion.test(code ?? '');

  return {
    code: code,
    description: descriptionCountry,
    isCountryITAorINT: isCountryITAorINT
  };
};

/**
 * Get country description by country code from json countries
 * @param contryDescription
 */
export const getCountryCode = (contryDescription?: string | null | undefined) => {
  let codeCountry: undefined | string;

  if (contryDescription) {
    codeCountry = countries.countries.find(c => c.description === contryDescription)?.code;
  }
  return codeCountry?.toLocaleLowerCase();
};
