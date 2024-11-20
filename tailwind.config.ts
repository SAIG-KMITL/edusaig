import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        steelGray: '#160430',
        skyBlue: '#6BA1E1',
        silver: '#B6B6B6',
        royalPurple: '#583091',
        darkMagenta: '#501794',
        oceanBlue: '#3E70A1',
        electricViolet: '#9747FF',
        beginner: '#6DBE45',
        intermediate: "#FFCA3A",
        advanced: '#FF6A00',
      },
      boxShadow: {
        "card": '0px 8px 24px 0px rgba(149, 157, 165, 0.2)',
        "card-hover": '0px 8px 36px 0px rgba(149, 157, 165, 0.6)',
      },
    },
  },
  plugins: [],
} satisfies Config;
