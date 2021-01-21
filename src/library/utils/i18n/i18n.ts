import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import {resEn} from '../../../../assets/locales/index';

const languageDetector = {
  type: 'languageDetector',
  async: true, // flags below detection to be async
  detect: callback => {
    callback('en_EN');
  },
  init: () => {},
  cacheUserLanguage: () => {},
};
/**
 * Config i18n for app
 */
i18n
  .use(languageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en_EN',
    resources: resEn,
    // have a common namespace used around the full app
    ns: ['common'],
    defaultNS: 'common',
    debug: false,

    // cache: {
    //   enabled: true
    // },

    interpolation: {
      escapeValue: false, // not needed for react as it does escape per default to prevent xss!
    },
  });

export default i18n;
