import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type I18nProps = "en" | "np";
export type FontFamily = string;

export const ThemeMode = {
    LIGHT: "light",
    DARK: "dark",
    AUTO: "auto",
} as const;

export type ThemeMode = (typeof ThemeMode)[keyof typeof ThemeMode];

export interface DefaultThemeProps {
    fontFamily: FontFamily;
    i18n: I18nProps;
    miniDrawer: boolean;
    mode: ThemeMode;
}

const storedTheme = localStorage.getItem("themeConfig");

const initialState: DefaultThemeProps = storedTheme
    ? JSON.parse(storedTheme)
    : {
        fontFamily: "Inter",
        i18n: "en",
        mode: ThemeMode.DARK,
        miniDrawer: false,
    };

localStorage.setItem("themeConfig", JSON.stringify(initialState));

export const ThemeSlice = createSlice({
    name: "ThemeSlice",
    initialState,
    reducers: {
        setMode: (state, action: PayloadAction<ThemeMode>) => {
            state.mode = action.payload;
            localStorage.setItem("themeConfig", JSON.stringify(state));
        },
        setLanguage: (state, action: PayloadAction<I18nProps>) => {
            state.i18n = action.payload;
            localStorage.setItem("themeConfig", JSON.stringify(state));
        },
        setMiniDrawer: (state, action: PayloadAction<boolean>) => {
            state.miniDrawer = action.payload;
            localStorage.setItem("themeConfig", JSON.stringify(state));
        },
        resetTheme: (state) => {
            state.fontFamily = "Inter";
            state.i18n = "en";
            state.mode = ThemeMode.DARK;
            state.miniDrawer = false;
            localStorage.setItem("themeConfig", JSON.stringify(state));
        },
    },
});

export const { setMode, setLanguage, setMiniDrawer, resetTheme } =
    ThemeSlice.actions;

export default ThemeSlice.reducer;