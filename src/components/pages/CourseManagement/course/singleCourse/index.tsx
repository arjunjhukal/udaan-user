import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useGetCourseByIdQuery } from "../../../../../services/courseApi";
import { renderHtml } from "../../../../../utils/renderHtml";
import TabController from "../../../../molecules/TabController";
import InstructorCard from "../../../../organism/Cards/InstructorCard";
import CourseBanner from "../../../../organism/CourseBanner";

export default function SingleCourse() {
    const { id } = useParams();
    const { data, isLoading } = useGetCourseByIdQuery({ id: id || "" });
    console.log({ data: data?.data, isLoading })
    return (
        <>
            <CourseBanner />
            <div className="mt-8">
                <TabController
                    options={[
                        {
                            label: "Overview",
                            value: "Overview"
                        },
                        {
                            label: "Curriculum",
                            value: "curriculum"
                        },
                        {
                            label: "Notes",
                            value: "notes"
                        },
                        {
                            label: "Videos",
                            value: "videos"
                        },
                        {
                            label: "Tests",
                            value: "tests"
                        },
                        {
                            label: "Reviews",
                            value: "reviews"
                        },
                    ]}
                    setActiveTab={() => { }}
                    currentActive="overview"

                />
            </div>
            <div className="general-content">
                {renderHtml(data?.data?.description || "")}
            </div>

            <div className="mt-8">
                <Typography className="mb-4!">Instructors</Typography>
                <InstructorCard />
            </div>
        </>
    )
}
