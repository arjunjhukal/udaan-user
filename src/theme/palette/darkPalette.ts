// ============================================================================
// DARK THEME PALETTES
// ============================================================================

export const darkPalette = {
    // Neutral colors (inverted for dark mode)
    neutral: {
        black: "#FFFFFF",
        white: "#0F172A",
    },

    // Primary colors (Purple scale - adjusted for dark mode)
    primary: {
        main: "#7D1984", // MUI requires 'main'
        light: "#2A0E33",
        dark: "#A174DA",
        contrastText: "#FFFFFF",
        50: "#1D0823",
        100: "#2A0E33",
        200: "#371548",
        300: "#5F1D92",
        400: "#632582",
        500: "#7D1984",
        600: "#A174DA",
        700: "#C2A1E8",
        800: "#D7BBF2",
        900: "#F0E9FA",
        hover: "#A174DA",
        black: "#FFFFFF",
        white: "#0F1419",
    },

    // Secondary colors (Green scale - adjusted for dark mode)
    secondary: {
        main: "#2F9193", // MUI requires 'main'
        light: "#0F4345",
        dark: "#4DA6A7",
        contrastText: "#FFFFFF",
        50: "#062E31",
        100: "#0F4345",
        200: "#145A5A",
        300: "#1D7277",
        400: "#248585",
        500: "#2F9193",
        600: "#4DA6A7",
        700: "#8CC1C2",
        800: "#BCE1E1",
        900: "#E5F3F3",
    },

    // Slate colors (Blue-gray scale - adjusted for dark mode)
    slate: {
        50: "#121D2C",
        100: "#1A2A3E",
        200: "#243851",
        300: "#314864",
        400: "#4A5D6E",
        500: "#5F7181",
        600: "#748799",
        700: "#9FADBA",
        800: "#B8C5CB",
        900: "#E4E9EB",
    },

    // Static colors (unchanged)
    static: {
        black: "#111111",
        gray: "#1E1E1E",
        white: "#FFFFFF",
        transparent: "rgba(0, 0, 0, 0)",
    },

    // MUI semantic colors for dark mode
    error: {
        main: "#F43F5E",
        light: "#2D1215",
        dark: "#FB7185",
        contrastText: "#FFFFFF",
        hover: "#FB7185",
    },

    warning: {
        main: "#FBBF24",
        light: "#2D2410",
        dark: "#FCD34D",
        contrastText: "#111827",
        hover: "#FCD34D",
    },

    info: {
        main: "#5F7181",
        light: "#1A2A3E",
        dark: "#748799",
        contrastText: "#FFFFFF",
        hover: "#748799",
    },

    success: {
        main: "#2F9193",
        light: "#0F4345",
        dark: "#4DA6A7",
        contrastText: "#FFFFFF",
        hover: "#4DA6A7",
    },

    // Custom semantic mappings for dark mode
    button: {
        main: "#7D1984",
        gray: "#9CA3AF",
        hover: "#A174DA",
        light: "#2A0E33",
        lightest: "#2A0E33",
        contrastText: "#FFFFFF",
    },

    brand: {
        main: "#303188",
        hover: "#26276D",
        light: "#1755B6"
    },

    gray: {
        main: "#3B9AFF",
        gray1: "#374151",
        gray2: "#2D1215",
        gray3: "#6B7280",
    },

    icon: {
        main: "#7D1984",
        black: "#F9FAFB",
        dark: "#7D1984",
        light: "#9CA3AF",
    },

    seperator: {
        main: "#3B9AFF",
        dark: "#374151",
        darker: "#4B5563",
        darkest: "#6B7280",
    },

    tab: {
        main: "#3B9AFF",
        background: "#1F2937",
        backgroundHover: "#1A3A52",
        border: "#374151",
        text: "#9CA3AF",
        textHover: "#3B9AFF",
    },

    text: {
        primary: "#FFFFFF",
        secondary: "#B8C5CB",
        disabled: "#748799",
        main: "#7D1984",
        dark: "#F9FAFB",
        light: "#9CA3AF",
        lightest: "#6B7280",
        middle: "#D1D5DB",
    },

    textField: {
        main: "#3B9AFF",
        border: "#374151",
        error: "#F43F5E",
        placeholder: "#6B7280",
        name: "#F9FAFB",
    },

    background: {
        default: "#0F172A",
        paper: "#1A2A3E",
        sidebar: "#121D2C",
    },

    divider: "#314864",
};

