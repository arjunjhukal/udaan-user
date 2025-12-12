
import { Box, Skeleton } from "@mui/material";

import type { QueryParams } from "../../../../../../types";
import type { CurriculumMediaType } from "../../../../../../types/course";
import type { MediaList } from "../../../../../../types/media";
import { EmptyList } from "../../../../../molecules/EmptyList";
import TablePagination from "../../../../../molecules/Pagination";
import MediaCard from "../../../../../organism/Cards/MediaCard";
import PageHeader from "../../../../../organism/PageHeader";


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
    isLoading: boolean
    havePurchased: boolean;
    qp: QueryParams;
    setQp: (qp: QueryParams) => void;
    totalPages: number;

}

export default function CourseMediaListing({ type, data, isLoading, havePurchased, qp, setQp, totalPages }: Props) {
    const config = mediaConfigs[type];
    const medias = data?.data?.data || [];

    if (!isLoading && !medias.length) {
        return <EmptyList
            image={config.image}
            title={config.emptyTitle}
            description={config.emptyMessage}
        />
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
            <div className="flex flex-col gap-4 md:grid grid-cols-2 xl:grid-cols-3 lg:gap-6">
                {isLoading ? (
                    [...Array(6)].map((_, idx) => (
                        <div key={idx} className="col-span-1">
                            <div className="flex gap-3 items-center">
                                <Box className="w-full">
                                    <Skeleton variant="rectangular" height={60} className="rounded-xl" />
                                </Box>
                            </div>
                        </div>
                    ))
                ) :
                    medias.map((media, _index) => (
                        <MediaCard media={media} key={media.id} type={type} havePurchased={havePurchased} relatedVideos={medias} />
                    ))
                }
            </div>
            {totalPages > 1 ? <TablePagination qp={qp} setQp={setQp} totalPages={totalPages} /> : ""}
        </>
    );
}