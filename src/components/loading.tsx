import { useTranslation } from "react-i18next";

export default function Loading() {
  const { t } = useTranslation();

  return <span>{t("common.loading")}</span>;
}