export const darkBackgroundPalette = {
    overlay: "#FFFFFF22",
    "bg-dark": "rgba(0, 0, 0, 0.40)",
    "bg-dark-fill": "rgba(0, 0, 0, 0.60)",
    "bg-destructive": "rgba(127, 29, 29, 1)",
    "bg-light": "rgba(30, 41, 59, 1)",
    "bg-muted": "rgba(15, 23, 42, 0.80)",
    "bg-mutedLight": "rgba(51, 65, 85, 0.50)",
    "bg-neutral": "rgba(0, 0, 0, 0.30)",
    "bg-neutralDa": "rgba(71, 85, 105, 0.20)",
    "bg-mode": "rgba(255, 255, 255, 0.10)",
};

export const darkBorderPalette = {
    "border-brand-100": "rgba(42, 14, 51, 1)",
    "border-brand-primary": "rgba(125, 25, 132, 1)",
    "border-dark": "rgba(0, 0, 0, 0.40)",
    "border-destructive": "rgba(127, 29, 29, 1)",
    "border-light": "rgba(51, 65, 85, 1)",
    "border-muted": "rgba(148, 163, 184, 0.20)",
    "border-static-100": "rgba(30, 41, 59, 1)",
    "border-static-white": "rgba(255, 255, 255, 0.10)",
    "border-white": "rgba(255, 255, 255, 0.10)",
};

export const darkButtonPalette = {
    "btn-brand-hover": "rgba(161, 116, 218, 1)",
    "btn-brand-primary": "rgba(125, 25, 132, 1)",
    "btn-dark": "rgba(30, 41, 59, 1)",
    "btn-destructive": "rgba(244, 63, 94, 1)",
    "btn-destructive-50": "rgba(127, 29, 29, 0.50)",
    "btn-light": "rgba(30, 41, 59, 1)",
    "btn-lightHover": "rgba(51, 65, 85, 1)",
    "btn-muted": "rgba(0, 0, 0, 0.40)",
    "btn-neutralHover": "rgba(100, 116, 139, 0.60)",
    "btn-whiteHoverBrand": "rgba(42, 14, 51, 1)",
};

export const darkIconPalette = {
    "icon-brand-primary": "rgba(125, 25, 132, 1)",
    "icon-dark": "rgba(51, 65, 85, 1)",
    "icon-destructive": "rgba(244, 63, 94, 1)",
    "icon-light": "rgba(148, 163, 184, 1)",
    "icon-muted": "rgba(148, 163, 184, 1)",
    "icon-primary": "rgba(248, 250, 252, 1)",
    "icon-secondary": "rgba(148, 163, 184, 1)",
    "icon-static-dark": "rgba(51, 65, 85, 1)",
    "icon-static-white": "rgba(255, 255, 255, 1)",
};

export const darkShadowPalette = {
    "shadow-10": "#00000044",
    "shadow-5": "#00000033",
};

export const darkSlotPalette = {
    "slot-bg-color": "rgba(59, 130, 246, 0.30)",
};

export const darkTextPalette = {
    "text-brand-primary": "rgba(125, 25, 132, 1)",
    "text-dark": "rgba(51, 65, 85, 1)",
    "text-destructive": "rgba(244, 63, 94, 1)",
    "text-light": "rgba(148, 163, 184, 0.60)",
    "text-muted": "rgba(148, 163, 184, 1)",
    "text-secondary": "rgba(148, 163, 184, 1)",
    "text-static-black": "rgba(15, 23, 42, 1)",
    "text-static-secondary": "rgba(148, 163, 184, 1)",
    "text-static-white": "rgba(255, 255, 255, 1)",
};