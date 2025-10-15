import { useTranslation } from "react-i18next";
import { NavLink } from "react-router-dom";
import type { DetailedHTMLProps, SelectHTMLAttributes } from "react";
import routes from "../routes";
import type { RouteObject } from "../routes";
import { Languages } from "../lang";

function ChangeLanguageSelect(
  props: DetailedHTMLProps<
    SelectHTMLAttributes<HTMLSelectElement>,
    HTMLSelectElement
  >
) {
  const { i18n } = useTranslation();

  return (
    <select
      {...props}
      title="Change Language"
      defaultValue={i18n.language}
      onChange={(evt) => i18n.changeLanguage(evt.target.value)}
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
