import { useTranslation } from "react-i18next";
import TodoTable from "../components/todo/Table";
import LoadingWrapper from "../components/todo/LoadingWrapper";

export default function Home() {
  const { t } = useTranslation();

  return (
    <section>
      <h1 className="font-bold text-2xl p-4">{t("todo.title")}</h1>

      <LoadingWrapper>
        <TodoTable />
      </LoadingWrapper>
    </section>
  );
}
