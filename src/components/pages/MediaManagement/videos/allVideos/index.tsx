import { useTranslation } from "react-i18next";
import PageHeader from "../../../../organism/PageHeader";
import AllVideosListing from "./AllVideosListing";

export default function AllVideos() {
    const {t}=useTranslation();
    return (
        <>
            <PageHeader
                breadcrumb={[{
                    title: t("messages.all_videos")
                }]}
            />
            <AllVideosListing />
        </>
    )
}
