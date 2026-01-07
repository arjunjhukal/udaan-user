import { Box } from "@mui/material";
import { useEffect, useMemo, useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { PATH } from "../../../../../routes/PATH";
import { useGetCourseMediaByTypeQuery, useGetUserPurchasedCourseQuery } from "../../../../../services/courseApi";
import type { QueryParams } from "../../../../../types";
import type { MediaProps } from "../../../../../types/media";
import { EmptyList } from "../../../../molecules/EmptyList";
import MediaCard from "../../../../organism/Cards/MediaCard";
import TableFilter from "../../../../organism/TableFilter";

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

export default function AllAudioListing() {
    const [qp, _setQp] = useState<QueryParams>({
        pageIndex: 1,
        pageSize: 10,
        search: '',
    });
    const [search, setSearch] = useState<string>("");
    const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);
    const [qpMedia, setQpMedia] = useState<QueryParams>({
        pageIndex: 1,
        pageSize: 15,
    });
    const [allAudios, setAllAudios] = useState<MediaProps[]>([]);

    // ✅ Add ref to track initial course selection
    const initialCourseSet = useRef(false);

    const { data: myCourse, isLoading } = useGetUserPurchasedCourseQuery(qp);

    // ✅ Memoize myCourses
    const myCourses = useMemo(() =>
        myCourse?.data?.data || [],
        [myCourse?.data?.data]
    );

    // ✅ Auto-select first course only once
    useEffect(() => {
        if (myCourses.length > 0 && !selectedCourseId && !initialCourseSet.current) {
            setSelectedCourseId(myCourses[0].id || null);
            initialCourseSet.current = true;
        }
    }, [myCourses.length, selectedCourseId]);

    // ✅ Add isFetching to track cache loading
    const { data: audios, isLoading: loadingAudios, isFetching } = useGetCourseMediaByTypeQuery(
        { id: selectedCourseId!, type: "audios", qp: qpMedia },
        { skip: !selectedCourseId }
    );

    const selectedCourse = useMemo(
        () => myCourses.find(course => course.id === selectedCourseId),
        [myCourses, selectedCourseId]
    );

    const audioListing = useMemo(() =>
        audios?.data?.data || [],
        [audios?.data?.data]
    );

    const totalPages = audios?.data?.pagination?.total_pages || 0;
    const currentPage = qpMedia.pageIndex;

    // ✅ Simplified effect - let RTK Query cache handle the data
    useEffect(() => {
        if (qpMedia.pageIndex === 1) {
            // First page - replace all audios
            setAllAudios(audioListing);
        } else if (audioListing.length > 0) {
            // Subsequent pages - append new audios
            setAllAudios(prev => {
                const existingIds = new Set(prev.map(v => v.id));
                const newAudios = audioListing.filter(v => !existingIds.has(v.id));
                return [...prev, ...newAudios];
            });
        }
    }, [audioListing, qpMedia.pageIndex]);

    // ✅ Reset pagination when course changes - don't clear allAudios
    useEffect(() => {
        setQpMedia(prev => ({ ...prev, pageIndex: 1 }));
        // Let the audioListing effect handle updating allAudios
    }, [selectedCourseId]);

    // ✅ Reset pagination when search changes - don't clear allAudios
    useEffect(() => {
        const timer = setTimeout(() => {
            setQpMedia(prev => ({ ...prev, search, pageIndex: 1 }));
            // Let the audioListing effect handle updating allAudios
        }, 500);

        return () => clearTimeout(timer);
    }, [search]);

    const fetchMoreaudios = () => {
        if (!loadingAudios && !isFetching && currentPage < totalPages) {
            setQpMedia(prev => ({
                ...prev,
                pageIndex: prev.pageIndex + 1
            }));
        }
    };

    const hasMore = currentPage < totalPages;

    // ✅ Show loading skeleton only when actually loading first page with no audios
    const isLoadingFirstPage = (loadingAudios || isFetching) && qpMedia.pageIndex === 1 && allAudios.length === 0;

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
                description="Please purchase a course to view the audios."
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
            <div className="media__listing__wrapper">
                <Box
                    id="video__listing__wrapper"
                    sx={{
                        maxHeight: "calc(100vh - 460px)",
                        overflow: "auto",
                    }}
                >
                    {isLoadingFirstPage ? (
                        <div className="flex flex-col gap-4 md:grid grid-cols-2 xl:grid-cols-3 lg:gap-6">
                            {[...Array(6)].map((_, idx) => (
                                <VideoSkeleton key={idx} />
                            ))}
                        </div>
                    ) : allAudios.length > 0 ? (
                        <InfiniteScroll
                            dataLength={allAudios.length}
                            next={fetchMoreaudios}
                            hasMore={hasMore}
                            scrollableTarget="video__listing__wrapper"
                            loader={
                                <div className="col-span-1 text-center py-2">
                                    <div className="inline-block w-6 h-6 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                                </div>
                            }
                        >
                            <div className="flex flex-col gap-4 md:grid grid-cols-2 xl:grid-cols-3 lg:gap-6">
                                {allAudios.map((media) => (
                                    <MediaCard
                                        media={media}
                                        key={media.id}
                                        type="temp_audios"
                                        havePurchased={true}
                                        relatedVideos={allAudios.filter((item) => item.id !== media.id)}
                                    />
                                ))}
                            </div>
                        </InfiniteScroll>
                    ) : (
                        <EmptyList
                            title="No audios Found"
                            description="There are no audios available for the selected course."
                        />
                    )}
                </Box>
            </div>
        </div>
    )
}