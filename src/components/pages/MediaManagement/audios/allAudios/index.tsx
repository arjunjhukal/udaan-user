import PageHeader from "../../../../organism/PageHeader";
import AllAudioListing from "./AllAudioList";

export default function AllAudios() {
    return (
        <>
            <PageHeader
                breadcrumb={[{
                    title: "All Audios"
                }]}
            />
            <AllAudioListing />
        </>
    )
}
