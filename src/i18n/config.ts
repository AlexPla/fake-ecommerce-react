import i18n from 'i18next';
import enTranslation from './en/translation.json';
import esTranslation from './es/translation.json';
import { initReactI18next } from 'react-i18next';

export const resources = {
  en: { translation: enTranslation },
  es: { translation: esTranslation },
} as const;

i18n.use(initReactI18next).init({
  lng: 'en',
  ns: ['en'],
  resources,
});
