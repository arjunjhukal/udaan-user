import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { CurriculumMediaType } from "../types/course";

interface ReadingScreenProps {
    videoId?: string | null; // Changed to string for YouTube video IDs
    videoUrl?: string;
    audioUrl?: string;
    pdfUrl?: string;
    title?: string;
    message?: string;
    open: boolean;
    type?: CurriculumMediaType;
    isYouTube?: boolean; // Flag to indicate if it's a YouTube video
}

const initialState: ReadingScreenProps = {
    videoId: null,
    videoUrl: undefined,
    audioUrl: undefined,
    pdfUrl: undefined,
    title: undefined,
    message: undefined,
    open: false,
    type: undefined,
    isYouTube: false,
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