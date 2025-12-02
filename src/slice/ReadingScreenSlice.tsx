import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CurriculumMediaType } from "../types/course";
import type { MediaProps } from "../types/media";

interface ReadingScreenProps {
    video?: MediaProps | undefined;
    audio?: MediaProps | undefined;
    pdf?: MediaProps | undefined;
    title?: string;
    message?: string;
    open: boolean;
    type?: CurriculumMediaType;
    isYouTube?: boolean;
    relatedVideos?: MediaProps[] | undefined;
    videoId?:string;
}

const initialState: ReadingScreenProps = {
    video: undefined,
    audio: undefined,
    pdf: undefined,
    title: undefined,
    message: undefined,
    open: false,
    type: undefined,
    isYouTube: false,
    relatedVideos: undefined,
    videoId:undefined,
};

export const readingScreen = createSlice({
    name: "readingScreen",
    initialState,
    reducers: {
        setReadingScreen: (state, action: PayloadAction<Partial<ReadingScreenProps>>) => {
            return { ...state, ...action.payload };
        },

        resetReadingScreen: () => initialState,
    },
});

export const { setReadingScreen, resetReadingScreen } = readingScreen.actions;

export default readingScreen.reducer;