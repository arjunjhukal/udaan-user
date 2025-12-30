import { useTranslation } from "react-i18next";
import PageHeader from "../../../../organism/PageHeader";
import CourseListing from "./CourseListing";

export default function AllCourses() {
    const { t } = useTranslation();
    return (
        <>
            <PageHeader
                breadcrumb={[
                    {
                        title: t("menus.exploreCourse")
                    }
                ]}
            />
            <CourseListing />
        </>
    )
}
