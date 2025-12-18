import { Box, Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import type { QueryParams } from "../../../../../../types";
import type { CurriculumMediaType } from "../../../../../../types/course";
import type { MediaList } from "../../../../../../types/media";
import { EmptyList } from "../../../../../molecules/EmptyList";
import TablePagination from "../../../../../molecules/Pagination";
import MediaCard from "../../../../../organism/Cards/MediaCard";
import PageHeader from "../../../../../organism/PageHeader";
import TableFilter from "../../../../../organism/TableFilter";

interface MediaConfig {
    image: string;
    emptyTitle: string;
    emptyMessage: string;
}

const mediaConfigs: Record<CurriculumMediaType, MediaConfig> = {
    temp_audios: {
        image: "/empty-list-placeholder.svg",
        emptyTitle: "No Audio found",
        emptyMessage: "Oops your audio is empty. Please add audio to help student gain knowledge.",
    },
    temp_notes: {
        emptyTitle: "No Notes found",
        emptyMessage: "Oops your notes is empty. Please add notes to help student gain knowledge.",
        image: "/empty-list-placeholder.svg"
    },
    temp_video: {
        emptyTitle: "No Videos found",
        emptyMessage: "Oops your video is empty. Please add video to help student gain knowledge.",
        image: "/empty-list-placeholder.svg"
    }
};

interface Props {
    type: CurriculumMediaType;
    data?: MediaList;
    isLoading: boolean;
    havePurchased: boolean;
    qp: QueryParams;
    setQp: (qp: QueryParams) => void;
    totalPages: number;
}

export default function CourseMediaListing({
    type,
    data,
    isLoading,
    havePurchased,
    qp,
    setQp,
    totalPages
}: Props) {
    const config = mediaConfigs[type];
    const medias = data?.data?.data || [];
    const [searchInput, setSearchInput] = useState(qp.search || "");

    // Debounce search - update query params after user stops typing
    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchInput !== qp.search) {
                setQp({
                    ...qp,
                    search: searchInput,
                    pageIndex: 1 // Reset to first page when searching
                });
            }
        }, 500); // 500ms delay

        return () => clearTimeout(timer);
    }, [searchInput]);

    // Update local search input when qp.search changes externally
    useEffect(() => {
        setSearchInput(qp.search || "");
    }, [qp.search]);

    const handleSearchChange = (search: string) => {
        setSearchInput(search);
    };

    const clearSearch = () => {
        setSearchInput("");
        setQp({
            ...qp,
            search: "",
            pageIndex: 1
        });
    };

    // Empty state when no results
    if (!isLoading && !medias.length) {
        return (
            <>
                <PageHeader
                    breadcrumb={[
                        {
                            title: type.split("_")[1],
                        },
                    ]}
                />
                <TableFilter
                    search={qp.search || ""}
                    setSearch={handleSearchChange}
                />
                <EmptyList
                    image={config.image}
                    title={qp.search ? `No ${type.split("_")[1]} found matching your search` : config.emptyTitle}
                    description={qp.search ? `Try adjusting your search terms or clear the search to see all ${type.split("_")[1]}.` : config.emptyMessage}
                />
                {qp.search && (
                    <div className="text-center mt-4">
                        <button
                            onClick={clearSearch}
                            className="px-4 py-2 text-blue-600 hover:text-blue-700 font-medium text-sm border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                        >
                            Clear Search
                        </button>
                    </div>
                )}
            </>
        );
    }

    return (
        <>
            <PageHeader
                breadcrumb={[
                    {
                        title: type.split("_")[1],
                    },
                ]}
            />
            <TableFilter
                search={searchInput}
                setSearch={handleSearchChange}
            />
            <div className="flex flex-col gap-4 md:grid grid-cols-2 xl:grid-cols-3 lg:gap-6 mt-6">
                {isLoading ? (
                    [...Array(6)].map((_, idx) => (
                        <div key={idx} className="col-span-1">
                            <div className="flex gap-3 items-center">
                                <Box className="w-full">
                                    <Skeleton variant="rectangular" height={200} className="rounded-xl" />
                                    <div className="mt-3 space-y-2">
                                        <Skeleton variant="text" width="80%" />
                                        <Skeleton variant="text" width="60%" />
                                    </div>
                                </Box>
                            </div>
                        </div>
                    ))
                ) : (
                    medias.map((media) => (
                        <MediaCard
                            media={media}
                            key={media.id}
                            type={type}
                            havePurchased={havePurchased}
                            relatedVideos={medias}
                        />
                    ))
                )}
            </div>

            {!isLoading && totalPages > 1 && (
                <div className="mt-6">
                    <TablePagination qp={qp} setQp={setQp} totalPages={totalPages} />
                </div>
            )}
        </>
    );
}