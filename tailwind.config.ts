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
        steelGray: "#160430",
        skyBlue: "#6BA1E1",
        silver: "#B6B6B6",
        royalPurple: "#583091",
        darkMagenta: "#501794",
        oceanBlue: "#3E70A1",
        electricViolet: "#9747FF",
        beginner: "#6DBE45",
        intermediate: "#FFCA3A",
        advanced: "#FF6A00",
      },
      boxShadow: {
        card: "0px 8px 24px 0px rgba(149, 157, 165, 0.2)",
        "card-hover": "0px 8px 36px 0px rgba(149, 157, 165, 0.6)",
      },
    },
    keyframes: {
      "gradient-shift": {
        "0%, 100%": {
          backgroundImage:
            "radial-gradient(circle at 0% 0%, #583091 0%, transparent 50%)",
        },
        "50%": {
          backgroundImage:
            "radial-gradient(circle at 100% 100%, #583091 0%, transparent 50%)",
        },
      },
      "fade-slide-in": {
        "0%": {
          opacity: "0",
          transform: "translateX(-20px)",
        },
        "100%": {
          opacity: "1",
          transform: "translateX(0)",
        },
      },
      "fade-scale-in": {
        "0%": {
          opacity: "0",
          transform: "scale(0.8)",
        },
        "100%": {
          opacity: "1",
          transform: "scale(1)",
        },
      },
      "fade-up": {
        "0%": {
          opacity: "0",
          transform: "translateY(20px)",
        },
        "100%": {
          opacity: "1",
          transform: "translateY(0)",
        },
      },
      "pulse-scale": {
        "0%, 100%": {
          transform: "scale(1)",
          opacity: "0.3",
        },
        "50%": {
          transform: "scale(1.2)",
          opacity: "0.1",
        },
      },
      "spin-slow": {
        "100%": {
          transform: "rotate(360deg)",
        },
      },
    },
    animation: {
      "gradient-shift": "gradient-shift 10s linear infinite",
      "fade-slide-in": "fade-slide-in 0.6s ease-out forwards",
      "fade-scale-in": "fade-scale-in 0.6s ease-out forwards",
      "fade-up": "fade-up 0.6s ease-out forwards",
      "pulse-scale": "pulse-scale 3s infinite",
      "spin-slow": "spin-slow 20s linear infinite",
    },
    scale: {
      "102": "1.02",
      "98": "0.98",
    },
  },
  plugins: [require("daisyui")],
} satisfies Config;
