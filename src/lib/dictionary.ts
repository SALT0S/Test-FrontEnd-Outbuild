import { i18n, Lang } from '@/i18n.config';
import 'server-only';

const dictionaries = {
  en: () => import('../dictionaries/en.json').then((module) => module.default),
  es: () => import('../dictionaries/es.json').then((module) => module.default),
};

export const getDictionary = async (locale: Lang) =>
  dictionaries[i18n.locales.includes(locale) ? locale : i18n.defaultLocale]();
