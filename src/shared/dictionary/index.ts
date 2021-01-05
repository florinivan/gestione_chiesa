import config from 'shared/configuration';

export const getMessages = (locale?: string): Record<string, string> => {
  try {
    return require(`./json/${locale}.json`);
  } catch (e) {
    return require('./json/' + config.DEFAULT_LOCALE + '.json');
  }
};
