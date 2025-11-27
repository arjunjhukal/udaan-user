import type { Pagination } from "."

export interface MediaProps {
    id: number,
    file_name: string,
    url: string,
    size: number
}

export interface MediaList {
    data: {
        data: MediaProps[],
        pagination: Pagination
    }
}