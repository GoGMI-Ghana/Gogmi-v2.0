import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Auto-loads every src/locales/<lang>/<namespace>.json file. Adding a new
// namespace only requires creating the three locale files — no edits here.
const localeModules = import.meta.glob('./locales/*/*.json', { eager: true });

const resources = {};
const namespaces = new Set();

for (const path in localeModules) {
  const match = path.match(/\.\/locales\/([a-z]{2})\/([\w-]+)\.json$/);
  if (!match) continue;
  const [, lang, ns] = match;
  resources[lang] ??= {};
  resources[lang][ns] = localeModules[path].default;
  namespaces.add(ns);
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    supportedLngs: ['en', 'fr', 'es'],
    defaultNS: 'common',
    ns: Array.from(namespaces),
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },
  });

export default i18n;
