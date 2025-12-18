import PageHeader from "../../../organism/PageHeader";
import AllTestList from "./AllTestList";

export default function AllTestRoot() {
    return (
        <>
            <PageHeader
                breadcrumb={[{
                    title: "All Tests"
                }]}
            />
            <AllTestList />
        </>
    )
}
