import { useTranslation } from "react-i18next";
import PageHeader from "../../../../organism/PageHeader";
import AllLiveClassList from "./AllLiveClassList";

export default function AllLiveClass() {
  const { t } = useTranslation();
  return (
    <>
      <PageHeader
        breadcrumb={[{
          title: t("menus.liveClasses")
        }]}
      />
      <AllLiveClassList />
    </>
  );
}
