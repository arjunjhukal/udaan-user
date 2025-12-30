import { useTranslation } from "react-i18next";
import PageHeader from "../../../../organism/PageHeader";
import AllAudioListing from "./AllAudioList";

export default function AllAudios() {
    const { t } = useTranslation()
    return (
        <>
            <PageHeader
                breadcrumb={[{
                    title: t("messages.all_audios")
                }]}
            />
            <AllAudioListing />
        </>
    )
}
