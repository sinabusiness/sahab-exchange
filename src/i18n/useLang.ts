import { useTranslation } from "react-i18next";
import { RTL_LANGS } from "./resources";

export function useT() {
  const { t } = useTranslation();
  return t;
}

export function useLang() {
  const { i18n } = useTranslation();
  const lang = i18n.language || "en";
  const dir = RTL_LANGS.includes(lang) ? "rtl" : "ltr";
  return { lang, dir };
}
