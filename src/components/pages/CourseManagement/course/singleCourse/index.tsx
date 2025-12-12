import React, { Activity, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetCourseByIdQuery, useGetCourseCurriculumByIdQuery, useGetCourseLiveClassQuery, useGetCourseMediaByTypeQuery, useGetCourseOverviewByIdQuery, useGetCourseTestQuery } from "../../../../../services/courseApi";
import type { QueryParams } from "../../../../../types";
import TabController from "../../../../molecules/TabController";
import CourseBanner from "../../../../organism/CourseBanner";
import PurchaseCourseDialog from "../../../../organism/Dialog/PurchaseCourseDialog";
import ReadingDialog from "../../../../organism/Dialog/ReadingDialog";
import CourseMediaListing from "./courseMediaListing";
import SinlgeCourseCurriculum from "./curriculum";
import SinlgeCourseLiveClass from "./liveClass";
import SinlgeCourseOverview from "./overview";
import SinlgeCourseTest from "./test";

export default function SingleCourse() {
    const { id } = useParams();

    const [activeTab, setActiveTab] = useState("curriculum");
    const [havePurchesed, setHavePurchased] = useState(false);
    const [qpNotes, setQpNotes] = useState<QueryParams>({
        pageIndex: 1,
        pageSize: 12
    })
    const [qpAudios, setQpAudios] = useState<QueryParams>({
        pageIndex: 1,
        pageSize: 12
    })
    const [qpVideos, setQpVideos] = useState<QueryParams>({
        pageIndex: 1,
        pageSize: 12
    })

    const [qpTest, setQpTest] = useState<QueryParams>({
        pageIndex: 1,
        pageSize: 12
    })
    const [qpLiveClass, setQpLiveClass] = useState<QueryParams>({
        pageIndex: 1,
        pageSize: 12
    })


    // const [searchTest, setSearchTest] = useState("");
    // const [searchLiveClass, setSearchLiveClass] = useState("");


    const { data: courseBasic, isLoading: loadingBasic } = useGetCourseByIdQuery({ id: Number(id) });

    const { data, isLoading: loadingOverview } = useGetCourseOverviewByIdQuery({ id: Number(id) });
    const { data: curriculum, isLoading: loadingCurriculum } = useGetCourseCurriculumByIdQuery({ id: Number(id) }, { skip: !id });
    const { data: notes, isLoading: loadingNotes } = useGetCourseMediaByTypeQuery({ id: Number(id), type: "notes", qp: qpNotes }, { skip: !id });
    const { data: audios, isLoading: loadingAudios } = useGetCourseMediaByTypeQuery({ id: Number(id), type: "audios", qp: qpAudios }, { skip: !id });
    const { data: videos, isLoading: loadingVideos } = useGetCourseMediaByTypeQuery({ id: Number(id), type: "videos", qp: qpVideos }, { skip: !id });
    const { data: test, isLoading: loadingTest } = useGetCourseTestQuery({ id: Number(id), ...qpTest }, { skip: !id });
    const { data: liveClasses, isLoading: loadingLiveClass } = useGetCourseLiveClassQuery({ id: Number(id), ...qpLiveClass }, { skip: !id })

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
            <div className="my-8">
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
                            value: "live_classes"
                        },
                    ]}
                    setActiveTab={(newValue) => {
                        setActiveTab(newValue);

                    }}
                    currentActive={activeTab}
                />
            </div>

            {activeTab === "overview" && <Activity><SinlgeCourseOverview data={data?.data && data.data} isLoading={loadingOverview} /></Activity>}
            {activeTab === "curriculum" && <Activity><SinlgeCourseCurriculum havePurchased={havePurchesed} data={curriculum?.data?.data} isLoading={loadingCurriculum} /></Activity>}
            {activeTab === "notes" && <Activity>
                <CourseMediaListing havePurchased={havePurchesed} data={notes} isLoading={loadingNotes} type="temp_notes" qp={qpNotes} setQp={setQpNotes} totalPages={notes?.data?.pagination?.total_pages || 0} />
            </Activity>}
            {activeTab === "audios" && <Activity>
                <CourseMediaListing havePurchased={havePurchesed} data={audios} isLoading={loadingAudios} type="temp_audios" qp={qpAudios} setQp={setQpAudios} totalPages={audios?.data?.pagination?.total_pages || 0} />
            </Activity>}
            {activeTab === "videos" && <Activity>
                <CourseMediaListing havePurchased={havePurchesed} data={videos} isLoading={loadingVideos} type="temp_video" qp={qpVideos} setQp={setQpVideos} totalPages={videos?.data?.pagination?.total_pages || 0} />
            </Activity>}
            {activeTab === "tests" &&
                <Activity >
                    <SinlgeCourseTest havePurchased={havePurchesed} data={test} isLoading={loadingTest} qp={qpTest} setQp={setQpTest} totalPages={test?.data?.pagination?.total_pages || 0} />
                </Activity >}
            {activeTab === "live_classes" && <Activity>
                <SinlgeCourseLiveClass havePurchased={havePurchesed} data={liveClasses} isLoading={loadingLiveClass} qp={qpLiveClass} setQp={setQpLiveClass} totalPages={test?.data?.pagination?.total_pages || 0} />
            </Activity>}
            <PurchaseCourseDialog type={courseBasic?.data?.course_type} />
            <ReadingDialog />
        </>
    )
}
