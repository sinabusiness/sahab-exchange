import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { resources, LANGUAGES, RTL_LANGS } from "./resources";
import { dashboardResources } from "./dashboard";

// Merge dashboard namespace into each language's translation
const mergedResources: any = {};
for (const code of Object.keys(resources)) {
  mergedResources[code] = {
    translation: {
      ...(resources as any)[code].translation,
      dashboard: dashboardResources[code] ?? dashboardResources.en,
    },
  };
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: mergedResources,
    fallbackLng: "en",
    supportedLngs: LANGUAGES.map((l) => l.code),
    interpolation: { escapeValue: false },
    detection: {
      order: ["localStorage", "navigator", "htmlTag"],
      caches: ["localStorage"],
      lookupLocalStorage: "lang",
    },
  });

const applyDir = (lng: string) => {
  const isRtl = RTL_LANGS.includes(lng);
  document.documentElement.lang = lng;
  document.documentElement.dir = isRtl ? "rtl" : "ltr";
};

applyDir(i18n.language || "en");
i18n.on("languageChanged", applyDir);

export default i18n;
