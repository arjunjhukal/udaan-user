import { useTranslation } from "react-i18next";
import PageHeader from "../../../../organism/PageHeader";
import AllNoteList from "./AllNoteList";

export default function AllNotes() {
    const { t } = useTranslation()
    return (
        <>
            <PageHeader
                breadcrumb={[{
                    title: t("messages.all_notes")
                }]}
            />
            <AllNoteList />
        </>
    )
}
