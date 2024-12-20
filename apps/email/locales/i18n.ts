import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  lng: "en",
  fallbackLng: "en",
  ns: ["common"],
  defaultNS: "common",
  resources: {
    en: {
      common: import("./en/common.json"),
    },
    fr: {
      common: import("./fr/common.json"),
    },
  },
  react: { useSuspense: false }, //this line
});

export default i18n;
