import { useTranslation } from 'react-i18next';
import { languages, type LangCode } from './resources';
import { useCallback } from 'react';

export function useLang() {
  const { i18n } = useTranslation();
  const currentLang = languages.find(l => l.code === i18n.language) || languages[2];

  const setLang = useCallback((code: LangCode) => {
    const lang = languages.find(l => l.code === code);
    if (!lang) return;
    i18n.changeLanguage(code);
    document.documentElement.lang = code;
    document.documentElement.dir = lang.dir;
  }, [i18n]);

  return { lang: currentLang, setLang, languages };
}

export function useT() {
  const { t } = useTranslation();
  return t;
}
