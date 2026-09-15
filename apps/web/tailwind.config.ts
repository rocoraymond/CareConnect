import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#EFF6FF",
          100: "#DBEAFE",
          200: "#BFDBFE",
          300: "#93C5FD",
          400: "#60A5FA",
          500: "#2563EB",
          600: "#1D4ED8", // Primary Brand Blue
          700: "#1D40AF",
          800: "#1E3A8A",
          900: "#172554",
        },
        surface: {
          canvas: "#F8FAFC", // Calm neutral background
          card: "#FFFFFF",   // Crisp white card
          subtle: "#F1F5F9",
          border: "#E2E8F0",
          hover: "#F8FAFC",
        },
        text: {
          main: "#0F172A",   // Slate 900 - High contrast, legible
          muted: "#475569",  // Slate 600 - Secondary copy
          caption: "#64748B",// Slate 500 - Metadata & timestamps
        },
        status: {
          active: {
            bg: "#ECFDF5",
            text: "#065F46",
            border: "#A7F3D0",
          },
          pending: {
            bg: "#FFFBEB",
            text: "#92400E",
            border: "#FDE68A",
          },
          closed: {
            bg: "#F1F5F9",
            text: "#475569",
            border: "#E2E8F0",
          },
          urgent: {
            bg: "#FEF2F2",
            text: "#991B1B",
            border: "#FECACA",
          },
        },
      },
      borderRadius: {
        DEFAULT: "0.375rem",
        md: "0.5rem",
        lg: "0.625rem",
        xl: "0.75rem",
      },
      boxShadow: {
        subtle: "0 1px 2px 0 rgba(15, 23, 42, 0.05)",
        card: "0 1px 3px 0 rgba(15, 23, 42, 0.06), 0 1px 2px -1px rgba(15, 23, 42, 0.04)",
        dropdown: "0 10px 15px -3px rgba(15, 23, 42, 0.08), 0 4px 6px -4px rgba(15, 23, 42, 0.04)",
      },
    },
  },
  plugins: [],
};

export default config;
