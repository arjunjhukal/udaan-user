import PageHeader from "../../../../organism/PageHeader";
import AllNoteList from "./AllNoteList";

export default function AllNotes() {
    return (
        <>
            <PageHeader
                breadcrumb={[{
                    title: "All Notes"
                }]}
            />
            <AllNoteList />
        </>
    )
}
