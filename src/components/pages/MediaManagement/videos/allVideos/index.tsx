import PageHeader from "../../../../organism/PageHeader";
import AllVideosListing from "./AllVideosListing";

export default function AllVideos() {
    return (
        <>
            <PageHeader
                breadcrumb={[{
                    title: "All Videos"
                }]}
            />
            <AllVideosListing />
        </>
    )
}
