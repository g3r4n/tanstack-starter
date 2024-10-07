import i18n from "i18next";
import LngDetector from "i18next-browser-languagedetector";
import ressourceToBackend from "i18next-resources-to-backend";
import { initReactI18next } from "react-i18next";

const defaultNS = "common";
const NS = ["common"];

i18n
  .use(
    ressourceToBackend((language: string, namespace: string) => {
      if (language === "en") {
        return Promise.resolve();
      }
      return import(`../locales/${language}/${namespace}.json`);
    }),
  )
  .use(LngDetector)
  .use(initReactI18next)
  .init({
    ns: [defaultNS],
    fallbackNS: NS,
    defaultNS,
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage"],
      lookupLocalStorage: "i18nextLng",
      caches: ["localStorage"],
    },
  });

export default i18n;
