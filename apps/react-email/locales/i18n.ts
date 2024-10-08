import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  lng: "en",
  fallbackLng: "en",
  ns: ["common"],
  defaultNS: "common",
  resources: {
    en: {
      common: require("./en/common.json"),
    },
    fr: {
      common: require("./fr/common.json"),
    },
  },
  react: { useSuspense: false }, //this line
});

export default i18n;
