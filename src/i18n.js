import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enCommon from './locales/en/common.json';
import enContact from './locales/en/contact.json';
import enHome from './locales/en/home.json';

import frCommon from './locales/fr/common.json';
import frContact from './locales/fr/contact.json';
import frHome from './locales/fr/home.json';

import esCommon from './locales/es/common.json';
import esContact from './locales/es/contact.json';
import esHome from './locales/es/home.json';

const resources = {
  en: {
    common: enCommon,
    contact: enContact,
    home: enHome,
  },
  fr: {
    common: frCommon,
    contact: frContact,
    home: frHome,
  },
  es: {
    common: esCommon,
    contact: esContact,
    home: esHome,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    supportedLngs: ['en', 'fr', 'es'],
    defaultNS: 'common',
    ns: ['common', 'contact', 'home'],
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;
