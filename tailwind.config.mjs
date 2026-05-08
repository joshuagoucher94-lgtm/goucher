/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
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
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Space Grotesk", "Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
