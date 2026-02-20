/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', "serif"],
        sans: ['"DM Sans"', "sans-serif"],
      },
      colors: {
        ember: "#e85d04",
        violet: "#7209b7",
        ocean: "#0077b6",
        gold: "#f4a261",
        ink: "#0d0d0d",
        paper: "#faf8f5",
        cream: "#f0ebe3",
        muted: "#6c757d",
        border: "#d4c9b8",
      },
      animation: {
        "slide-in": "slideIn 0.3s ease",
        "fade-in": "fadeIn 0.2s ease",
        "slide-up": "slideUp 0.25s ease",
      },
      keyframes: {
        slideIn: {
          from: { transform: "translateX(120%)", opacity: 0 },
          to: { transform: "translateX(0)", opacity: 1 },
        },
        fadeIn: { from: { opacity: 0 }, to: { opacity: 1 } },
        slideUp: {
          from: { transform: "translateY(24px)", opacity: 0 },
          to: { transform: "translateY(0)", opacity: 1 },
        },
      },
    },
  },
  plugins: [],
};
