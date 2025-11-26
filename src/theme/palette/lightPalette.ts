// ============================================================================
// LIGHT THEME PALETTES
// ============================================================================

export const lightPalette = {
  // Neutral colors
  neutral: {
    black: "#111111",
    white: "#FFFFFF",
  },

  // Primary colors (Purple scale)
  primary: {
    main: "#632582", // MUI requires 'main'
    light: "#F0E9FA",
    dark: "#371548",
    contrastText: "#FFFFFF",
    50: "#F0E9FA",
    100: "#D7BBF2",
    200: "#C2A1E8",
    300: "#A174DA",
    400: "#7D1984",
    500: "#632582",
    600: "#5F1D92",
    700: "#371548",
    800: "#2A0E33",
    900: "#1D0823",
    hover: "#5F1D92",
    black: "#111111",
    white: "#FFFFFF",
  },

  secondary: {
    main: "#248585", // MUI requires 'main'
    light: "#E5F3F3",
    dark: "#145A5A",
    contrastText: "#FFFFFF",
    50: "#E5F3F3",
    100: "#BCE1E1",
    200: "#8CC1C2",
    300: "#4DA6A7",
    400: "#2F9193",
    500: "#248585",
    600: "#1D7277",
    700: "#145A5A",
    800: "#0F4345",
    900: "#062E31",
  },

  // Slate colors (Blue-gray scale)
  slate: {
    50: "#E4E9EB",
    100: "#B8C5CB",
    200: "#9FADBA",
    300: "#748799",
    400: "#5F7181",
    500: "#4A5D6E",
    600: "#314864",
    700: "#243851",
    800: "#1A2A3E",
    900: "#121D2C",
  },

  // Static colors
  static: {
    black: "#111111",
    gray: "#1E1E1E",
    white: "#FFFFFF",
    transparent: "rgba(0, 0, 0, 0)",
  },

  // MUI semantic colors
  error: {
    main: "#E21D48",
    light: "#FFF0F1",
    dark: "#A1123A",
    contrastText: "#FFFFFF",
    hover: "#A1123A",
  },

  warning: {
    main: "#F59E0B",
    light: "#FFF6EB",
    dark: "#DB7706",
    contrastText: "#FFFFFF",
    hover: "#DB7706",
  },

  info: {
    main: "#4A5D6E",
    light: "#E4E9EB",
    dark: "#314864",
    contrastText: "#FFFFFF",
    hover: "#314864",
  },

  success: {
    main: "#248585",
    light: "#E5F3F3",
    dark: "#1D7277",
    contrastText: "#FFFFFF",
    hover: "#1D7277",
  },

  // Custom semantic mappings
  button: {
    main: "#632582",
    gray: "#6B7280",
    hover: "#5F1D92",
    light: "#F0E9FA",
    lightest: "#D9F0FF",
    contrastText: "#FFFFFF",
  },

  brand: {
    main: "#303188",
    hover: "#26276D",
    light: "#1755B6"
  }
  ,
  gray: {
    main: "#3B9AFF",
    gray1: "#F3F4F6",
    gray2: "#FFF0F1",
    gray3: "#9CA3B0",
  },

  icon: {
    main: "#632582",
    black: "#111111",
    dark: "#632582",
    light: "#9CA3B0",
  },

  seperator: {
    main: "#3B9AFF",
    dark: "#E5E7EB",
    darker: "#9CA3B0",
    darkest: "#6B7280",
  },

  tab: {
    main: "#3B9AFF",
    background: "#E5E7EB",
    backgroundHover: "#D9F0FF",
    border: "#D1D5DB",
    text: "#6B7280",
    textHover: "#1D82F5",
  },

  text: {
    primary: "#111111",
    secondary: "#5F7181",
    disabled: "#9FADBA",
    main: "#632582",
    dark: "#020617",
    light: "#94A3B8",
    lightest: "#F9FAFB",
    middle: "#64748B",
  },

  textField: {
    main: "#1D82F5",
    border: "#E5E7EB",
    error: "#E21D48",
    placeholder: "#9CA3B0",
    name: "#111827",
  },

  background: {
    default: "#FFFFFF",
    paper: "#F0E9FA",
    sidebar: "#1A2A3E",
  },

  divider: "#E4E9EB",
};

