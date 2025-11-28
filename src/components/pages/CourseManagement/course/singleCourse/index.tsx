import React, { Activity, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetCourseByIdQuery, useGetCourseCurriculumByIdQuery, useGetCourseMediaByTypeQuery, useGetCourseOverviewByIdQuery, useGetCourseTestQuery } from "../../../../../services/courseApi";
import TabController from "../../../../molecules/TabController";
import CourseBanner from "../../../../organism/CourseBanner";
import PurchaseCourseDialog from "../../../../organism/Dialog/PurchaseCourseDialog";
import CourseMediaListing from "./courseMediaListing";
import SinlgeCourseCurriculum from "./curriculum";
import SinlgeCourseOverview from "./overview";
import SinlgeCourseTest from "./test";

export default function SingleCourse() {
    const { id } = useParams();

    const [activeTab, setActiveTab] = useState("overview");
    const [havePurchesed, setHavePurchased] = useState(false);
    const { data: courseBasic, isLoading: loadingBasic } = useGetCourseByIdQuery({ id: Number(id) });

    const { data, isLoading: loadingOverview } = useGetCourseOverviewByIdQuery({ id: Number(id) });
    const { data: curriculum, isLoading: loadingCurriculum } = useGetCourseCurriculumByIdQuery({ id: Number(id) }, { skip: !id });
    const { data: notes, isLoading: loadingNotes } = useGetCourseMediaByTypeQuery({ id: Number(id), type: "notes" }, { skip: !id });
    const { data: audios, isLoading: loadingAudios } = useGetCourseMediaByTypeQuery({ id: Number(id), type: "audios" }, { skip: !id });
    const { data: videos, isLoading: loadingVideos } = useGetCourseMediaByTypeQuery({ id: Number(id), type: "videos" }, { skip: !id });
    const { data: test, isLoading: loadingTest } = useGetCourseTestQuery({ id: Number(id) }, { skip: !id });

    React.useEffect(() => {
        if (data?.data) {
            setHavePurchased(data?.data?.user?.has_purchased)
        }
    }, [data]);

    console.log(data)
    return (
        <>
            <CourseBanner data={courseBasic?.data && courseBasic.data} isLoading={loadingBasic} />
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
            {activeTab === "curriculum" && <Activity><SinlgeCourseCurriculum havePurchased={havePurchesed} data={curriculum?.data?.data} isLoading={loadingCurriculum} /></Activity>}
            {activeTab === "notes" && <Activity><CourseMediaListing havePurchased={havePurchesed} data={notes} isLoading={loadingNotes} type="temp_notes" /></Activity>}
            {activeTab === "audios" && <Activity><CourseMediaListing havePurchased={havePurchesed} data={audios} isLoading={loadingAudios} type="temp_audios" /></Activity>}
            {activeTab === "videos" && <Activity><CourseMediaListing havePurchased={havePurchesed} data={videos} isLoading={loadingVideos} type="temp_video" /></Activity>}
            {activeTab === "tests" && <Activity><SinlgeCourseTest data={test} isLoading={loadingTest} /></Activity>}
            <PurchaseCourseDialog type={courseBasic?.data?.course_type} />
        </>
    )
}
