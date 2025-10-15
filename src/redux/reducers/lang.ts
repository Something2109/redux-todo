import type { Reducer } from "redux";
import { Languages, type SupportedLanguage } from "../../lang";

const LangActionType = "LanguageChange" as const;
type LangActionType = typeof LangActionType;

type LangAction = {
  type: LangActionType;
  lang: SupportedLanguage;
};

const reducer: Reducer<SupportedLanguage, LangAction, typeof Languages.EN> = (
  state = Languages.EN,
  action
) => {
  if (!action.lang || !Object.values(Languages).includes(action.lang)) {
    return state;
  }

  return action.lang;
};

function createLangAction(lang: SupportedLanguage): LangAction {
  return {
    type: LangActionType,
    lang,
  };
}

export { reducer, createLangAction };
export type { LangAction };
