/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
      colors: {
        navy: {
          950: "#050918",
          900: "#0a1128",
          800: "#0f1a3d",
          700: "#162050",
          600: "#1e2d6b",
        },
        slate: {
          850: "#1a2035",
        },
        accent: {
          DEFAULT: "#3b82f6",
          light: "#60a5fa",
          dark: "#2563eb",
        },
        emerald: {
          accent: "#10b981",
        },
      },
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,0.08), 0 4px 16px rgba(0,0,0,0.06)",
        "card-hover": "0 4px 8px rgba(0,0,0,0.12), 0 8px 32px rgba(0,0,0,0.1)",
        sidebar: "1px 0 0 rgba(255,255,255,0.06)",
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease",
        "slide-in": "slideIn 0.25s ease",
        skeleton: "skeleton 1.5s ease infinite",
      },
      keyframes: {
        fadeIn: {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        slideIn: {
          from: { opacity: "0", transform: "translateX(-8px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        skeleton: { "0%, 100%": { opacity: "1" }, "50%": { opacity: "0.4" } },
      },
    },
  },
  plugins: [],
};
