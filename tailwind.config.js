/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#fdf7ee",
        surface: "#fde6da",
        "surface-soft": "#fff8f4",
        footer: "#412c26",
        primary: {
          DEFAULT: "#f37f83",
          light: "#fca9a5",
          dark: "#d96f72",
        },
        text: {
          DEFAULT: "#61503a",
          muted: "#8d6445",
          light: "#a68459",
        },
        nature: {
          DEFAULT: "#8a8f58",
          light: "#b4b87a",
        },
        sky: "#7898a8",
        terra: "#d29976",
        wood: "#a68459",
        border: "#f3c5bb",
        white: "#ffffff",
        ghibli: {
          50: "#faf8f3",
          100: "#f5f1e8",
          200: "#ebe5d9",
          300: "#ddd1c4",
          400: "#c9b8aa",
          500: "#b5a299",
          600: "#8b7355",
          700: "#6b5344",
          800: "#4a3728",
          900: "#2a201a",
        },
        accent: {
          forest: "#2d5016",
          sky: "#87ceeb",
          sunset: "#ff9a56",
          earth: "#8b6f47",
        },
      },
      fontFamily: {
        sans: ["system-ui", "sans-serif"],
        serif: ["Georgia", "serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-in": "slideIn 0.6s ease-out",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideIn: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      boxShadow: {
        ghibli: "0 4px 20px rgba(45, 80, 22, 0.15)",
        "ghibli-lg": "0 10px 40px rgba(45, 80, 22, 0.2)",
        card: "0 2px 8px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
};
