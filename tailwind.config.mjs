/** @type {import('tailwindcss').Config} */
export default {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}", "./src/**/*.{js,ts,jsx,tsx,mdx}"],
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
      },
      boxShadow: {
        soft: "0 18px 55px rgba(11, 13, 20, 0.12)",
        button: "0 10px 24px rgba(255, 197, 49, 0.25)",
      },
      fontFamily: {
        sans: ["var(--font-body)", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "SFMono-Regular", "monospace"],
      },
    },
  },
  plugins: [],
};
