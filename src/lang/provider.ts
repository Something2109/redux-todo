import { useRef, useEffect, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import type { MainState } from "../redux/store";
import type { SupportedLanguage } from ".";
import type { i18n } from "i18next";

const changeLanguage = (i18next: i18n, lang: SupportedLanguage) => {
  if (lang !== i18next.language) {
    i18next.changeLanguage(lang);
  }
};

export default function LanguageProvider({
  children,
}: {
  children: ReactNode;
}) {
  const isFirstRender = useRef(true);
  const { i18n } = useTranslation();
  const lang = useSelector<MainState, SupportedLanguage>((state) => state.lang);

  if (isFirstRender.current && lang !== i18n.language) {
    changeLanguage(i18n, lang);
    isFirstRender.current = false;
  }

  useEffect(() => {
    changeLanguage(i18n, lang);
  }, [i18n, lang]);

  return children;
}
