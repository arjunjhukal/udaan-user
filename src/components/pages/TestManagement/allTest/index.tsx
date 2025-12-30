import { useTranslation } from "react-i18next";
import PageHeader from "../../../organism/PageHeader";
import AllTestList from "./AllTestList";

export default function AllTestRoot() {
    const { t } = useTranslation();
    return (
        <>
            <PageHeader
                breadcrumb={[{
                    title: t("messages.all_test")
                }]}
            />
            <AllTestList />
        </>
    )
}