export const backgroundPalette = {
  overlay: "#22222222",
  "bg-dark": "rgba(255, 255, 255, 0.05)",
  "bg-dark-fill": "rgba(255, 255, 255, 0.10)",
  "bg-destructive": "rgba(254, 226, 226, 1)",
  "bg-light": "rgba(241, 245, 249, 1)",
  "bg-muted": "rgba(248, 250, 252, 0.80)",
  "bg-mutedLight": "rgba(226, 232, 240, 0.50)",
  "bg-neutral": "rgba(255, 255, 255, 0.05)",
  "bg-neutralDa": "rgba(100, 116, 139, 0.10)",
  "bg-mode": "rgba(0, 0, 0, 0.10)",
};

export const borderPalette = {
  "border-brand-100": "rgba(237, 233, 254, 1)",
  "border-brand-primary": "rgba(139, 92, 246, 1)",
  "border-dark": "rgba(255, 255, 255, 0.10)",
  "border-destructive": "rgba(254, 226, 226, 1)",
  "border-light": "rgba(226, 232, 240, 1)",
  "border-muted": "rgba(148, 163, 184, 0.30)",
  "border-static-100": "rgba(241, 245, 249, 1)",
  "border-static-white": "rgba(255, 255, 255, 0.20)",
  "border-white": "rgba(255, 255, 255, 0.20)",
};

export const buttonPalette = {
  "btn-brand-hover": "rgba(109, 40, 217, 1)",
  "btn-brand-primary": "rgba(139, 92, 246, 1)",
  "btn-dark": "rgba(241, 245, 249, 1)",
  "btn-destructive": "rgba(239, 68, 68, 1)",
  "btn-destructive-50": "rgba(254, 226, 226, 0.50)",
  "btn-light": "rgba(241, 245, 249, 1)",
  "btn-lightHover": "rgba(226, 232, 240, 1)",
  "btn-muted": "rgba(255, 255, 255, 0.10)",
  "btn-neutralHover": "rgba(71, 85, 105, 0.80)",
  "btn-whiteHoverBrand": "rgba(237, 233, 254, 1)",
};

export const iconPalette = {
  "icon-brand-primary": "rgba(139, 92, 246, 1)",
  "icon-dark": "rgba(226, 232, 240, 1)",
  "icon-destructive": "rgba(239, 68, 68, 1)",
  "icon-light": "rgba(226, 232, 240, 1)",
  "icon-muted": "rgba(148, 163, 184, 1)",
  "icon-primary": "rgba(15, 23, 42, 1)",
  "icon-secondary": "rgba(100, 116, 139, 1)",
  "icon-static-dark": "rgba(226, 232, 240, 1)",
  "icon-static-white": "rgba(255, 255, 255, 1)",
};

export const shadowPalette = {
  "shadow-10": "#22222222",
  "shadow-5": "#22222222",
};

export const slotPalette = {
  "slot-bg-color": "rgba(147, 197, 253, 0.50)",
};

export const textPalette = {
  "text-brand-primary": "rgba(139, 92, 246, 1)",
  "text-dark": "rgba(226, 232, 240, 1)",
  "text-destructive": "rgba(239, 68, 68, 1)",
  "text-light": "rgba(148, 163, 184, 0.80)",
  "text-muted": "rgba(100, 116, 139, 1)",
  "text-secondary": "rgba(100, 116, 139, 1)",
  "text-static-black": "rgba(15, 23, 42, 1)",
  "text-static-secondary": "rgba(100, 116, 139, 1)",
  "text-static-white": "rgba(255, 255, 255, 1)",
};

