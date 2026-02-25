import React, { createContext, useContext, useEffect, useState } from 'react'
import enTranslations from '../i18n/en.json'
import jaTranslations from '../i18n/ja.json'
import plTranslations from '../i18n/pl.json'
import ruTranslations from '../i18n/ru.json'

const LanguageContext = createContext(null)

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider')
  }
  return context
}

const translations = {
  en: enTranslations,
  pl: plTranslations,
  ja: jaTranslations,
  ru: ruTranslations,
}

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('language')
    return saved && translations[saved] ? saved : 'en'
  })

  useEffect(() => {
    localStorage.setItem('language', language)
  }, [language])

  const t = key => {
    return translations[language][key] || key
  }

  const selectLanguage = lang => {
    if (translations[lang]) {
      setLanguage(lang)
    }
  }

  return (
    <LanguageContext.Provider value={{ language, t, setLanguage: selectLanguage }}>
      {children}
    </LanguageContext.Provider>
  )
}
