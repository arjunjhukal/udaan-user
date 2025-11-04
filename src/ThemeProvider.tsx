import { CssBaseline, ThemeProvider } from '@mui/material';
import React from 'react'
import { useTranslation } from 'react-i18next';
import { useAppSelector } from './store/hook';
import type { RootState } from './store/store';
import { ThemeMode } from './slice/themeSlice';
import { createAppTheme } from './theme';

export default function UdaanThemeProvider({ children }: { children: React.ReactNode }) {
    const { i18n } = useTranslation();
    const { i18n: lang, mode } = useAppSelector(
        (state: RootState) => state.theme
    );
    // Create theme based on current mode
    const theme = React.useMemo(() => {
        const themeMode =
            mode === ThemeMode.AUTO
                ? window.matchMedia("(prefers-color-scheme: dark)").matches
                    ? "dark"
                    : "light"
                : mode;
        return createAppTheme(themeMode as "light" | "dark");
    }, [mode]);

    // Whenever Redux language changes, update i18next too
    React.useEffect(() => {
        i18n.changeLanguage(lang);
    }, [lang, i18n]);

    // Handle AUTO mode - listen to system preference changes
    React.useEffect(() => {
        if (mode === ThemeMode.AUTO) {
            const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
            const handleChange = () => {
                window.dispatchEvent(new Event("theme-change"));
            };

            mediaQuery.addEventListener("change", handleChange);
            return () => mediaQuery.removeEventListener("change", handleChange);
        }
    }, [mode]);
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    )
}
