

import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { PATH } from "../../../../../routes/PATH";
import { useGetCourseLiveClassQuery, useGetUserPurchasedCourseQuery } from "../../../../../services/courseApi";
import type { QueryParams } from "../../../../../types";
import type { LiveClassProps } from "../../../../../types/liveClass";
import { EmptyList } from "../../../../molecules/EmptyList";
import TabController from "../../../../molecules/TabController";
import LiveClassCard from "../../../../organism/Cards/LiveClassCard";
import TableFilter from "../../../../organism/TableFilter";

type Status = "ongoing" | "upcoming";


const VideoSkeleton = () => (
  <div className="col-span-1 animate-pulse">
    <div className="bg-gray-200 rounded-xl h-48 w-full"></div>
    <div className="mt-3 space-y-2">
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2"></div>
    </div>
  </div>
);

const CourseFilterSkeleton = () => (
  <div className="animate-pulse space-y-4">
    <div className="h-12 bg-gray-200 rounded-lg"></div>
    <div className="h-10 bg-gray-200 rounded w-1/2"></div>
  </div>
);
export default function AlltestList() {
  const [qp, setQp] = useState<QueryParams>({
    pageIndex: 1,
    pageSize: 10,
    search: '',
  });
  const [search, setSearch] = useState<string>("");
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);
  const tabs = [
    { value: "ongoing", label: "Ongoing Classes" },
    { value: "upcoming", label: "Upcoming Classes" },
  ];

  const [activeTab, setActiveTab] = useState<Status>("ongoing");
  const [qpTest, setQpTest] = useState<QueryParams>({
    pageIndex: 1,
    pageSize: 15,
  });
  const [allTest, setAllTest] = useState<LiveClassProps[]>([]);

  const { data: myCourse, isLoading } = useGetUserPurchasedCourseQuery(qp);
  const myCourses = myCourse?.data?.data || [];

  useEffect(() => {
    if (myCourses.length > 0 && !selectedCourseId) {
      setSelectedCourseId(myCourses[0].id || null);
    }
  }, [myCourses, selectedCourseId]);

  const { data: notes, isLoading: loadingTest } = useGetCourseLiveClassQuery(
    { id: selectedCourseId!, ...qpTest, type: activeTab },
    { skip: !selectedCourseId }
  );

  const selectedCourse = myCourses.find(course => course.id === selectedCourseId);
  const testList = notes?.data?.data || [];
  const totalPages = notes?.data?.pagination?.total_pages || 0;
  const currentPage = qpTest.pageIndex;


  useEffect(() => {
    if (testList.length > 0) {
      if (qpTest.pageIndex === 1) {
        setAllTest(testList);
      } else {
        setAllTest(prev => {
          const existingIds = new Set(prev.map(v => v.id));
          const newVideos = testList.filter(v => !existingIds.has(v.id));
          return [...prev, ...newVideos];
        });
      }
    } else if (qpTest.pageIndex === 1) {
      setAllTest([]);
    }
  }, [testList, qpTest.pageIndex]);

  useEffect(() => {
    setQpTest(prev => ({ ...prev, pageIndex: 1 }));
    setAllTest([]);
  }, [selectedCourseId]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setQpTest(prev => ({ ...prev, search, pageIndex: 1 }));
      setAllTest([]);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const fetchMoreTest = () => {
    if (!loadingTest && currentPage < totalPages) {
      setQpTest(prev => ({
        ...prev,
        pageIndex: prev.pageIndex + 1
      }));
    }
  };

  const hasMore = currentPage < totalPages;

  if (isLoading) {
    return (
      <div className="all__video__listing">
        <div className="mb-6">
          <CourseFilterSkeleton />
        </div>
        <div className="flex flex-col gap-4 md:grid grid-cols-2 xl:grid-cols-3 lg:gap-6">
          {[...Array(6)].map((_, idx) => (
            <VideoSkeleton key={idx} />
          ))}
        </div>
      </div>
    );
  }

  if (!myCourses.length) {
    return (
      <EmptyList
        title="You Haven't Purchased any course"
        description="Please purchase a course to view the live class."
        cta={{
          label: "Explore Course",
          url: PATH.COURSE_MANAGEMENT.COURSES.ROOT
        }}
      />
    );
  }
  return (
    <div className="all__note__listing">
      <div className="mb-6">
        <TableFilter
          search={search || ""}
          setSearch={(search) => setSearch(search)}
          onFilter={() => { }}
          myCourses={myCourses}
          selectedCourseId={selectedCourseId}
          setSelectedCourseId={setSelectedCourseId}
        />
      </div>
      {selectedCourse && (
        <div className="mb-6 pb-4 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-800">
            {selectedCourse.name}
          </h2>
        </div>
      )}
      {/* Tabs */}
      <TabController
        options={tabs}
        currentActive={activeTab}
        setActiveTab={(newValue) => {
          setActiveTab(newValue as Status);
          setQp((prev) => ({ ...prev, pageIndex: 1 }));
        }}
      />
      {/* Media Listing */}
      <div className="media__listing__wrapper mt-4">
        <Box
          id="video__listing__wrapper"
          sx={{
            maxHeight: "calc(100vh - 460px)",
            overflow: "auto",
          }}
        >
          {loadingTest ? (
            <div className="flex flex-col gap-4 md:grid grid-cols-2 xl:grid-cols-3 lg:gap-6">
              {[...Array(6)].map((_, idx) => (
                <VideoSkeleton key={idx} />
              ))}
            </div>
          ) : testList.length > 0 ? (
            <InfiniteScroll
              dataLength={allTest.length}
              next={fetchMoreTest}
              hasMore={hasMore}
              scrollableTarget="video__listing__wrapper"
              loader={
                <div className="flex flex-col gap-4 md:grid grid-cols-2 xl:grid-cols-3 lg:gap-6 mt-4 lg:mt-6">
                  {Array.from({ length: 3 }).map((_, idx) => <VideoSkeleton key={idx} />)}
                </div>
              }
            >
              <div className="flex flex-col gap-4 md:grid grid-cols-2 xl:grid-cols-3 lg:gap-6">
                {allTest.map((test) => (
                  <LiveClassCard key={test.id} data={test} courseId={Number(selectedCourseId)}/>
                ))}
              </div>
            </InfiniteScroll>
          ) : (
            <EmptyList
              title="No Test Found"
              description="There are no tests available for the selected course."
            />
          )}
        </Box>
      </div>
    </div>
  )
}
