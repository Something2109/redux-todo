import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import type {
  ChangeEvent,
  DetailedHTMLProps,
  SelectHTMLAttributes,
} from "react";
import { useDispatch, useSelector } from "react-redux";
import routes from "../routes";
import type { RouteObject } from "../routes";
import { Languages, type SupportedLanguage } from "../lang";
import type { MainState } from "../redux/store";
import { createLangAction } from "../redux/reducers/lang";

function ChangeLanguageSelect(
  props: DetailedHTMLProps<
    SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  >
) {
  const lang = useSelector<MainState, SupportedLanguage>((state) => state.lang);
  const dispatch = useDispatch();

  const onChange = (evt: ChangeEvent<HTMLSelectElement>) => {
    dispatch(createLangAction(evt.target.value as SupportedLanguage));
  };

  return (
    <select
      {...props}
      title="Change Language"
      defaultValue={lang}
      onChange={onChange}
    >
      {Object.values(Languages).map((lang) => (
        <option key={`lang-${lang}`} value={lang}>
          {lang}
        </option>
      ))}
    </select>
  );
}

function NavigationBar({ routes }: { routes: RouteObject[] }) {
  const { t } = useTranslation();

  return (
    <nav>
      <ul className="flex flex-row gap-4 items-center">
        {routes.map(({ path, prefix }) => (
          <li key={path}>
            <NavLink className="hover:scale-95 transition-[scale]" to={path}>
              {t(`${prefix}.title`)}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default function Header() {
  return (
    <header className="flex flex-row justify-between items-center bg-blue-500 text-white px-[5%] py-6">
      <h1 className="font-bold text-3xl">Todo App</h1>

      <div className="flex flex-row gap-4 items-center">
        <ChangeLanguageSelect className="focus:outline-none" />

        <NavigationBar routes={routes} />
      </div>
    </header>
  );
}
