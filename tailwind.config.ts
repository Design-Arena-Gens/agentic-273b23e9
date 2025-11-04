import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"]
      },
      colors: {
        brand: {
          50: "#f4f7ff",
          100: "#e3ecff",
          200: "#c4d6ff",
          300: "#9ab7ff",
          400: "#6e90ff",
          500: "#4c6fff",
          600: "#3553db",
          700: "#2b45af",
          800: "#253d8a",
          900: "#223571",
          950: "#131d40"
        }
      },
      boxShadow: {
        floating:
          "0 18px 40px -12px rgba(66, 99, 235, 0.25), 0 8px 20px -10px rgba(15, 23, 42, 0.2)"
      },
      animation: {
        "pulse-slow": "pulse 4s ease-in-out infinite",
        blob: "blob 14s infinite"
      },
      keyframes: {
        blob: {
          "0%": {
            transform: "translate(0px, 0px) scale(1)"
          },
          "33%": {
            transform: "translate(30px, -40px) scale(1.05)"
          },
          "66%": {
            transform: "translate(-20px, 30px) scale(0.95)"
          },
          "100%": {
            transform: "translate(0px, 0px) scale(1)"
          }
        }
      }
    }
  },
  plugins: []
};

export default config;
