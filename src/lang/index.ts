import i18n from "i18next";
import en from "./en";
import vi from "./vi";
import { initReactI18next } from "react-i18next";

const Languages = {
  EN: "en",
  VI: "vi",
} as const;

type SupportedLanguage = (typeof Languages)[keyof typeof Languages];

i18n.use(initReactI18next).init({
  lng: Languages.EN,
  fallbackLng: Languages.EN,
  resources: { en, vi },

  interpolation: {
    escapeValue: false, // react already safes from xss
  },
});

export default i18n;
export { i18n, Languages, type SupportedLanguage };
