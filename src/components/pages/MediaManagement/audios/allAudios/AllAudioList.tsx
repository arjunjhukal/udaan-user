import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { PATH } from "../../../../../routes/PATH";
import { useGetCourseMediaByTypeQuery, useGetUserPurchasedCourseQuery } from "../../../../../services/courseApi";
import type { QueryParams } from "../../../../../types";
import type { MediaProps } from "../../../../../types/media";
import { EmptyList } from "../../../../molecules/EmptyList";
import MediaCard from "../../../../organism/Cards/MediaCard";
import TableFilter from "../../../../organism/TableFilter";

// Loading Skeleton Component
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

    const { data: myCourse, isLoading } = useGetUserPurchasedCourseQuery(qp);
    const myCourses = myCourse?.data?.data || [];

    useEffect(() => {
        if (myCourses.length > 0 && !selectedCourseId) {
            setSelectedCourseId(myCourses[0].id || null);
        }
    }, [myCourses, selectedCourseId]);

    const { data: audios, isLoading: loadingAudios } = useGetCourseMediaByTypeQuery(
        { id: selectedCourseId!, type: "audios", qp: qpMedia },
        { skip: !selectedCourseId }
    );

    const selectedCourse = myCourses.find(course => course.id === selectedCourseId);
    const audioListing = audios?.data?.data || [];
    const totalPages = audios?.data?.pagination?.total_pages || 0;
    const currentPage = qpMedia.pageIndex;


    useEffect(() => {
        if (audioListing.length > 0) {
            if (qpMedia.pageIndex === 1) {
                setAllAudios(audioListing);
            } else {
                setAllAudios(prev => {
                    const existingIds = new Set(prev.map(v => v.id));
                    const newVideos = audioListing.filter(v => !existingIds.has(v.id));
                    return [...prev, ...newVideos];
                });
            }
        } else if (qpMedia.pageIndex === 1) {
            setAllAudios([]);
        }
    }, [audioListing, qpMedia.pageIndex]);

    useEffect(() => {
        setQpMedia(prev => ({ ...prev, pageIndex: 1 }));
        setAllAudios([]);
    }, [selectedCourseId]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setQpMedia(prev => ({ ...prev, search, pageIndex: 1 }));
            setAllAudios([]);
        }, 500);

        return () => clearTimeout(timer);
    }, [search]);

    const fetchMoreaudios = () => {
        if (!loadingAudios && currentPage < totalPages) {
            setQpMedia(prev => ({
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
                description="Please purchase a course to view the videos."
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
            {/* Media Listing */}
            <div className="media__listing__wrapper">
                <Box
                    id="video__listing__wrapper"
                    sx={{
                        maxHeight: "calc(100vh - 460px)",
                        overflow: "auto",
                    }}
                >
                    {loadingAudios ? (
                        <div className="flex flex-col gap-4 md:grid grid-cols-2 xl:grid-cols-3 lg:gap-6">
                            {[...Array(6)].map((_, idx) => (
                                <VideoSkeleton key={idx} />
                            ))}
                        </div>
                    ) : audioListing.length > 0 ? (
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
                                        relatedVideos={allAudios}
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
