import { useTranslation } from "react-i18next";
import TodoTable from "../components/todo/Table";

export default function Home() {
  const { t } = useTranslation();

  return (
    <section className="container mx-auto">
      <h1 className="font-bold text-2xl p-4">{t("todo.title")}</h1>

      <TodoTable />
    </section>
  );
}
