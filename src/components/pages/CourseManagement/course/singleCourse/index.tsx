import { Activity, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetCourseCurriculumByIdQuery, useGetCourseOverviewByIdQuery } from "../../../../../services/courseApi";
import TabController from "../../../../molecules/TabController";
import CourseBanner from "../../../../organism/CourseBanner";
import SingleCourseAudio from "./audio";
import SinlgeCourseCurriculum from "./curriculum";
import SingleCourseNotes from "./notes";
import SinlgeCourseOverview from "./overview";
import SinlgeCourseTest from "./test";
import SingleCourseVideos from "./video";

export default function SingleCourse() {
    const { id } = useParams();

    const [activeTab, setActiveTab] = useState("curriculum");

    const { data, isLoading: loadingOverview } = useGetCourseOverviewByIdQuery({ id: Number(id) });
    const { data: curriculum, isLoading: loadingCurriculum } = useGetCourseCurriculumByIdQuery({ id: Number(id) }, { skip: !id })
    return (
        <>
            <CourseBanner id={id} />
            <div className="mt-8">
                <TabController
                    options={[
                        {
                            label: "Overview",
                            value: "overview"
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
                            label: "Audios",
                            value: "audios"
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
                    setActiveTab={setActiveTab}
                    currentActive={activeTab}

                />
            </div>

            {activeTab === "overview" && <Activity><SinlgeCourseOverview data={data?.data && data.data} isLoading={loadingOverview} /></Activity>}
            {activeTab === "curriculum" && <Activity><SinlgeCourseCurriculum data={curriculum?.data?.data} isLoading={loadingCurriculum} /></Activity>}
            {activeTab === "notes" && <Activity><SingleCourseNotes /></Activity>}
            {activeTab === "audios" && <Activity><SingleCourseAudio /></Activity>}
            {activeTab === "videos" && <Activity><SingleCourseVideos /></Activity>}
            {activeTab === "test" && <Activity><SinlgeCourseTest /></Activity>}

        </>
    )
}
