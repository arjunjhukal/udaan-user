import React, { Activity, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetCourseByIdQuery, useGetCourseCurriculumByIdQuery, useGetCourseMediaByTypeQuery, useGetCourseOverviewByIdQuery, useGetCourseTestQuery } from "../../../../../services/courseApi";
import TablePagination from "../../../../molecules/Pagination";
import TabController from "../../../../molecules/TabController";
import CourseBanner from "../../../../organism/CourseBanner";
import PurchaseCourseDialog from "../../../../organism/Dialog/PurchaseCourseDialog";
import ReadingDialog from "../../../../organism/Dialog/ReadingDialog";
import CourseMediaListing from "./courseMediaListing";
import SinlgeCourseCurriculum from "./curriculum";
import SinlgeCourseOverview from "./overview";
import SinlgeCourseTest from "./test";

export default function SingleCourse() {
    const { id } = useParams();

    const [activeTab, setActiveTab] = useState("overview");
    const [havePurchesed, setHavePurchased] = useState(false);
    const [qp, setQp] = useState({
        pageIndex: 1,
        pageSize: 12
    })

    const { data: courseBasic, isLoading: loadingBasic } = useGetCourseByIdQuery({ id: Number(id) });

    const { data, isLoading: loadingOverview } = useGetCourseOverviewByIdQuery({ id: Number(id) });
    const { data: curriculum, isLoading: loadingCurriculum } = useGetCourseCurriculumByIdQuery({ id: Number(id) }, { skip: !id });
    const { data: notes, isLoading: loadingNotes } = useGetCourseMediaByTypeQuery({ id: Number(id), type: "notes", qp }, { skip: !id });
    const { data: audios, isLoading: loadingAudios } = useGetCourseMediaByTypeQuery({ id: Number(id), type: "audios", qp }, { skip: !id });
    const { data: videos, isLoading: loadingVideos } = useGetCourseMediaByTypeQuery({ id: Number(id), type: "videos", qp }, { skip: !id });
    const { data: test, isLoading: loadingTest } = useGetCourseTestQuery({ id: Number(id) }, { skip: !id });


    React.useEffect(() => {
        if (courseBasic?.data?.user) {
            const user = courseBasic.data.user;

            const status = user.has_purchased || user.is_free_trial_valid;

            setHavePurchased(status);
        }
    }, [courseBasic]);

    console.log("purchased status", {
        has_purchased: courseBasic?.data?.user?.has_purchased,
        is_free_trial_valid: courseBasic?.data?.user?.is_free_trial_valid
    })

    return (
        <>
            <CourseBanner data={courseBasic?.data && courseBasic.data} isLoading={loadingBasic} havePurchased={havePurchesed} />
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
                            label: "Live Classes",
                            value: "live-classes"
                        },
                        {
                            label: "Reviews",
                            value: "reviews"
                        },
                    ]}
                    setActiveTab={(newValue) => {
                        setActiveTab(newValue);
                        setQp({
                            pageIndex: 1,
                            pageSize: 10
                        })
                    }}
                    currentActive={activeTab}
                />
            </div>

            {activeTab === "overview" && <Activity><SinlgeCourseOverview data={data?.data && data.data} isLoading={loadingOverview} /></Activity>}
            {activeTab === "curriculum" && <Activity><SinlgeCourseCurriculum havePurchased={havePurchesed} data={curriculum?.data?.data} isLoading={loadingCurriculum} /></Activity>}
            {activeTab === "notes" && <Activity>
                <CourseMediaListing havePurchased={havePurchesed} data={notes} isLoading={loadingNotes} type="temp_notes" />
                <TablePagination qp={qp} setQp={setQp} totalPages={notes?.data?.pagination?.total_pages || 0} />
            </Activity>}
            {activeTab === "audios" && <Activity>
                <CourseMediaListing havePurchased={havePurchesed} data={audios} isLoading={loadingAudios} type="temp_audios" />
                <TablePagination qp={qp} setQp={setQp} totalPages={audios?.data?.pagination?.total_pages || 0} />
            </Activity>}
            {activeTab === "videos" && <Activity>
                <CourseMediaListing havePurchased={havePurchesed} data={videos} isLoading={loadingVideos} type="temp_video" />
                <TablePagination qp={qp} setQp={setQp} totalPages={videos?.data?.pagination?.total_pages || 0} />
            </Activity>}
            {activeTab === "tests" && <Activity><SinlgeCourseTest data={test} isLoading={loadingTest} /></Activity>}
            <PurchaseCourseDialog type={courseBasic?.data?.course_type} />
            <ReadingDialog />
        </>
    )
}
