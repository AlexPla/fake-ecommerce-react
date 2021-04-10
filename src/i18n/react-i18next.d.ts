import 'react-i18next';
import en from './en/translation.json';

declare module 'react-i18next' {
  interface Resources {
    en: typeof en;
  }
}