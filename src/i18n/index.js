import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './locales/en.json'
import ta from './locales/ta.json'

const supportedLanguages = ['en', 'ta']
const savedLanguage = window.localStorage.getItem('quick-search-language')
const initialLanguage = supportedLanguages.includes(savedLanguage) ? savedLanguage : 'en'

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    ta: { translation: ta },
  },
  lng: initialLanguage,
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
})

i18n.on('languageChanged', (language) => {
  if (supportedLanguages.includes(language)) {
    window.localStorage.setItem('quick-search-language', language)
  }
})

export default i18n
