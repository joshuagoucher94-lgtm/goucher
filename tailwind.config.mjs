/** @type {import('tailwindcss').Config} */
export default {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./lib/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        mango: "#FFC531",
        papaya: "#FF8A00",
        cream: "#FFF7EB",
        night: "#0B0D14",
        leaf: "#22C55E",
        plum: "#6C5CE7",
        ink: "#141414",
        muted: "#6B7280",
        imperial: "#7A1F1F",
        surface: "rgba(255, 255, 255, 0.05)",
      },
      boxShadow: {
        soft: "0 18px 55px rgba(0, 0, 0, 0.35)",
        button: "0 10px 24px rgba(255, 197, 49, 0.25)",
        glow: "0 0 40px rgba(255, 197, 49, 0.15)",
        "glow-imperial": "0 0 40px rgba(122, 31, 31, 0.35)",
      },
      fontFamily: {
        sans: ["var(--font-body)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
      keyframes: {
        "gradient-shift": {
          "0%, 100%": { transform: "translate(0%, 0%) scale(1)" },
          "33%": { transform: "translate(2%, -2%) scale(1.02)" },
          "66%": { transform: "translate(-2%, 1%) scale(0.98)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(122, 31, 31, 0.2)" },
          "50%": { boxShadow: "0 0 40px rgba(122, 31, 31, 0.45)" },
        },
        "chevron-bounce": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(6px)" },
        },
      },
      animation: {
        "gradient-shift": "gradient-shift 18s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        "chevron-bounce": "chevron-bounce 2s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
