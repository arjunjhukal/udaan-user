import PageHeader from "../../../../organism/PageHeader";
import CourseListing from "./CourseListing";

export default function AllCourses() {
    return (
        <>
            <PageHeader
                breadcrumb={[{
                    title: "Explore Courses"
                }]}
            />
            <CourseListing />
        </>
    )
}
