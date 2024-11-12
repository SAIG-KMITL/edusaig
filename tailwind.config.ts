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
      },
      boxShadow: {
        "card": '0px 8px 24px 0px rgba(149, 157, 165, 0.2)',
        "card-hover": '0px 8px 36px 0px rgba(149, 157, 165, 0.6)',
      },
    },
  },
  plugins: [],
} satisfies Config;
