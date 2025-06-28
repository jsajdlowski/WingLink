import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import commonEN from './locales/en/common.json'
import commonPL from './locales/pl/common.json'
import afterBuyEN from './locales/en/afterBuy.json'
import afterBuyPL from './locales/pl/afterBuy.json'
import destinationsEN from './locales/en/destinations.json'
import destinationsPL from './locales/pl/destinations.json'
import notFoundEN from './locales/en/notFound.json'
import notFoundPL from './locales/pl/notFound.json'

const resources = {
  en: {
    common: commonEN,
    afterBuy: afterBuyEN,
    destinations: destinationsEN,
    notFound: notFoundEN,
  },
  pl: {
    common: commonPL,
    afterBuy: afterBuyPL,
    destinations: destinationsPL,
    notFound: notFoundPL,
  },
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    defaultNS: 'common',
    keySeparator: '.',
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n
