import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: "var(--color-ivory)",
        sage: {
          DEFAULT: "var(--color-sage)",
          light: "var(--color-sage-light)",
        },
        terracotta: "var(--color-terracotta)",
        "near-black": "var(--color-near-black)",
        "card-white": "var(--color-card-white)",
        border: "var(--color-border)",
        muted: "var(--color-muted)",
        gold: "var(--color-gold)",
        success: "var(--color-success)",
      },
      fontFamily: {
        display: ["Playfair Display", "Fraunces", "Lora", "Georgia", "serif"],
        sans: ["DM Sans", "Public Sans", "Inter", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
      },
      spacing: {
        xs: "var(--space-xs)",
        sm: "var(--space-sm)",
        md: "var(--space-md)",
        lg: "var(--space-lg)",
        xl: "var(--space-xl)",
        "2xl": "var(--space-2xl)",
      },
      borderRadius: {
        card: "12px",
        btn: "8px",
        img: "12px",
      },
    },
  },
  plugins: [],
};
export default config;
